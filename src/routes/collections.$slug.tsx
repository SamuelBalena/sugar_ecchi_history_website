import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { useCatalog } from "@/lib/catalog";
import { useLang } from "@/lib/i18n";
import { packsForCollection } from "@/lib/selectors";

export const Route = createFileRoute("/collections/$slug")({
  head: ({ params }) => {
    const title = `${params.slug.replace(/-/g, " ")} collection — SugarEcchi`;
    return {
      meta: [
        { title },
        { name: "description", content: "A curated SugarEcchi collection of adult anime art packs." },
        { property: "og:title", content: title },
        { property: "og:description", content: "A curated set of adult anime art packs." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CollectionDetail,
});

function CollectionDetail() {
  const { slug } = Route.useParams();
  const { t, tx } = useLang();
  const { collections, publishedPacks } = useCatalog();
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) throw notFound();

  const packs = packsForCollection(publishedPacks, collection.id);

  return (
    <SiteLayout faq="compact">
      <PageHeader
        eyebrow={t("page.collections")}
        title={tx(collection.title)}
        subtitle={tx(collection.description)}
      />
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
