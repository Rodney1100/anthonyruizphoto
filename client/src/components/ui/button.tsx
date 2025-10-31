import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-all duration-300" +
  " hover-elevate active-elevate-2",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background border-2 border-foreground",
        destructive:
          "bg-destructive text-destructive-foreground border-2 border-destructive",
        outline:
          " border-2 [border-color:var(--button-outline)] shadow-xs active:shadow-none ",
        secondary: "border-2 bg-secondary text-secondary-foreground border-secondary-border ",
        ghost: "border-2 border-transparent",
      },
      size: {
        default: "min-h-11 px-6 py-3 text-base",
        sm: "min-h-10 rounded-md px-4 text-sm",
        lg: "min-h-12 rounded-md px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
