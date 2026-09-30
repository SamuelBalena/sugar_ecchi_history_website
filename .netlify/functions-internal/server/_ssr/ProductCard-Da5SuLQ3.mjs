import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { l as useCatalog, u as useLang } from "./catalog-LwytbwQE.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Heart } from "../_libs/lucide-react.mjs";
import { s as cn } from "./SiteLayout-C-HU6hZr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-Da5SuLQ3.js
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ pack, className }) {
	const { tx, t } = useLang();
	const { characterById, animeById, toggleWishlist, isWished } = useCatalog();
	const firstCharacterId = pack.characterIds[0];
	const character = firstCharacterId ? characterById(firstCharacterId) : void 0;
	const anime = character ? animeById(character.animeId) : void 0;
	const wished = isWished(pack.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("group relative flex flex-col overflow-hidden border border-border/70 bg-card/80 shadow-luxe transition-all duration-300 hover:-translate-y-1 hover:border-primary/70", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/product/$slug",
				params: { slug: pack.slug },
				className: "relative block overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: pack.galleryUrls[0],
					alt: tx(pack.title),
					loading: "lazy",
					width: 800,
					height: 1e3,
					className: "aspect-4/5 w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:saturate-125"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute left-0 top-0 flex flex-col gap-1 p-2",
					children: [pack.isBestseller ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "bg-accent px-2 py-1 text-[10px] font-bold uppercase text-accent-foreground",
						children: t("home.bestsellers")
					}) : null, pack.compareAtPrice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "bg-primary px-2 py-1 text-[10px] font-bold uppercase text-primary-foreground",
						children: "Sale"
					}) : null]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": t("nav.wishlist"),
				onClick: () => toggleWishlist(pack.id),
				className: "absolute right-2 top-2 flex size-9 items-center justify-center rounded-full border border-border/60 bg-background/70 backdrop-blur transition-colors hover:border-primary hover:text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-4", wished ? "fill-primary text-primary" : "text-muted-foreground") })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col gap-1 p-4",
				children: [
					anime ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
						children: tx(anime.name)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/product/$slug",
						params: { slug: pack.slug },
						className: "font-display text-base font-bold leading-snug hover:text-primary",
						children: tx(pack.title)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-baseline gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-bold text-primary",
							children: ["$", pack.price]
						}), pack.compareAtPrice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground line-through",
							children: ["$", pack.compareAtPrice]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: pack.patreonUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "mt-4 inline-flex items-center justify-center bg-primary px-3 py-2.5 text-xs font-bold uppercase text-primary-foreground transition-all hover:bg-primary/85",
						children: t("card.buy")
					})
				]
			})
		]
	});
}
//#endregion
export { ProductCard as t };
