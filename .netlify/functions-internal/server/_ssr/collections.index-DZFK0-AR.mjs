import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { l as useCatalog, u as useLang } from "./catalog-LwytbwQE.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SiteLayout, i as PageHeader } from "./SiteLayout-C-HU6hZr.mjs";
import { r as packsForCollection } from "./selectors-Dephc5YT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/collections.index-DZFK0-AR.js
var import_jsx_runtime = require_jsx_runtime();
function CollectionsIndex() {
	const { t, tx } = useLang();
	const { collections, publishedPacks } = useCatalog();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, {
		faq: "compact",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Catalog",
			title: t("page.collections")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto grid w-full max-w-7xl gap-4 px-4 pb-16 sm:grid-cols-2",
			children: collections.map((collection) => {
				const packs = packsForCollection(publishedPacks, collection.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/collections/$slug",
					params: { slug: collection.slug },
					className: "group relative overflow-hidden border border-border/60 bg-card",
					children: [packs[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: packs[0].galleryUrls[0],
						alt: tx(collection.title),
						loading: "lazy",
						className: "aspect-16/9 w-full object-cover transition-transform duration-700 group-hover:scale-105"
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl group-hover:text-accent",
								children: tx(collection.title)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: tx(collection.description)
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
					})]
				}, collection.id);
			})
		})]
	});
}
//#endregion
export { CollectionsIndex as component };
