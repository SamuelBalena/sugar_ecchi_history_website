import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { l as useCatalog, u as useLang } from "./catalog-LwytbwQE.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SiteLayout, i as PageHeader } from "./SiteLayout-C-HU6hZr.mjs";
import { n as packsForCharacter } from "./selectors-Dephc5YT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/characters.index-I6YhXSZ7.js
var import_jsx_runtime = require_jsx_runtime();
function CharactersIndex() {
	const { t, tx } = useLang();
	const { characters, animeById, publishedPacks } = useCatalog();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, {
		faq: "compact",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Catalog",
			title: t("page.characters")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto grid w-full max-w-7xl gap-4 px-4 pb-16 sm:grid-cols-2 lg:grid-cols-4",
			children: characters.map((character) => {
				const packs = packsForCharacter(publishedPacks, character.id);
				const anime = animeById(character.animeId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/characters/$slug",
					params: { slug: character.slug },
					className: "group border border-border/60 bg-card transition-colors hover:border-accent/60",
					children: [packs[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: packs[0].galleryUrls[0],
						alt: tx(character.name),
						loading: "lazy",
						className: "aspect-4/5 w-full object-cover"
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [
							anime ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: tx(anime.name)
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 font-display text-xl group-hover:text-accent",
								children: tx(character.name)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-[11px] uppercase tracking-widest text-accent",
								children: [
									packs.length,
									" ",
									t("common.packs")
								]
							})
						]
					})]
				}, character.id);
			})
		})]
	});
}
//#endregion
export { CharactersIndex as component };
