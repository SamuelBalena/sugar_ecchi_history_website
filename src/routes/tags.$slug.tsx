import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { useCatalog } from "@/lib/catalog";
import { useLang } from "@/lib/i18n";
import { packsForTag } from "@/lib/selectors";

export const Route = createFileRoute("/tags/$slug")({
  head: ({ params }) => {
    const title = `${params.slug.replace(/-/g, " ")} art packs — SugarEcchi`;
    return {
      meta: [
        { title },
        { name: "description", content: "SugarEcchi art packs matching this style tag." },
        { property: "og:title", content: title },
        { property: "og:description", content: "Adult anime art packs matching this style tag." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: TagDetail,
});

function TagDetail() {
  const { slug } = Route.useParams();
  const { t, tx } = useLang();
  const { tags, publishedPacks } = useCatalog();
  const tag = tags.find((x) => x.slug === slug);
  if (!tag) throw notFound();

  const packs = packsForTag(publishedPacks, tag.id);

  return (
    <SiteLayout faq="compact">
      <PageHeader eyebrow={t("page.tags")} title={tx(tag.label)} />
      <div className="mx-auto w-full max-w-7xl px-4 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {packs.map((pack) => (
            <ProductCard key={pack.id} pack={pack} />
          ))}
        </div>
        {packs.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">{t("shop.empty")}</p>
        ) : null}
      </div>
    </SiteLayout>
  );
}
