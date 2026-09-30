import { r as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { l as useCatalog, u as useLang } from "./catalog-LwytbwQE.mjs";
import { h as Link, j as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Heart } from "../_libs/lucide-react.mjs";
import { a as SiteLayout, s as cn } from "./SiteLayout-C-HU6hZr.mjs";
import { t as Route } from "./product._slug-DT5t6ajp.mjs";
import { t as ProductRail } from "./ProductRail-C_7v773w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._slug-DWxI-AyO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { slug } = Route.useParams();
	const { t, tx } = useLang();
	const { packBySlug, publishedPacks, characterById, animeById, tagById, toggleWishlist, isWished } = useCatalog();
	const pack = packBySlug(slug);
	const [active, setActive] = (0, import_react.useState)(0);
	if (!pack || !pack.isPublished) throw notFound();
	const characters = pack.characterIds.map((id) => characterById(id)).filter(Boolean);
	const firstCharacter = characters[0];
	const anime = firstCharacter ? animeById(firstCharacter.animeId) : void 0;
	const related = publishedPacks.filter((p) => p.id !== pack.id && p.characterIds.some((c) => pack.characterIds.includes(c))).concat(publishedPacks.filter((p) => p.id !== pack.id && p.collectionIds.some((c) => pack.collectionIds.includes(c)))).filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i).slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, {
		faq: "compact",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid w-full max-w-7xl gap-10 px-4 pb-20 pt-10 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: pack.galleryUrls[active],
					alt: tx(pack.title),
					width: 1e3,
					height: 1250,
					className: "aspect-4/5 w-full border border-border/60 object-cover"
				}), pack.galleryUrls.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex gap-3",
					children: pack.galleryUrls.map((url, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setActive(index),
						className: cn("size-20 border", index === active ? "border-accent" : "border-border/60 opacity-70"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: url,
							alt: "",
							loading: "lazy",
							className: "size-full object-cover"
						})
					}, url + index))
				}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					anime ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/anime/$slug",
						params: { slug: anime.slug },
						className: "eyebrow hover:text-accent",
						children: tx(anime.name)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 text-4xl font-semibold sm:text-5xl",
						children: tx(pack.title)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-baseline gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-2xl text-accent",
							children: ["$", pack.price]
						}), pack.compareAtPrice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-muted-foreground line-through",
							children: ["$", pack.compareAtPrice]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gold-rule my-6 w-full max-w-40" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: tx(pack.description)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: pack.patreonUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "inline-flex flex-1 items-center justify-center bg-primary px-6 py-3 text-sm uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90",
							children: t("card.buy")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => toggleWishlist(pack.id),
							"aria-label": t("nav.wishlist"),
							className: "inline-flex items-center justify-center border border-border px-4 py-3 transition-colors hover:border-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-4", isWished(pack.id) ? "fill-primary text-primary" : "text-muted-foreground") })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted-foreground",
						children: t("pdp.checkoutNote")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-10 border-t border-border/60 pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "eyebrow",
							children: t("pdp.contents")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: tx(pack.contents)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-8 border-t border-border/60 pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "eyebrow",
							children: t("pdp.specs")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-3 grid grid-cols-2 gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: t("pdp.files")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: pack.fileCount })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: t("pdp.format")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: pack.format })] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-8 border-t border-border/60 pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "eyebrow",
							children: t("pdp.characters")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: [characters.map((character) => character ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/characters/$slug",
								params: { slug: character.slug },
								className: "border border-border/70 px-3 py-1.5 text-xs text-muted-foreground hover:border-accent hover:text-accent",
								children: tx(character.name)
							}, character.id) : null), pack.tagIds.map((id) => {
								const tag = tagById(id);
								return tag ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/tags/$slug",
									params: { slug: tag.slug },
									className: "border border-border/70 px-3 py-1.5 text-xs text-muted-foreground hover:border-accent hover:text-accent",
									children: tx(tag.label)
								}, tag.id) : null;
							})]
						})]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductRail, {
				title: t("pdp.related"),
				packs: related,
				viewAllTo: "/shop",
				viewAllLabel: t("home.bannerCta")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky bottom-0 z-40 flex items-center gap-3 border-t border-border bg-background/95 px-4 py-3 backdrop-blur lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-accent",
					children: ["$", pack.price]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: pack.patreonUrl,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "ml-auto inline-flex flex-1 items-center justify-center bg-primary px-4 py-2.5 text-xs uppercase tracking-widest text-primary-foreground",
					children: t("card.buy")
				})]
			})
		]
	});
}
//#endregion
export { ProductPage as component };
