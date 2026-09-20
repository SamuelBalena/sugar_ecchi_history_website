import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — SugarEcchi art pack store" },
      {
        name: "description",
        content:
          "How buying works at SugarEcchi: the catalog is browsable here, payment and delivery happen on Patreon. 18+ only.",
      },
      { property: "og:title", content: "FAQ — SugarEcchi art pack store" },
      {
        property: "og:description",
        content: "Payment, delivery, languages and 18+ policy answered in EN and 日本語.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { t } = useLang();
  return (
    <SiteLayout>
      <PageHeader eyebrow="FAQ" title={t("page.faq")} />
      <FaqAccordion withHeading={false} />
    </SiteLayout>
  );
}
