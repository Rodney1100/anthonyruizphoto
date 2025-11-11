import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import session from "express-session";
import connectPg from "connect-pg-simple";
import type { Express, RequestHandler } from "express";
import { storage } from "./storage";
import type { User } from "@shared/schema";

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  // In development: use DATABASE_PUBLIC_URL, in production: use DATABASE_URL
  const isDevelopment = process.env.NODE_ENV === 'development';
  const databaseUrl = isDevelopment 
    ? process.env.DATABASE_PUBLIC_URL 
    : process.env.DATABASE_URL;
  const sessionStore = new pgStore({
    conString: databaseUrl,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: sessionTtl,
    },
  });
}

// Seed the admin user on startup
export async function seedAdminUser() {
  const adminUsername = "PhotoAdmin12";
  const existingAdmin = await storage.getUserByUsername(adminUsername);
  
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("PAdmin1@3", 12);
    await storage.createLocalUser(adminUsername, hashedPassword, "admin");
    console.log("✅ Admin user created: PhotoAdmin12");
  }
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure passport-local strategy
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        
        if (!user || !user.hashedPassword) {
          return done(null, false, { message: "Invalid username or password" });
        }

        const isValid = await bcrypt.compare(password, user.hashedPassword);
        
        if (!isValid) {
          return done(null, false, { message: "Invalid username or password" });
        }

        if (!user.isActive) {
          return done(null, false, { message: "Account is disabled" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user: Express.User, cb) => {
    const u = user as User;
    cb(null, u.id);
  });

  passport.deserializeUser(async (id: string, cb) => {
    try {
      const user = await storage.getUser(id);
      cb(null, user);
    } catch (error) {
      cb(error);
    }
  });

  // Seed admin user
  await seedAdminUser();
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export const requireAdmin: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = req.user as User;
  if (user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin role required." });
  }

  next();
};

export const requireEditor: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = req.user as User;
  if (user.role !== "admin" && user.role !== "editor") {
    return res.status(403).json({ message: "Access denied. Editor or Admin role required." });
  }

  next();
};
