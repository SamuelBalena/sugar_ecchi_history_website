import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { useCatalog } from "@/lib/catalog";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your wishlist — SugarEcchi" },
      {
        name: "description",
        content: "Packs you saved on SugarEcchi, kept on this device and ready to buy on Patreon.",
      },
      { property: "og:title", content: "Your wishlist — SugarEcchi" },
      { property: "og:description", content: "Saved adult anime art packs on SugarEcchi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { t } = useLang();
  const { wishlist, publishedPacks } = useCatalog();
  const packs = publishedPacks.filter((p) => wishlist.includes(p.id));

  return (
    <SiteLayout faq="compact">
      <PageHeader eyebrow="Saved" title={t("wishlist.title")} />
      <div className="mx-auto w-full max-w-7xl px-4 pb-16">
        {packs.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-muted-foreground">{t("wishlist.empty")}</p>
            <Link to="/shop" className="mt-4 inline-block text-sm text-accent">
              {t("home.bannerCta")}
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {packs.map((pack) => (
              <ProductCard key={pack.id} pack={pack} />
            ))}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
