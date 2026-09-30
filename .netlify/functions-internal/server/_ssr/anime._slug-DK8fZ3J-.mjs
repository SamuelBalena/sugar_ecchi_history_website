import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { l as useCatalog, u as useLang } from "./catalog-LwytbwQE.mjs";
import { h as Link, j as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SiteLayout, i as PageHeader } from "./SiteLayout-C-HU6hZr.mjs";
import { t as Route } from "./anime._slug-BJq_JGAo.mjs";
import { t as ProductCard } from "./ProductCard-Da5SuLQ3.mjs";
import { t as packsForAnime } from "./selectors-Dephc5YT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/anime._slug-DK8fZ3J-.js
var import_jsx_runtime = require_jsx_runtime();
function AnimeDetail() {
	const { slug } = Route.useParams();
	const { t, tx } = useLang();
	const { animes, characters, publishedPacks } = useCatalog();
	const anime = animes.find((a) => a.slug === slug);
	if (!anime) throw notFound();
	const cast = characters.filter((c) => c.animeId === anime.id);
	const packs = packsForAnime(publishedPacks, characters, anime.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, {
		faq: "compact",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: t("pdp.anime"),
			title: tx(anime.name),
			subtitle: tx(anime.description)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-7xl px-4 pb-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-8 flex flex-wrap gap-2",
					children: cast.map((character) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/characters/$slug",
						params: { slug: character.slug },
						className: "border border-border/70 px-3 py-1.5 text-xs text-muted-foreground hover:border-accent hover:text-accent",
						children: tx(character.name)
					}, character.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: packs.map((pack) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { pack }, pack.id))
				}),
				packs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-16 text-center text-sm text-muted-foreground",
					children: t("shop.empty")
				}) : null
			]
		})]
	});
}
//#endregion
export { AnimeDetail as component };
