import { r as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as slugify, i as PATREON_URL, l as useCatalog, o as newId, s as packImages, u as useLang } from "./catalog-LwytbwQE.mjs";
import { a as SiteLayout, i as PageHeader, r as Input, s as cn, t as Button } from "./SiteLayout-C-HU6hZr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as stringType, n as numberType, r as objectType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-1iSU30GZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var packSchema = objectType({
	titleEn: stringType().min(2, "English title is required"),
	titleJa: stringType().min(1, "Japanese title is required"),
	slug: stringType().min(2, "Slug is required"),
	descriptionEn: stringType().min(10, "English description is too short"),
	descriptionJa: stringType().min(2, "Japanese description is required"),
	contentsEn: stringType().min(2, "Contents are required"),
	contentsJa: stringType().min(1, "Japanese contents are required"),
	price: numberType().positive("Price must be greater than 0"),
	compareAtPrice: numberType().optional(),
	fileCount: numberType().int().positive("File count must be at least 1"),
	format: stringType().min(2, "Format is required"),
	patreonUrl: stringType().url("Patreon link must be a valid URL"),
	characterIds: arrayType(stringType()).min(1, "Pick at least one character"),
	galleryUrls: arrayType(stringType().refine((value) => /^https?:\/\//i.test(value), "Each image must be a valid HTTP(S) link")).min(1, "Add at least one image link")
});
var emptyDraft = () => ({
	id: newId("pk"),
	titleEn: "",
	titleJa: "",
	slug: "",
	descriptionEn: "",
	descriptionJa: "",
	contentsEn: "",
	contentsJa: "",
	price: 18,
	compareAtPrice: "",
	fileCount: 20,
	format: "PNG + JPG, 4K",
	patreonUrl: PATREON_URL,
	characterIds: [],
	tagIds: [],
	collectionIds: [],
	galleryUrls: [],
	isPublished: false,
	isFeatured: false,
	isBestseller: false,
	salesCount: 0,
	createdAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
});
function AdminPage() {
	const { isAdmin, login, logout } = useCatalog();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, {
		showAgeGate: false,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Internal",
			title: "Store admin",
			subtitle: "Manage packs, characters and tags."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto w-full max-w-7xl px-4 pb-20",
			children: isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDashboard, { onLogout: logout }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginForm, { onLogin: login })
		})]
	});
}
var DEFAULT_ADMIN_EMAIL = "admin@sugarecchi.local";
function LoginForm({ onLogin }) {
	const [email, setEmail] = (0, import_react.useState)(DEFAULT_ADMIN_EMAIL);
	const [password, setPassword] = (0, import_react.useState)("");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: async (event) => {
			event.preventDefault();
			try {
				setIsSubmitting(true);
				await onLogin({
					email,
					password
				});
			} catch (error) {
				toast.error(error instanceof Error ? error.message : "Invalid administrator credentials");
			} finally {
				setIsSubmitting(false);
			}
		},
		className: "max-w-sm space-y-4 border border-border/60 bg-card p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Sign in with the administrator credentials configured in the API."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				type: "email",
				value: email,
				onChange: (event) => setEmail(event.target.value),
				placeholder: "Admin email",
				"aria-label": "Admin email",
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				type: "password",
				value: password,
				onChange: (event) => setPassword(event.target.value),
				placeholder: "Password",
				"aria-label": "Password",
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "w-full",
				disabled: isSubmitting,
				children: isSubmitting ? "Signing in..." : "Sign in"
			})
		]
	});
}
function AdminDashboard({ onLogout }) {
	const { tx } = useLang();
	const { packs, characters, animes, tags, collections, savePack, deletePack, duplicatePack, addCharacter, addTag, addCollection } = useCatalog();
	const [draft, setDraft] = (0, import_react.useState)(emptyDraft());
	const [errors, setErrors] = (0, import_react.useState)([]);
	const [imageUrl, setImageUrl] = (0, import_react.useState)("");
	const [newCharacter, setNewCharacter] = (0, import_react.useState)({
		en: "",
		ja: "",
		animeId: animes[0]?.id ?? ""
	});
	const [newTag, setNewTag] = (0, import_react.useState)({
		en: "",
		ja: ""
	});
	const [newCollection, setNewCollection] = (0, import_react.useState)({
		en: "",
		ja: ""
	});
	const set = (key, value) => setDraft((prev) => ({
		...prev,
		[key]: value
	}));
	const toggleIn = (key, id) => setDraft((prev) => ({
		...prev,
		[key]: prev[key].includes(id) ? prev[key].filter((x) => x !== id) : [...prev[key], id]
	}));
	const checklist = (0, import_react.useMemo)(() => [
		{
			label: "Bilingual title",
			ok: Boolean(draft.titleEn && draft.titleJa)
		},
		{
			label: "Bilingual description",
			ok: Boolean(draft.descriptionEn && draft.descriptionJa)
		},
		{
			label: "At least one image",
			ok: draft.galleryUrls.length > 0
		},
		{
			label: "At least one character",
			ok: draft.characterIds.length > 0
		},
		{
			label: "Price set",
			ok: draft.price > 0
		},
		{
			label: "Patreon link",
			ok: draft.patreonUrl.startsWith("http")
		}
	], [draft]);
	const loadPack = (pack) => {
		setDraft({
			id: pack.id,
			titleEn: pack.title.en,
			titleJa: pack.title.ja,
			slug: pack.slug,
			descriptionEn: pack.description.en,
			descriptionJa: pack.description.ja,
			contentsEn: pack.contents.en,
			contentsJa: pack.contents.ja,
			price: pack.price,
			compareAtPrice: pack.compareAtPrice ? String(pack.compareAtPrice) : "",
			fileCount: pack.fileCount,
			format: pack.format,
			patreonUrl: pack.patreonUrl,
			characterIds: [...pack.characterIds],
			tagIds: [...pack.tagIds],
			collectionIds: [...pack.collectionIds],
			galleryUrls: [...pack.galleryUrls],
			isPublished: pack.isPublished,
			isFeatured: pack.isFeatured,
			isBestseller: pack.isBestseller,
			salesCount: pack.salesCount,
			createdAt: pack.createdAt
		});
		setErrors([]);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	const submit = async () => {
		const slug = draft.slug || slugify(draft.titleEn);
		const galleryUrls = draft.galleryUrls.map((url) => url.trim()).filter(Boolean);
		const parsed = packSchema.safeParse({
			titleEn: draft.titleEn,
			titleJa: draft.titleJa,
			slug,
			descriptionEn: draft.descriptionEn,
			descriptionJa: draft.descriptionJa,
			contentsEn: draft.contentsEn,
			contentsJa: draft.contentsJa,
			price: Number(draft.price),
			compareAtPrice: draft.compareAtPrice ? Number(draft.compareAtPrice) : void 0,
			fileCount: Number(draft.fileCount),
			format: draft.format,
			patreonUrl: draft.patreonUrl,
			characterIds: draft.characterIds,
			galleryUrls
		});
		if (!parsed.success) {
			setErrors(parsed.error.issues.map((issue) => issue.message));
			toast.error("Please fix the highlighted fields");
			return;
		}
		try {
			await savePack({
				id: draft.id,
				slug,
				title: {
					en: draft.titleEn,
					ja: draft.titleJa
				},
				description: {
					en: draft.descriptionEn,
					ja: draft.descriptionJa
				},
				contents: {
					en: draft.contentsEn,
					ja: draft.contentsJa
				},
				galleryUrls,
				characterIds: draft.characterIds,
				tagIds: draft.tagIds,
				collectionIds: draft.collectionIds,
				price: Number(draft.price),
				...draft.compareAtPrice ? { compareAtPrice: Number(draft.compareAtPrice) } : {},
				isPublished: draft.isPublished,
				isFeatured: draft.isFeatured,
				isBestseller: draft.isBestseller,
				fileCount: Number(draft.fileCount),
				format: draft.format,
				salesCount: draft.salesCount,
				patreonUrl: draft.patreonUrl,
				createdAt: draft.createdAt
			});
			setErrors([]);
			toast.success("Pack saved");
			setDraft(emptyDraft());
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Unable to save pack");
		}
	};
	const chip = (active) => cn("border px-3 py-1.5 text-xs transition-colors", active ? "border-accent bg-accent/10 text-accent" : "border-border/70 text-muted-foreground hover:border-accent/60");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-10 lg:grid-cols-[1.4fr_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-6 border border-border/60 bg-card p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Pack editor"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => setDraft(emptyDraft()),
						children: "New pack"
					})]
				}),
				errors.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-1 border border-destructive/50 bg-destructive/10 p-3 text-xs text-destructive",
					children: errors.map((error) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: error }, error))
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Title (EN)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: draft.titleEn,
								onChange: (event) => {
									set("titleEn", event.target.value);
									if (!draft.slug) set("slug", slugify(event.target.value));
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Title (JA)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: draft.titleJa,
								onChange: (e) => set("titleJa", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Slug",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: draft.slug,
								onChange: (e) => set("slug", slugify(e.target.value))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Format",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: draft.format,
								onChange: (e) => set("format", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Price (USD)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: draft.price,
								onChange: (e) => set("price", Number(e.target.value))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Compare-at price (optional)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: draft.compareAtPrice,
								onChange: (e) => set("compareAtPrice", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "File count",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: draft.fileCount,
								onChange: (e) => set("fileCount", Number(e.target.value))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Patreon URL",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: draft.patreonUrl,
								onChange: (e) => set("patreonUrl", e.target.value)
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Description (EN)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 3,
						value: draft.descriptionEn,
						onChange: (e) => set("descriptionEn", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Description (JA)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 3,
						value: draft.descriptionJa,
						onChange: (e) => set("descriptionJa", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Contents (EN)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 2,
						value: draft.contentsEn,
						onChange: (e) => set("contentsEn", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Contents (JA)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 2,
						value: draft.contentsJa,
						onChange: (e) => set("contentsJa", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					label: "Image URLs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "url",
								value: imageUrl,
								onChange: (event) => setImageUrl(event.target.value),
								placeholder: "https://example.com/product-image.jpg",
								"aria-label": "Product image URL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => {
									const url = imageUrl.trim();
									if (!/^https?:\/\//i.test(url)) {
										toast.error("Enter a valid image link");
										return;
									}
									if (!draft.galleryUrls.includes(url)) set("galleryUrls", [...draft.galleryUrls, url]);
									setImageUrl("");
								},
								children: "Add image"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: "Paste a direct image link and add as many as needed. The first image will be the product cover."
						}),
						draft.galleryUrls.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5",
							children: draft.galleryUrls.map((url, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative aspect-4/5 overflow-hidden border border-border bg-background",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: url,
										alt: `Product preview ${index + 1}`,
										className: "size-full object-cover"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "destructive",
										size: "icon",
										"aria-label": `Remove image ${index + 1}`,
										onClick: () => set("galleryUrls", draft.galleryUrls.filter((_, imageIndex) => imageIndex !== index)),
										className: "absolute right-1 top-1 size-7",
										children: "×"
									}),
									index === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute bottom-1 left-1 bg-primary px-2 py-1 text-[9px] font-bold uppercase text-primary-foreground",
										children: "Cover"
									}) : null
								]
							}, `${url}-${index}`))
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Demo image library (optional)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: packImages.map((url) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => toggleIn("galleryUrls", url),
							className: cn("size-16 border", draft.galleryUrls.includes(url) ? "border-accent" : "border-border/60 opacity-60"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: url,
								alt: "",
								className: "size-full object-cover"
							})
						}, url))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					label: "Characters",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: characters.map((character) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: chip(draft.characterIds.includes(character.id)),
							onClick: () => toggleIn("characterIds", character.id),
							children: tx(character.name)
						}, character.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "w-40",
								placeholder: "New character (EN)",
								value: newCharacter.en,
								onChange: (e) => setNewCharacter((p) => ({
									...p,
									en: e.target.value
								}))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "w-40",
								placeholder: "新キャラ (JA)",
								value: newCharacter.ja,
								onChange: (e) => setNewCharacter((p) => ({
									...p,
									ja: e.target.value
								}))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: newCharacter.animeId,
								onChange: (e) => setNewCharacter((p) => ({
									...p,
									animeId: e.target.value
								})),
								className: "border border-border/70 bg-input/40 px-2 text-sm",
								children: animes.map((anime) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: anime.id,
									children: tx(anime.name)
								}, anime.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => {
									if (!newCharacter.en.trim()) {
										toast.error("Character name required");
										return;
									}
									addCharacter({
										id: newId("ch"),
										slug: slugify(newCharacter.en),
										animeId: newCharacter.animeId || animes[0]?.id || "",
										name: {
											en: newCharacter.en,
											ja: newCharacter.ja || newCharacter.en
										},
										description: {
											en: newCharacter.en,
											ja: newCharacter.ja || newCharacter.en
										}
									}).then((character) => {
										toggleIn("characterIds", character.id);
										setNewCharacter({
											en: "",
											ja: "",
											animeId: animes[0]?.id ?? ""
										});
										toast.success("Character added");
									}).catch((error) => toast.error(error instanceof Error ? error.message : "Unable to add character"));
								},
								children: "Add"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					label: "Tags",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: chip(draft.tagIds.includes(tag.id)),
							onClick: () => toggleIn("tagIds", tag.id),
							children: tx(tag.label)
						}, tag.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "w-40",
								placeholder: "New tag (EN)",
								value: newTag.en,
								onChange: (e) => setNewTag((p) => ({
									...p,
									en: e.target.value
								}))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "w-40",
								placeholder: "新タグ (JA)",
								value: newTag.ja,
								onChange: (e) => setNewTag((p) => ({
									...p,
									ja: e.target.value
								}))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => {
									if (!newTag.en.trim()) {
										toast.error("Tag name required");
										return;
									}
									addTag({
										id: newId("tg"),
										slug: slugify(newTag.en),
										label: {
											en: newTag.en,
											ja: newTag.ja || newTag.en
										}
									}).then((tag) => {
										toggleIn("tagIds", tag.id);
										setNewTag({
											en: "",
											ja: ""
										});
										toast.success("Tag added");
									}).catch((error) => toast.error(error instanceof Error ? error.message : "Unable to add tag"));
								},
								children: "Add"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					label: "Collections",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: collections.map((collection) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: chip(draft.collectionIds.includes(collection.id)),
							onClick: () => toggleIn("collectionIds", collection.id),
							children: tx(collection.title)
						}, collection.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "w-44",
								placeholder: "New collection (EN)",
								value: newCollection.en,
								onChange: (e) => setNewCollection((p) => ({
									...p,
									en: e.target.value
								}))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "w-44",
								placeholder: "新コレクション (JA)",
								value: newCollection.ja,
								onChange: (e) => setNewCollection((p) => ({
									...p,
									ja: e.target.value
								}))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => {
									if (!newCollection.en.trim()) {
										toast.error("Collection title required");
										return;
									}
									addCollection({
										id: newId("co"),
										slug: slugify(newCollection.en),
										title: {
											en: newCollection.en,
											ja: newCollection.ja || newCollection.en
										},
										description: {
											en: newCollection.en,
											ja: newCollection.ja || newCollection.en
										}
									}).then((col) => {
										toggleIn("collectionIds", col.id);
										setNewCollection({
											en: "",
											ja: ""
										});
										toast.success("Collection added");
									}).catch((error) => toast.error(error instanceof Error ? error.message : "Unable to add collection"));
								},
								children: "Add"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-4 text-sm",
					children: [
						"isPublished",
						"isFeatured",
						"isBestseller"
					].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: draft[key],
							onChange: (e) => set(key, e.target.checked)
						}), key.replace("is", "")]
					}, key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border/60 pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Publish checklist"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-1 text-sm",
						children: checklist.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: item.ok ? "text-accent" : "text-muted-foreground",
							children: [
								item.ok ? "✓" : "○",
								" ",
								item.label
							]
						}, item.label))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => void submit(),
						children: "Save pack"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: onLogout,
						children: "Sign out"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-2xl",
					children: [
						"Packs (",
						packs.length,
						")"
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: packs.map((pack) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3 border border-border/60 bg-card p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: pack.galleryUrls[0],
							alt: "",
							className: "size-12 object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm",
								children: tx(pack.title)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] uppercase tracking-widest text-muted-foreground",
								children: [
									"$",
									pack.price,
									" · ",
									pack.isPublished ? "Published" : "Draft"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => loadPack(pack),
									children: "Edit"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => void duplicatePack(pack.id).then(() => toast.success("Pack duplicated")).catch((error) => toast.error(error instanceof Error ? error.message : "Unable to duplicate pack")),
									children: "Copy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => void deletePack(pack.id).then(() => toast.success("Pack deleted")).catch((error) => toast.error(error instanceof Error ? error.message : "Unable to delete pack")),
									children: "Delete"
								})
							]
						})
					]
				}, pack.id))
			})]
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-2 block text-[11px] uppercase tracking-widest text-muted-foreground",
			children: label
		}), children]
	});
}
//#endregion
export { AdminPage as component };
