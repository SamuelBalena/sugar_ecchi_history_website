import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/data/faq";
import { useLang } from "@/lib/i18n";

interface FaqAccordionProps {
  compact?: boolean;
  withHeading?: boolean;
}

export function FaqAccordion({ compact = false, withHeading = true }: FaqAccordionProps) {
  const { tx, t } = useLang();
  const items = compact ? faqItems.slice(0, 4) : faqItems;

  return (
    <section id="faq" className="border-t border-border/60 bg-surface/30">
      <div className="mx-auto w-full max-w-4xl px-4 py-14">
        {withHeading ? (
          <div className="mb-8">
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-2 text-3xl font-semibold">{t("page.faq")}</h2>
          </div>
        ) : null}
        <Accordion type="single" collapsible className="w-full">
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-border/60">
              <AccordionTrigger className="text-left text-base hover:text-accent hover:no-underline">
                {tx(item.question)}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {tx(item.answer)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
