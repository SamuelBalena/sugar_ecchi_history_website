import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { l as useCatalog, u as useLang } from "./catalog-LwytbwQE.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SiteLayout, i as PageHeader } from "./SiteLayout-C-HU6hZr.mjs";
import { i as packsForTag } from "./selectors-Dephc5YT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tags.index-gXq7yQzZ.js
var import_jsx_runtime = require_jsx_runtime();
function TagsIndex() {
	const { t, tx } = useLang();
	const { tags, publishedPacks } = useCatalog();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, {
		faq: "compact",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Catalog",
			title: t("page.tags")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex w-full max-w-7xl flex-wrap gap-3 px-4 pb-16",
			children: tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/tags/$slug",
				params: { slug: tag.slug },
				className: "border border-border/70 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent",
				children: [tx(tag.label), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 text-[11px] text-accent",
					children: packsForTag(publishedPacks, tag.id).length
				})]
			}, tag.id))
		})]
	});
}
//#endregion
export { TagsIndex as component };
