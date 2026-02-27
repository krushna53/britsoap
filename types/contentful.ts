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
// Contentful raw structures
export type ContentfulImage = {
  fields?: {
    file?: {
      url?: string;
    };
  };
};

export type ContentfulProduct = {
  fields: {
    name: string;
    slug: string;
    shortDescription?: string;
    image?: ContentfulImage;
    order?: number;
  };
};

// Homepage response type
export type HomepageData = {
  featuredProducts?: ContentfulProduct[];
};