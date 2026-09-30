import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { l as useCatalog, u as useLang } from "./catalog-LwytbwQE.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SiteLayout, i as PageHeader } from "./SiteLayout-C-HU6hZr.mjs";
import { t as ProductCard } from "./ProductCard-Da5SuLQ3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wishlist-Cywu1HCn.js
var import_jsx_runtime = require_jsx_runtime();
function WishlistPage() {
	const { t } = useLang();
	const { wishlist, publishedPacks } = useCatalog();
	const packs = publishedPacks.filter((p) => wishlist.includes(p.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, {
		faq: "compact",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Saved",
			title: t("wishlist.title")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto w-full max-w-7xl px-4 pb-16",
			children: packs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-16 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: t("wishlist.empty")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					className: "mt-4 inline-block text-sm text-accent",
					children: t("home.bannerCta")
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: packs.map((pack) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { pack }, pack.id))
			})
		})]
	});
}
//#endregion
export { WishlistPage as component };
