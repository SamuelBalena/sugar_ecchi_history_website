import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCatalog, newId, slugify } from "@/lib/catalog";
import { useLang } from "@/lib/i18n";
import { PATREON_URL } from "@/lib/social";
import { packImages } from "@/data/seed";
import { cn } from "@/lib/utils";
import type { Pack } from "@/lib/types";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Store admin — SugarEcchi" },
      {
        name: "description",
        content: "Internal SugarEcchi admin area to create, edit and publish art packs.",
      },
      { property: "og:title", content: "Store admin — SugarEcchi" },
      { property: "og:description", content: "Manage the SugarEcchi pack catalog." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const packSchema = z.object({
  titleEn: z.string().min(2, "English title is required"),
  titleJa: z.string().min(1, "Japanese title is required"),
  slug: z.string().min(2, "Slug is required"),
  descriptionEn: z.string().min(10, "English description is too short"),
  descriptionJa: z.string().min(2, "Japanese description is required"),
  contentsEn: z.string().min(2, "Contents are required"),
  contentsJa: z.string().min(1, "Japanese contents are required"),
  price: z.number().positive("Price must be greater than 0"),
  compareAtPrice: z.number().optional(),
  fileCount: z.number().int().positive("File count must be at least 1"),
  format: z.string().min(2, "Format is required"),
  patreonUrl: z.string().url("Patreon link must be a valid URL"),
  characterIds: z.array(z.string()).min(1, "Pick at least one character"),
  galleryUrls: z
    .array(
      z.string().refine(
        (value) => /^https?:\/\//i.test(value),
        "Each image must be a valid HTTP(S) link",
      ),
    )
    .min(1, "Add at least one image link"),
});

const emptyDraft = () => ({
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
  characterIds: [] as string[],
  tagIds: [] as string[],
  collectionIds: [] as string[],
  galleryUrls: [] as string[],
  isPublished: false,
  isFeatured: false,
  isBestseller: false,
  salesCount: 0,
  createdAt: new Date().toISOString().slice(0, 10),
});

type Draft = ReturnType<typeof emptyDraft>;

function AdminPage() {
  const { isAdmin, login, logout } = useCatalog();
  return (
    <SiteLayout showAgeGate={false}>
      <PageHeader eyebrow="Internal" title="Store admin" subtitle="Manage packs, characters and tags." />
      <div className="mx-auto w-full max-w-7xl px-4 pb-20">
        {isAdmin ? <AdminDashboard onLogout={logout} /> : <LoginForm onLogin={login} />}
      </div>
    </SiteLayout>
  );
}

const DEFAULT_ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL ?? "";

function LoginForm({
  onLogin,
}: {
  onLogin: (credentials: { email: string; password: string }) => Promise<void>;
}) {
  const [email, setEmail] = useState(DEFAULT_ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        try {
          setIsSubmitting(true);
          await onLogin({ email, password });
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Invalid administrator credentials");
        } finally {
          setIsSubmitting(false);
        }
      }}
      className="max-w-sm space-y-4 border border-border/60 bg-card p-6"
    >
      <p className="text-sm text-muted-foreground">Sign in with the administrator credentials configured in the API.</p>
      <Input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Admin email"
        aria-label="Admin email"
        required
      />
      <Input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        aria-label="Password"
        required
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { tx } = useLang();
  const {
    packs,
    characters,
    animes,
    tags,
    collections,
    savePack,
    deletePack,
    duplicatePack,
    addCharacter,
    addTag,
    addCollection,
  } = useCatalog();

  const [draft, setDraft] = useState<Draft>(emptyDraft());
  const [errors, setErrors] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [newCharacter, setNewCharacter] = useState({ en: "", ja: "", animeId: animes[0]?.id ?? "" });
  const [newTag, setNewTag] = useState({ en: "", ja: "" });
  const [newCollection, setNewCollection] = useState({ en: "", ja: "" });

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const toggleIn = (key: "characterIds" | "tagIds" | "collectionIds" | "galleryUrls", id: string) =>
    setDraft((prev) => ({
      ...prev,
      [key]: prev[key].includes(id) ? prev[key].filter((x) => x !== id) : [...prev[key], id],
    }));

  const checklist = useMemo(
    () => [
      { label: "Bilingual title", ok: Boolean(draft.titleEn && draft.titleJa) },
      { label: "Bilingual description", ok: Boolean(draft.descriptionEn && draft.descriptionJa) },
      { label: "At least one image", ok: draft.galleryUrls.length > 0 },
      { label: "At least one character", ok: draft.characterIds.length > 0 },
      { label: "Price set", ok: draft.price > 0 },
      { label: "Patreon link", ok: draft.patreonUrl.startsWith("http") },
    ],
    [draft],
  );

  const loadPack = (pack: Pack) => {
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
      createdAt: pack.createdAt,
    });
    setErrors([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      compareAtPrice: draft.compareAtPrice ? Number(draft.compareAtPrice) : undefined,
      fileCount: Number(draft.fileCount),
      format: draft.format,
      patreonUrl: draft.patreonUrl,
      characterIds: draft.characterIds,
      galleryUrls,
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
      title: { en: draft.titleEn, ja: draft.titleJa },
      description: { en: draft.descriptionEn, ja: draft.descriptionJa },
      contents: { en: draft.contentsEn, ja: draft.contentsJa },
      galleryUrls,
      characterIds: draft.characterIds,
      tagIds: draft.tagIds,
      collectionIds: draft.collectionIds,
      price: Number(draft.price),
      ...(draft.compareAtPrice ? { compareAtPrice: Number(draft.compareAtPrice) } : {}),
      isPublished: draft.isPublished,
      isFeatured: draft.isFeatured,
      isBestseller: draft.isBestseller,
      fileCount: Number(draft.fileCount),
      format: draft.format,
      salesCount: draft.salesCount,
      patreonUrl: draft.patreonUrl,
      createdAt: draft.createdAt,
      });
      setErrors([]);
      toast.success("Pack saved");
      setDraft(emptyDraft());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save pack");
    }
  };

  const chip = (active: boolean) =>
    cn(
      "border px-3 py-1.5 text-xs transition-colors",
      active
        ? "border-accent bg-accent/10 text-accent"
        : "border-border/70 text-muted-foreground hover:border-accent/60",
    );

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <section className="space-y-6 border border-border/60 bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">Pack editor</h2>
          <Button variant="outline" size="sm" onClick={() => setDraft(emptyDraft())}>
            New pack
          </Button>
        </div>

        {errors.length > 0 ? (
          <ul className="space-y-1 border border-destructive/50 bg-destructive/10 p-3 text-xs text-destructive">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title (EN)">
            <Input
              value={draft.titleEn}
              onChange={(event) => {
                set("titleEn", event.target.value);
                if (!draft.slug) set("slug", slugify(event.target.value));
              }}
            />
          </Field>
          <Field label="Title (JA)">
            <Input value={draft.titleJa} onChange={(e) => set("titleJa", e.target.value)} />
          </Field>
          <Field label="Slug">
            <Input value={draft.slug} onChange={(e) => set("slug", slugify(e.target.value))} />
          </Field>
          <Field label="Format">
            <Input value={draft.format} onChange={(e) => set("format", e.target.value)} />
          </Field>
          <Field label="Price (USD)">
            <Input
              type="number"
              value={draft.price}
              onChange={(e) => set("price", Number(e.target.value))}
            />
          </Field>
          <Field label="Compare-at price (optional)">
            <Input
              type="number"
              value={draft.compareAtPrice}
              onChange={(e) => set("compareAtPrice", e.target.value)}
            />
          </Field>
          <Field label="File count">
            <Input
              type="number"
              value={draft.fileCount}
              onChange={(e) => set("fileCount", Number(e.target.value))}
            />
          </Field>
          <Field label="Patreon URL">
            <Input value={draft.patreonUrl} onChange={(e) => set("patreonUrl", e.target.value)} />
          </Field>
        </div>

        <Field label="Description (EN)">
          <Textarea
            rows={3}
            value={draft.descriptionEn}
            onChange={(e) => set("descriptionEn", e.target.value)}
          />
        </Field>
        <Field label="Description (JA)">
          <Textarea
            rows={3}
            value={draft.descriptionJa}
            onChange={(e) => set("descriptionJa", e.target.value)}
          />
        </Field>
        <Field label="Contents (EN)">
          <Textarea
            rows={2}
            value={draft.contentsEn}
            onChange={(e) => set("contentsEn", e.target.value)}
          />
        </Field>
        <Field label="Contents (JA)">
          <Textarea
            rows={2}
            value={draft.contentsJa}
            onChange={(e) => set("contentsJa", e.target.value)}
          />
        </Field>

        <Field label="Image URLs">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="url"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="https://example.com/product-image.jpg"
              aria-label="Product image URL"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const url = imageUrl.trim();
                if (!/^https?:\/\//i.test(url)) {
                  toast.error("Enter a valid image link");
                  return;
                }
                if (!draft.galleryUrls.includes(url)) {
                  set("galleryUrls", [...draft.galleryUrls, url]);
                }
                setImageUrl("");
              }}
            >
              Add image
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Paste a direct image link and add as many as needed. The first image will be the product cover.
          </p>
          {draft.galleryUrls.length > 0 ? (
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
              {draft.galleryUrls.map((url, index) => (
                <div key={`${url}-${index}`} className="relative aspect-4/5 overflow-hidden border border-border bg-background">
                  <img
                    src={url}
                    alt={`Product preview ${index + 1}`}
                    className="size-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    aria-label={`Remove image ${index + 1}`}
                    onClick={() =>
                      set(
                        "galleryUrls",
                        draft.galleryUrls.filter((_, imageIndex) => imageIndex !== index),
                      )
                    }
                    className="absolute right-1 top-1 size-7"
                  >
                    ×
                  </Button>
                  {index === 0 ? (
                    <span className="absolute bottom-1 left-1 bg-primary px-2 py-1 text-[9px] font-bold uppercase text-primary-foreground">
                      Cover
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </Field>

        <Field label="Demo image library (optional)">
          <div className="flex flex-wrap gap-2">
            {packImages.map((url) => (
              <button
                key={url}
                type="button"
                onClick={() => toggleIn("galleryUrls", url)}
                className={cn(
                  "size-16 border",
                  draft.galleryUrls.includes(url) ? "border-accent" : "border-border/60 opacity-60",
                )}
              >
                <img src={url} alt="" className="size-full object-cover" />
              </button>
            ))}
          </div>
        </Field>

        <Field label="Characters">
          <div className="flex flex-wrap gap-2">
            {characters.map((character) => (
              <button
                key={character.id}
                type="button"
                className={chip(draft.characterIds.includes(character.id))}
                onClick={() => toggleIn("characterIds", character.id)}
              >
                {tx(character.name)}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Input
              className="w-40"
              placeholder="New character (EN)"
              value={newCharacter.en}
              onChange={(e) => setNewCharacter((p) => ({ ...p, en: e.target.value }))}
            />
            <Input
              className="w-40"
              placeholder="新キャラ (JA)"
              value={newCharacter.ja}
              onChange={(e) => setNewCharacter((p) => ({ ...p, ja: e.target.value }))}
            />
            <select
              value={newCharacter.animeId}
              onChange={(e) => setNewCharacter((p) => ({ ...p, animeId: e.target.value }))}
              className="border border-border/70 bg-input/40 px-2 text-sm"
            >
              {animes.map((anime) => (
                <option key={anime.id} value={anime.id}>
                  {tx(anime.name)}
                </option>
              ))}
            </select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (!newCharacter.en.trim()) {
                  toast.error("Character name required");
                  return;
                }
                void addCharacter({
                  id: newId("ch"),
                  slug: slugify(newCharacter.en),
                  animeId: newCharacter.animeId || animes[0]?.id || "",
                  name: { en: newCharacter.en, ja: newCharacter.ja || newCharacter.en },
                  description: { en: newCharacter.en, ja: newCharacter.ja || newCharacter.en },
                }).then((character) => {
                  toggleIn("characterIds", character.id);
                  setNewCharacter({ en: "", ja: "", animeId: animes[0]?.id ?? "" });
                  toast.success("Character added");
                }).catch((error: unknown) => toast.error(error instanceof Error ? error.message : "Unable to add character"));
              }}
            >
              Add
            </Button>
          </div>
        </Field>

        <Field label="Tags">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                className={chip(draft.tagIds.includes(tag.id))}
                onClick={() => toggleIn("tagIds", tag.id)}
              >
                {tx(tag.label)}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Input
              className="w-40"
              placeholder="New tag (EN)"
              value={newTag.en}
              onChange={(e) => setNewTag((p) => ({ ...p, en: e.target.value }))}
            />
            <Input
              className="w-40"
              placeholder="新タグ (JA)"
              value={newTag.ja}
              onChange={(e) => setNewTag((p) => ({ ...p, ja: e.target.value }))}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (!newTag.en.trim()) {
                  toast.error("Tag name required");
                  return;
                }
                void addTag({
                  id: newId("tg"),
                  slug: slugify(newTag.en),
                  label: { en: newTag.en, ja: newTag.ja || newTag.en },
                }).then((tag) => {
                  toggleIn("tagIds", tag.id);
                  setNewTag({ en: "", ja: "" });
                  toast.success("Tag added");
                }).catch((error: unknown) => toast.error(error instanceof Error ? error.message : "Unable to add tag"));
              }}
            >
              Add
            </Button>
          </div>
        </Field>

        <Field label="Collections">
          <div className="flex flex-wrap gap-2">
            {collections.map((collection) => (
              <button
                key={collection.id}
                type="button"
                className={chip(draft.collectionIds.includes(collection.id))}
                onClick={() => toggleIn("collectionIds", collection.id)}
              >
                {tx(collection.title)}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Input
              className="w-44"
              placeholder="New collection (EN)"
              value={newCollection.en}
              onChange={(e) => setNewCollection((p) => ({ ...p, en: e.target.value }))}
            />
            <Input
              className="w-44"
              placeholder="新コレクション (JA)"
              value={newCollection.ja}
              onChange={(e) => setNewCollection((p) => ({ ...p, ja: e.target.value }))}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (!newCollection.en.trim()) {
                  toast.error("Collection title required");
                  return;
                }
                void addCollection({
                  id: newId("co"),
                  slug: slugify(newCollection.en),
                  title: { en: newCollection.en, ja: newCollection.ja || newCollection.en },
                  description: { en: newCollection.en, ja: newCollection.ja || newCollection.en },
                })
                  .then((col) => {
                    toggleIn("collectionIds", col.id);
                    setNewCollection({ en: "", ja: "" });
                    toast.success("Collection added");
                  })
                  .catch((error: unknown) =>
                    toast.error(error instanceof Error ? error.message : "Unable to add collection"),
                  );
              }}
            >
              Add
            </Button>
          </div>
        </Field>

        <div className="flex flex-wrap gap-4 text-sm">
          {(["isPublished", "isFeatured", "isBestseller"] as const).map((key) => (
            <label key={key} className="flex items-center gap-2 text-muted-foreground">
              <input
                type="checkbox"
                checked={draft[key]}
                onChange={(e) => set(key, e.target.checked)}
              />
              {key.replace("is", "")}
            </label>
          ))}
        </div>

        <div className="border-t border-border/60 pt-4">
          <p className="eyebrow">Publish checklist</p>
          <ul className="mt-3 space-y-1 text-sm">
            {checklist.map((item) => (
              <li
                key={item.label}
                className={item.ok ? "text-accent" : "text-muted-foreground"}
              >
                {item.ok ? "✓" : "○"} {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => void submit()}>Save pack</Button>
          <Button variant="outline" onClick={onLogout}>
            Sign out
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">Packs ({packs.length})</h2>
        </div>
        <ul className="space-y-2">
          {packs.map((pack) => (
            <li
              key={pack.id}
              className="flex items-center gap-3 border border-border/60 bg-card p-3"
            >
              <img src={pack.galleryUrls[0]} alt="" className="size-12 object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{tx(pack.title)}</p>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  ${pack.price} · {pack.isPublished ? "Published" : "Draft"}
                </p>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" onClick={() => loadPack(pack)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => void duplicatePack(pack.id).then(() => toast.success("Pack duplicated")).catch((error: unknown) => toast.error(error instanceof Error ? error.message : "Unable to duplicate pack"))}
                >
                  Copy
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => void deletePack(pack.id).then(() => toast.success("Pack deleted")).catch((error: unknown) => toast.error(error instanceof Error ? error.message : "Unable to delete pack"))}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
