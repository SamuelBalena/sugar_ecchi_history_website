import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { useCatalog } from "@/lib/catalog";
import { useLang } from "@/lib/i18n";
import { packsForTag } from "@/lib/selectors";

export const Route = createFileRoute("/tags/")({
  head: () => ({
    meta: [
      { title: "Browse by tag — SugarEcchi" },
      {
        name: "description",
        content: "Kimono, gown, armor, idol and more: browse SugarEcchi art packs by tag.",
      },
      { property: "og:title", content: "Browse by tag — SugarEcchi" },
      { property: "og:description", content: "Browse adult anime art packs by style tag." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TagsIndex,
});

function TagsIndex() {
  const { t, tx } = useLang();
  const { tags, publishedPacks } = useCatalog();

  return (
    <SiteLayout faq="compact">
      <PageHeader eyebrow="Catalog" title={t("page.tags")} />
      <div className="mx-auto flex w-full max-w-7xl flex-wrap gap-3 px-4 pb-16">
        {tags.map((tag) => (
          <Link
            key={tag.id}
            to="/tags/$slug"
            params={{ slug: tag.slug }}
            className="border border-border/70 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {tx(tag.label)}
            <span className="ml-2 text-[11px] text-accent">
              {packsForTag(publishedPacks, tag.id).length}
            </span>
          </Link>
        ))}
      </div>
    </SiteLayout>
  );
}
