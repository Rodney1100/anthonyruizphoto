import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-item-${index}`}>
          <AccordionTrigger className="text-left text-lg font-semibold tracking-wide" data-testid={`faq-question-${index}`}>
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground leading-loose" data-testid={`faq-answer-${index}`}>
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
