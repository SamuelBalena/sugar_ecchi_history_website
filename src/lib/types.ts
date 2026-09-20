export type Lang = "en" | "ja";

export interface I18nText {
  en: string;
  ja: string;
}

export interface Anime {
  id: string;
  slug: string;
  name: I18nText;
  description: I18nText;
}

export interface Character {
  id: string;
  slug: string;
  animeId: string;
  name: I18nText;
  description: I18nText;
}

export interface Collection {
  id: string;
  slug: string;
  title: I18nText;
  description: I18nText;
}

export interface Tag {
  id: string;
  slug: string;
  label: I18nText;
}

export interface Pack {
  id: string;
  slug: string;
  title: I18nText;
  description: I18nText;
  contents: I18nText;
  galleryUrls: string[];
  characterIds: string[];
  tagIds: string[];
  collectionIds: string[];
  price: number;
  compareAtPrice?: number;
  isPublished: boolean;
  isFeatured: boolean;
  isBestseller: boolean;
  fileCount: number;
  format: string;
  salesCount: number;
  patreonUrl: string;
  createdAt: string;
}

export interface Catalog {
  animes: Anime[];
  characters: Character[];
  collections: Collection[];
  tags: Tag[];
  packs: Pack[];
}
