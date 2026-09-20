import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { BRAND, PATREON_URL, X_URL } from "@/lib/social";
import { PatreonIcon, XIcon } from "./icons";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-border/70 bg-background">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="eyebrow">{t("footer.catalog")}</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop" className="hover:text-accent">{t("nav.shop")}</Link></li>
            <li><Link to="/anime" className="hover:text-accent">{t("nav.anime")}</Link></li>
            <li><Link to="/characters" className="hover:text-accent">{t("nav.characters")}</Link></li>
            <li><Link to="/collections" className="hover:text-accent">{t("nav.collections")}</Link></li>
            <li><Link to="/tags" className="hover:text-accent">{t("nav.tags")}</Link></li>
            <li><Link to="/faq" className="hover:text-accent">{t("nav.faq")}</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">{t("footer.store")}</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>{t("footer.policy")}</li>
            <li>{t("footer.payments")}</li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">{t("footer.social")}</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={PATREON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent"
              >
                <PatreonIcon className="size-4" /> Patreon
              </a>
            </li>
            <li>
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent"
              >
                <XIcon className="size-4" /> X
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-display text-2xl font-extrabold">
            SUGAR<span className="text-primary">ECCHI</span>
          </p>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">
            {t("footer.disclaimer")}
          </p>
          <Link
            to="/admin"
            className="mt-4 inline-block text-[11px] uppercase tracking-widest text-muted-foreground/60 hover:text-muted-foreground"
          >
            {t("footer.admin")}
          </Link>
        </div>
      </div>

      <div className="border-t border-border/50">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-5 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {BRAND}
          </span>
          <span>18+ · Fictional adult characters · Payments on Patreon</span>
        </div>
      </div>
    </footer>
  );
}
