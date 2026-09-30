import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { l as useCatalog, u as useLang } from "./catalog-LwytbwQE.mjs";
import { j as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SiteLayout, i as PageHeader } from "./SiteLayout-C-HU6hZr.mjs";
import { t as ProductCard } from "./ProductCard-Da5SuLQ3.mjs";
import { r as packsForCollection } from "./selectors-Dephc5YT.mjs";
import { t as Route } from "./collections._slug-DyiQwWlx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/collections._slug-CowRMZQS.js
var import_jsx_runtime = require_jsx_runtime();
function CollectionDetail() {
	const { slug } = Route.useParams();
	const { t, tx } = useLang();
	const { collections, publishedPacks } = useCatalog();
	const collection = collections.find((c) => c.slug === slug);
	if (!collection) throw notFound();
	const packs = packsForCollection(publishedPacks, collection.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, {
		faq: "compact",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: t("page.collections"),
			title: tx(collection.title),
			subtitle: tx(collection.description)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-7xl px-4 pb-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: packs.map((pack) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { pack }, pack.id))
			}), packs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-16 text-center text-sm text-muted-foreground",
				children: t("shop.empty")
			}) : null]
		})]
	});
}
//#endregion
export { CollectionDetail as component };
