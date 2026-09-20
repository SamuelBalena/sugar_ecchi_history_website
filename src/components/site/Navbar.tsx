import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Menu, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBox } from "./SearchBox";
import { useCatalog } from "@/lib/catalog";
import { useLang, type CopyKey } from "@/lib/i18n";

const links: { to: string; key: CopyKey }[] = [
  { to: "/shop", key: "nav.shop" },
  { to: "/anime", key: "nav.anime" },
  { to: "/characters", key: "nav.characters" },
  { to: "/collections", key: "nav.collections" },
  { to: "/tags", key: "nav.tags" },
  { to: "/faq", key: "nav.faq" },
];

export function Navbar() {
  const { t, lang, setLang } = useLang();
  const { wishlist } = useCatalog();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex min-h-18 w-full max-w-7xl items-center gap-3 px-4">
        <button
          type="button"
          className="md:hidden"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <Link to="/" className="font-display text-xl font-extrabold text-foreground">
          SUGAR<span className="text-primary">ECCHI</span>
        </Link>

        <nav className="navbar-primary ml-4 min-w-0 items-center gap-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-xs font-bold uppercase text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="navbar-search ml-auto w-48 shrink-0 xl:w-64">
          <SearchBox />
        </div>

        <div className="flex shrink-0 items-center gap-2 md:ml-3">
          <div className="navbar-language items-center text-xs">
            <button
              type="button"
              onClick={() => setLang("en")}
              className={
                lang === "en" ? "px-1.5 text-accent" : "px-1.5 text-muted-foreground hover:text-foreground"
              }
            >
              EN
            </button>
            <span className="text-border">|</span>
            <button
              type="button"
              onClick={() => setLang("ja")}
              className={
                lang === "ja" ? "px-1.5 text-accent" : "px-1.5 text-muted-foreground hover:text-foreground"
              }
            >
              日本語
            </button>
          </div>

          <Button asChild variant="ghost" size="icon" aria-label={t("nav.wishlist")}>
            <Link to="/wishlist" className="relative">
              <Heart className="size-4" />
              {wishlist.length > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {wishlist.length}
                </span>
              ) : null}
            </Link>
          </Button>

          <span
            className="hidden size-9 items-center justify-center text-muted-foreground sm:flex"
            aria-hidden="true"
          >
            <ShoppingBag className="size-4" />
          </span>
        </div>
      </div>

      <div className="hidden border-t border-border/50 bg-secondary/30 md:block">
        <div className="mx-auto flex h-9 w-full max-w-7xl items-center gap-6 px-4 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <Link to="/shop" search={{ sort: "bestselling" }} className="hover:text-accent">
            {t("nav.bestsellers")}
          </Link>
          <Link to="/shop" search={{ sort: "newest" }} className="hover:text-accent">
            {t("nav.new")}
          </Link>
          <Link to="/shop" search={{ sale: true }} className="hover:text-accent">
            {t("nav.sale")}
          </Link>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border/60 bg-background px-4 pb-4 pt-3 md:hidden">
          <SearchBox onNavigate={() => setOpen(false)} />
          <nav className="mt-3 flex flex-col">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/40 py-3 text-sm text-muted-foreground hover:text-accent"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <button type="button" onClick={() => setLang("en")} className={lang === "en" ? "text-accent" : "text-muted-foreground"}>
              EN
            </button>
            <span className="text-border">|</span>
            <button type="button" onClick={() => setLang("ja")} className={lang === "ja" ? "text-accent" : "text-muted-foreground"}>
              日本語
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
