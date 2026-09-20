import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { useCatalog } from "@/lib/catalog";
import { useLang } from "@/lib/i18n";
import { packsForCollection } from "@/lib/selectors";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Curated collections — SugarEcchi" },
      {
        name: "description",
        content: "Themed SugarEcchi collections: kimono nights, gothic luxe, stage lights and more.",
      },
      { property: "og:title", content: "Curated collections — SugarEcchi" },
      { property: "og:description", content: "Themed sets of adult anime art packs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollectionsIndex,
});

function CollectionsIndex() {
  const { t, tx } = useLang();
  const { collections, publishedPacks } = useCatalog();

  return (
    <SiteLayout faq="compact">
      <PageHeader eyebrow="Catalog" title={t("page.collections")} />
      <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 pb-16 sm:grid-cols-2">
        {collections.map((collection) => {
          const packs = packsForCollection(publishedPacks, collection.id);
          return (
            <Link
              key={collection.id}
              to="/collections/$slug"
              params={{ slug: collection.slug }}
              className="group relative overflow-hidden border border-border/60 bg-card"
            >
              {packs[0] ? (
                <img
                  src={packs[0].galleryUrls[0]}
                  alt={tx(collection.title)}
                  loading="lazy"
                  className="aspect-16/9 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : null}
              <div className="p-6">
                <h2 className="font-display text-2xl group-hover:text-accent">
                  {tx(collection.title)}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{tx(collection.description)}</p>
                <p className="mt-4 text-[11px] uppercase tracking-widest text-accent">
                  {packs.length} {t("common.packs")}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </SiteLayout>
  );
}
