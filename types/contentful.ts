export type Product = {
  name: string;
  slug: string;
  shortDescription?: string;
  imageUrl?: string | null;
  order?: number;
};

export type Category = {
  title: string;
  slug: string;
  products: Product[];
};

export type Service = {
  title: string;
  description: string;
};

export type CategoryWithCount = {
  title: string;
  slug: string;
  count: number;
};