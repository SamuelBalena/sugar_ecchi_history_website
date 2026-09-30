import { r as __toESM } from "../_runtime.mjs";
import { a as Trigger2, c as require_jsx_runtime, i as Root2, l as require_react, n as Header, o as Slot, r as Item, t as Content2 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as X_URL, i as PATREON_URL, l as useCatalog, t as BRAND, u as useLang } from "./catalog-LwytbwQE.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as Heart, c as ChevronDown, i as Menu, n as ShoppingBag, r as Search, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteLayout-C-HU6hZr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-bold cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:-translate-y-0.5 hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var GATE_KEY = "sugarecchi.gate.v1";
function AgeGate() {
	const { t } = useLang();
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (window.localStorage.getItem(GATE_KEY) !== "1") setOpen(true);
	}, []);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-100 flex items-center justify-center bg-background/95 px-4 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md border border-border bg-card p-8 text-center shadow-luxe",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: BRAND
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-3xl font-semibold",
					children: t("gate.title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gold-rule mx-auto my-5 w-24" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted-foreground",
					children: t("gate.body")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-7 flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						onClick: () => {
							window.localStorage.setItem(GATE_KEY, "1");
							setOpen(false);
						},
						children: t("gate.enter")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://www.google.com",
						className: "text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground",
						children: t("gate.leave")
					})]
				})
			]
		})
	});
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
function levenshtein(a, b) {
	const m = a.length;
	const n = b.length;
	if (!m) return n;
	if (!n) return m;
	let prev = Array.from({ length: n + 1 }, (_, i) => i);
	for (let i = 1; i <= m; i += 1) {
		const curr = [i];
		for (let j = 1; j <= n; j += 1) {
			const cost = a[i - 1] === b[j - 1] ? 0 : 1;
			curr[j] = Math.min((curr[j - 1] ?? 0) + 1, (prev[j] ?? 0) + 1, (prev[j - 1] ?? 0) + cost);
		}
		prev = curr;
	}
	return prev[n] ?? 0;
}
/** 0 = no match, higher = better. Tolerates typos in EN and JA. */
function fuzzyScore(haystack, needle) {
	const h = haystack.toLowerCase().trim();
	const q = needle.toLowerCase().trim();
	if (!q) return 1;
	if (!h) return 0;
	if (h === q) return 100;
	if (h.startsWith(q)) return 80;
	if (h.includes(q)) return 60;
	let best = 0;
	for (const word of h.split(/[\s/,、・]+/)) {
		if (!word) continue;
		if (word.startsWith(q)) best = Math.max(best, 70);
		const dist = levenshtein(word, q);
		if (dist <= (q.length <= 4 ? 1 : q.length <= 7 ? 2 : 3)) best = Math.max(best, 50 - dist * 8);
	}
	return best;
}
function bestScore(fields, needle) {
	return fields.reduce((max, field) => Math.max(max, fuzzyScore(field, needle)), 0);
}
function SearchBox({ onNavigate }) {
	const { t, tx } = useLang();
	const { publishedPacks, animes, characters } = useCatalog();
	const navigate = useNavigate();
	const [query, setQuery] = (0, import_react.useState)("");
	const [focused, setFocused] = (0, import_react.useState)(false);
	const blurTimer = (0, import_react.useRef)(null);
	const suggestions = (0, import_react.useMemo)(() => {
		const q = query.trim();
		if (q.length < 2) return [];
		const out = [];
		for (const pack of publishedPacks) {
			const score = bestScore([
				pack.title.en,
				pack.title.ja,
				pack.slug
			], q);
			if (score > 0) out.push({
				key: `p-${pack.id}`,
				label: tx(pack.title),
				kind: "Pack",
				slug: pack.slug,
				score: score + 5
			});
		}
		for (const character of characters) {
			const score = bestScore([
				character.name.en,
				character.name.ja,
				character.slug
			], q);
			if (score > 0) out.push({
				key: `c-${character.id}`,
				label: tx(character.name),
				kind: "Character",
				slug: character.slug,
				score
			});
		}
		for (const anime of animes) {
			const score = bestScore([
				anime.name.en,
				anime.name.ja,
				anime.slug
			], q);
			if (score > 0) out.push({
				key: `a-${anime.id}`,
				label: tx(anime.name),
				kind: "Anime",
				slug: anime.slug,
				score
			});
		}
		return out.sort((a, b) => b.score - a.score).slice(0, 6);
	}, [
		query,
		publishedPacks,
		characters,
		animes,
		tx
	]);
	const close = () => {
		if (blurTimer.current) clearTimeout(blurTimer.current);
		blurTimer.current = setTimeout(() => setFocused(false), 120);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (event) => {
				event.preventDefault();
				setFocused(false);
				onNavigate?.();
				navigate({
					to: "/shop",
					search: { q: query.trim() || void 0 }
				});
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: query,
				onChange: (event) => setQuery(event.target.value),
				onFocus: () => setFocused(true),
				onBlur: close,
				placeholder: t("search.ph"),
				"aria-label": t("search.ph"),
				className: "h-10 border-border/70 bg-input/40 text-sm placeholder:text-muted-foreground/70 focus-visible:border-accent",
				style: { paddingLeft: "2.5rem" }
			})]
		}), focused && query.trim().length >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute left-0 right-0 top-12 z-50 border border-border bg-popover shadow-luxe",
			children: suggestions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 py-3 text-sm text-muted-foreground",
				children: t("search.none")
			}) : suggestions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.kind === "Pack" ? "/product/$slug" : item.kind === "Character" ? "/characters/$slug" : "/anime/$slug",
				params: { slug: item.slug },
				onClick: () => {
					setFocused(false);
					setQuery("");
					onNavigate?.();
				},
				className: "flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-secondary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: item.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 text-[10px] uppercase tracking-widest text-accent",
					children: item.kind
				})]
			}, item.key))
		}) : null]
	});
}
var links = [
	{
		to: "/shop",
		key: "nav.shop"
	},
	{
		to: "/anime",
		key: "nav.anime"
	},
	{
		to: "/characters",
		key: "nav.characters"
	},
	{
		to: "/collections",
		key: "nav.collections"
	},
	{
		to: "/tags",
		key: "nav.tags"
	},
	{
		to: "/faq",
		key: "nav.faq"
	}
];
function Navbar() {
	const { t, lang, setLang } = useLang();
	const { wishlist } = useCatalog();
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex min-h-18 w-full max-w-7xl items-center gap-3 px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "md:hidden",
						"aria-label": "Menu",
						onClick: () => setOpen((v) => !v),
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "font-display text-xl font-extrabold text-foreground",
						children: ["SUGAR", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "ECCHI"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "navbar-primary ml-4 min-w-0 items-center gap-4",
						children: links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: link.to,
							className: "text-xs font-bold uppercase text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary",
							children: t(link.key)
						}, link.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "navbar-search ml-auto w-48 shrink-0 xl:w-64",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center gap-2 md:ml-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "navbar-language items-center text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setLang("en"),
										className: lang === "en" ? "px-1.5 text-accent" : "px-1.5 text-muted-foreground hover:text-foreground",
										children: "EN"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-border",
										children: "|"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setLang("ja"),
										className: lang === "ja" ? "px-1.5 text-accent" : "px-1.5 text-muted-foreground hover:text-foreground",
										children: "日本語"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "ghost",
								size: "icon",
								"aria-label": t("nav.wishlist"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/wishlist",
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-4" }), wishlist.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground",
										children: wishlist.length
									}) : null]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden size-9 items-center justify-center text-muted-foreground sm:flex",
								"aria-hidden": "true",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-4" })
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden border-t border-border/50 bg-secondary/30 md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-9 w-full max-w-7xl items-center gap-6 px-4 text-[11px] uppercase tracking-[0.2em] text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							search: { sort: "bestselling" },
							className: "hover:text-accent",
							children: t("nav.bestsellers")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							search: { sort: "newest" },
							className: "hover:text-accent",
							children: t("nav.new")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							search: { sale: true },
							className: "hover:text-accent",
							children: t("nav.sale")
						})
					]
				})
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border/60 bg-background px-4 pb-4 pt-3 md:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, { onNavigate: () => setOpen(false) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-3 flex flex-col",
						children: links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: link.to,
							onClick: () => setOpen(false),
							className: "border-b border-border/40 py-3 text-sm text-muted-foreground hover:text-accent",
							children: t(link.key)
						}, link.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center gap-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setLang("en"),
								className: lang === "en" ? "text-accent" : "text-muted-foreground",
								children: "EN"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-border",
								children: "|"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setLang("ja"),
								className: lang === "ja" ? "text-accent" : "text-muted-foreground",
								children: "日本語"
							})
						]
					})
				]
			}) : null
		]
	});
}
function XIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
	});
}
function PatreonIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14.82 2.41c3.96 0 7.18 3.24 7.18 7.21 0 3.96-3.22 7.18-7.18 7.18-3.97 0-7.21-3.22-7.21-7.18 0-3.97 3.24-7.21 7.21-7.21M2 21.6h3.5V2.41H2z" })
	});
}
function Footer() {
	const { t } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-border/70 bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: t("footer.catalog")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							className: "hover:text-accent",
							children: t("nav.shop")
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/anime",
							className: "hover:text-accent",
							children: t("nav.anime")
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/characters",
							className: "hover:text-accent",
							children: t("nav.characters")
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/collections",
							className: "hover:text-accent",
							children: t("nav.collections")
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/tags",
							className: "hover:text-accent",
							children: t("nav.tags")
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/faq",
							className: "hover:text-accent",
							children: t("nav.faq")
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: t("footer.store")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("footer.policy") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("footer.payments") })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: t("footer.social")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: PATREON_URL,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "inline-flex items-center gap-2 text-muted-foreground hover:text-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatreonIcon, { className: "size-4" }), " Patreon"]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: X_URL,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "inline-flex items-center gap-2 text-muted-foreground hover:text-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XIcon, { className: "size-4" }), " X"]
					}) })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-2xl font-extrabold",
						children: ["SUGAR", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "ECCHI"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground",
						children: t("footer.disclaimer")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin",
						className: "mt-4 inline-block text-[11px] uppercase tracking-widest text-muted-foreground/60 hover:text-muted-foreground",
						children: t("footer.admin")
					})
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border/50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-5 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					BRAND
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "18+ · Fictional adult characters · Payments on Patreon" })]
			})
		})]
	});
}
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var faqItems = [
	{
		id: "faq-1",
		question: {
			en: "Do I pay on this website?",
			ja: "このサイトで支払いをしますか？"
		},
		answer: {
			en: "No. This is a catalog. The product button opens Patreon in a new tab. Payment is handled by Patreon.",
			ja: "いいえ。ここはカタログです。商品ボタンはPatreonを新しいタブで開きます。支払いはPatreon側で行われます。"
		}
	},
	{
		id: "faq-2",
		question: {
			en: "Where do I receive the pack?",
			ja: "パックはどこで受け取れますか？"
		},
		answer: {
			en: "On Patreon, after checkout, through the listing you opened.",
			ja: "決済後、開いた商品ページのあるPatreon上で受け取れます。"
		}
	},
	{
		id: "faq-3",
		question: {
			en: "Why not buy only on Patreon?",
			ja: "Patreonだけで買えばいいのでは？"
		},
		answer: {
			en: "You can. This store exists to browse by anime, character, and tags faster than the native shop.",
			ja: "それでも構いません。このストアはアニメ・キャラ・タグで原生ショップより速く探すためのものです。"
		}
	},
	{
		id: "faq-4",
		question: {
			en: "Are the characters 18+?",
			ja: "キャラクターは18歳以上ですか？"
		},
		answer: {
			en: "Yes. Adult fictional characters only. Minors are not sold or depicted.",
			ja: "はい。創作の成人キャラクターのみです。未成年は扱いません。"
		}
	},
	{
		id: "faq-5",
		question: {
			en: "Can I get English and Japanese product info?",
			ja: "商品情報は英語と日本語で見られますか？"
		},
		answer: {
			en: "Yes. Switch EN / 日本語 in the navbar. Each product has both texts in one listing.",
			ja: "はい。ナビの EN / 日本語 で切り替えます。各商品は1件の登録で両方の本文を持ちます。"
		}
	},
	{
		id: "faq-6",
		question: {
			en: "A search typo returned nothing useful. What now?",
			ja: "検索の打ち間違いで出てこないときは？"
		},
		answer: {
			en: "Try the character or anime name. Search matches close spellings in English and Japanese.",
			ja: "キャラ名かアニメ名を試してください。英語・日本語の近い表記も探します。"
		}
	},
	{
		id: "faq-7",
		question: {
			en: "How do I follow updates?",
			ja: "更新はどこで追えますか？"
		},
		answer: {
			en: "Patreon https://www.patreon.com/c/SugarEcchi and X https://x.com/SugarEcchi",
			ja: "Patreon https://www.patreon.com/c/SugarEcchi と X https://x.com/SugarEcchi"
		}
	}
];
function FaqAccordion({ compact = false, withHeading = true }) {
	const { tx, t } = useLang();
	const items = compact ? faqItems.slice(0, 4) : faqItems;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "faq",
		className: "border-t border-border/60 bg-surface/30",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-4xl px-4 py-14",
			children: [withHeading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "FAQ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-3xl font-semibold",
					children: t("page.faq")
				})]
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
				type: "single",
				collapsible: true,
				className: "w-full",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
					value: item.id,
					className: "border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
						className: "text-left text-base hover:text-accent hover:no-underline",
						children: tx(item.question)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: tx(item.answer)
					})]
				}, item.id))
			})]
		})
	});
}
function SiteLayout({ children, faq = "none", showAgeGate = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background",
		children: [
			showAgeGate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgeGate, {}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children
			}),
			faq !== "none" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqAccordion, { compact: faq === "compact" }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function PageHeader({ eyebrow, title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-7xl px-4 pb-8 pt-14",
		children: [
			eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: eyebrow
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-4xl font-bold sm:text-5xl",
				children: title
			}),
			subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm text-muted-foreground",
				children: subtitle
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gold-rule mt-6 w-full max-w-40" })
		]
	});
}
//#endregion
export { SiteLayout as a, PageHeader as i, FaqAccordion as n, bestScore as o, Input as r, cn as s, Button as t };
