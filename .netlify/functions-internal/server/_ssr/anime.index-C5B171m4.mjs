import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { l as useCatalog, u as useLang } from "./catalog-LwytbwQE.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SiteLayout, i as PageHeader } from "./SiteLayout-C-HU6hZr.mjs";
import { t as packsForAnime } from "./selectors-Dephc5YT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/anime.index-C5B171m4.js
var import_jsx_runtime = require_jsx_runtime();
function AnimeIndex() {
	const { t, tx } = useLang();
	const { animes, characters, publishedPacks } = useCatalog();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, {
		faq: "compact",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Catalog",
			title: t("page.animes")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto grid w-full max-w-7xl gap-4 px-4 pb-16 sm:grid-cols-2 lg:grid-cols-3",
			children: animes.map((anime) => {
				const packs = packsForAnime(publishedPacks, characters, anime.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/anime/$slug",
					params: { slug: anime.slug },
					className: "group border border-border/60 bg-card p-6 transition-colors hover:border-accent/60",
					children: [
						packs[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: packs[0].galleryUrls[0],
							alt: tx(anime.name),
							loading: "lazy",
							className: "mb-4 aspect-16/9 w-full object-cover"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl group-hover:text-accent",
							children: tx(anime.name)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: tx(anime.description)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-[11px] uppercase tracking-widest text-accent",
							children: [
								packs.length,
								" ",
								t("common.packs")
							]
						})
					]
				}, anime.id);
			})
		})]
	});
}
//#endregion
export { AnimeIndex as component };
