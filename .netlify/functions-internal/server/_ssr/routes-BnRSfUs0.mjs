import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { l as useCatalog, u as useLang } from "./catalog-LwytbwQE.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SiteLayout } from "./SiteLayout-C-HU6hZr.mjs";
import { t as ProductCard } from "./ProductCard-Da5SuLQ3.mjs";
import { t as packsForAnime } from "./selectors-Dephc5YT.mjs";
import { t as ProductRail } from "./ProductRail-C_7v773w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BnRSfUs0.js
var import_jsx_runtime = require_jsx_runtime();
function HomePage() {
	const { t, tx } = useLang();
	const { publishedPacks, animes, collections, characters } = useCatalog();
	const bestsellers = publishedPacks.filter((p) => p.isBestseller);
	const newest = [...publishedPacks].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 8);
	const featured = publishedPacks.filter((p) => p.isFeatured).slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, {
		faq: "full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden border-b border-border/60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-surface/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto grid min-h-[72vh] w-full max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-[0.88fr_1.12fr] lg:py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 flex flex-col items-start",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-7 inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative flex size-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2 rounded-full bg-primary" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold uppercase text-primary",
									children: "SugarEcchi · 18+"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "font-display text-6xl font-extrabold leading-[0.88] sm:text-7xl lg:text-8xl",
								children: [
									"SUGAR",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent",
										children: "ECCHI"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-7 max-w-md text-lg leading-relaxed text-muted-foreground",
								children: t("home.bannerTitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/shop",
									className: "bg-primary px-7 py-3.5 text-xs font-bold uppercase text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/85",
									children: t("home.bannerCta")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/collections",
									className: "border border-border px-7 py-3.5 text-xs font-bold uppercase text-foreground transition-colors hover:border-accent hover:text-accent",
									children: t("home.collections")
								})]
							})
						]
					}), featured[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/product/$slug",
						params: { slug: featured[0].slug },
						className: "group relative mx-auto w-full max-w-xl lg:ml-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative ml-5 aspect-4/5 overflow-hidden rounded-2xl border border-border bg-card shadow-luxe sm:ml-12",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: featured[0].galleryUrls[0],
										alt: tx(featured[0].title),
										className: "size-full object-cover transition-transform duration-700 group-hover:scale-105"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-accent/10" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute bottom-5 left-5 right-5 rounded-xl border border-border/80 bg-background/70 p-5 backdrop-blur-xl sm:bottom-7 sm:left-7 sm:right-7",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] font-bold uppercase text-primary",
											children: t("home.featured")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 flex items-end justify-between gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "text-lg font-bold sm:text-xl",
												children: tx(featured[0].title)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "shrink-0 font-bold text-primary",
												children: ["$", featured[0].price]
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -left-1 bottom-12 flex size-20 items-center justify-center rounded-full border border-accent/40 bg-accent/15 text-center text-[10px] font-bold uppercase text-accent backdrop-blur sm:size-24",
								children: t("home.collections")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -right-2 top-8 grid size-20 rotate-6 place-items-center bg-accent text-center text-[10px] font-extrabold uppercase text-accent-foreground sm:size-24",
								children: t("home.new")
							})
						]
					}) : null]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto w-full max-w-7xl px-4 py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-7 flex items-end justify-between border-b border-border pb-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "01 / Browse"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-2xl font-bold sm:text-3xl",
						children: t("home.byAnime")
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/anime",
						className: "hidden text-xs font-bold uppercase text-muted-foreground hover:text-primary sm:block",
						children: [t("home.bannerCta"), " →"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4",
					children: animes.map((anime) => {
						const count = packsForAnime(publishedPacks, characters, anime.id).length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/anime/$slug",
							params: { slug: anime.slug },
							className: "group relative bg-background p-6 transition-colors hover:bg-secondary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mb-8 block text-[10px] font-bold text-primary",
									children: ["0", animes.indexOf(anime) + 1]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg font-bold group-hover:text-primary",
									children: tx(anime.name)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-xs text-muted-foreground",
									children: [
										count,
										" ",
										t("common.packs")
									]
								})
							]
						}, anime.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductRail, {
				title: t("home.bestsellers"),
				packs: bestsellers,
				viewAllTo: "/shop",
				viewAllLabel: t("home.bannerCta")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductRail, {
				title: t("home.new"),
				packs: newest,
				viewAllTo: "/shop",
				viewAllLabel: t("home.bannerCta")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto w-full max-w-7xl px-4 py-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-6 text-2xl font-bold sm:text-3xl",
					children: t("home.featured")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: featured.map((pack) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { pack }, pack.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto w-full max-w-7xl px-4 pb-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-6 text-2xl font-bold sm:text-3xl",
					children: t("home.collections")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
					children: collections.map((collection) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/collections/$slug",
						params: { slug: collection.slug },
						className: "group border border-border/60 bg-card/70 p-6 transition-all hover:-translate-y-1 hover:border-accent/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl group-hover:text-accent",
							children: tx(collection.title)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: tx(collection.description)
						})]
					}, collection.id))
				})]
			})
		]
	});
}
//#endregion
export { HomePage as component };
