import {
  createClient,
  Entry,
  EntryCollection,
  EntrySkeletonType,
} from "contentful";
import { translateText } from "./translate";
import { Document } from "@contentful/rich-text-types";

/* ------------------------------------------------------------------ */
/* Contentful Client */
/* ------------------------------------------------------------------ */

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

/* ------------------------------------------------------------------ */
/* Generic Skeleton */
/* ------------------------------------------------------------------ */

type GenericSkeleton = EntrySkeletonType & {
  fields: Record<string, unknown>;
};

/* ------------------------------------------------------------------ */
/* Rich Text Guard (🔥 CRITICAL FIX) */
/* ------------------------------------------------------------------ */

const isRichTextDocument = (value: unknown): value is Document => {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as Document).nodeType === "document" &&
    Array.isArray((value as Document).content)
  );
};

/* ------------------------------------------------------------------ */
/* Auto Translate (SAFE) */
/* ------------------------------------------------------------------ */

const translateObject = async (
  obj: Record<string, unknown>,
  lang: string
): Promise<Record<string, unknown>> => {
  // 🛑 DO NOT TOUCH RICH TEXT
  if (isRichTextDocument(obj)) {
    return obj;
  }

  const result: Record<string, unknown> = {};

  for (const key in obj) {
    const value = obj[key];

    // string
    if (typeof value === "string") {
      result[key] = await translateText(value, lang);
    }

    // array
    else if (Array.isArray(value)) {
      result[key] = await Promise.all(
        value.map(async (item) => {
          if (typeof item === "string") {
            return await translateText(item, lang);
          }

          if (isRichTextDocument(item)) {
            return item;
          }

          if (typeof item === "object" && item !== null) {
            return await translateObject(
              item as Record<string, unknown>,
              lang
            );
          }

          return item;
        })
      );
    }

    // rich text
    else if (isRichTextDocument(value)) {
      result[key] = value;
    }

    // object
    else if (typeof value === "object" && value !== null) {
      result[key] = await translateObject(
        value as Record<string, unknown>,
        lang
      );
    }

    // other
    else {
      result[key] = value;
    }
  }

  return result;
};

/* ------------------------------------------------------------------ */
/* Generic Fetch */
/* ------------------------------------------------------------------ */

export const getEntries = async (
  query: Record<string, unknown>
): Promise<Entry<GenericSkeleton>[]> => {
  try {
    const response: EntryCollection<GenericSkeleton> =
      await contentfulClient.getEntries({
        ...query,
        include:
          (query.include as
            | 0
            | 1
            | 2
            | 3
            | 4
            | 5
            | 6
            | 7
            | 8
            | 9
            | 10) || 3,
      });

    return response.items;
  } catch (error) {
    console.error("Contentful Error:", error);
    return [];
  }
};

/* ------------------------------------------------------------------ */
/* Pages */
/* ------------------------------------------------------------------ */

export const getHomepage = async (
  lang: string = "en"
): Promise<Record<string, unknown> | null> => {
  const items = await getEntries({
    content_type: "homepage",
    include: 2,
    limit: 1,
  });

  const data = items[0]?.fields;
  if (!data) return null;

  return await translateObject(data, lang);
};

/* ------------------------------------------------------------------ */
/* Services */
/* ------------------------------------------------------------------ */

export type Service = {
  title: string;
  description: Document | string;
};

export const getServices = async (
  lang: string = "en"
): Promise<Service[]> => {
  const items = await getEntries({
    content_type: "service",
    order: ["fields.order"],
  });

  return Promise.all(
    items.map(async (item) => {
      const translated = await translateObject(item.fields, lang);

      return {
        title: (translated.title as string) || "",
        description:
          (translated.description as Service["description"]) || "",
      };
    })
  );
};

/* ------------------------------------------------------------------ */
/* About Page */
/* ------------------------------------------------------------------ */

export const getAboutPage = async (
  lang: string = "en"
): Promise<Record<string, unknown> | null> => {
  const items = await getEntries({
    content_type: "aboutPage",
    include: 2,
    limit: 1,
  });

  const data = items[0]?.fields;
  if (!data) return null;

  return await translateObject(data, lang);
};

/* ------------------------------------------------------------------ */
/* Products */
/* ------------------------------------------------------------------ */

export const getCategoriesWithCounts = async (
  lang: string = "en"
): Promise<{ title: string; slug: string; count: number }[]> => {
  const items = await getEntries({
    content_type: "productCategory",
    include: 2,
  });

  return Promise.all(
    items.map(async (item) => {
      const translated = await translateObject(item.fields, lang);

      const products =
        (item.fields.products as Entry<GenericSkeleton>[]) || [];

      return {
        title: (translated.title as string) || "",
        slug: (item.fields.slug as string) || "",
        count: products.length,
      };
    })
  );
};

export const getCategoryWithProducts = async (
  slug: string,
  lang: string = "en"
) => {
  const items = await getEntries({
    content_type: "productCategory",
    "fields.slug": slug,
    include: 3,
    limit: 1,
  });

  const category = items[0];
  if (!category) return null;

  const rawProducts =
    (category.fields.products as Entry<GenericSkeleton>[]) || [];

  const products = await Promise.all(
    rawProducts.map(async (product) => {
      const fields = product.fields;

      const translated = await translateObject(
        fields as Record<string, unknown>,
        lang
      );

      return {
        name: (translated.name as string) || "",
        slug:
          (fields.slug as string) ||
          (fields.name as string)?.toLowerCase().replace(/\s+/g, "-"),
        shortDescription:
          (translated.shortDescription as string) || "",
        imageUrl: fields.image
          ? `https:${
              ((fields.image as Entry<GenericSkeleton>).fields.file as {
                url: string;
              })?.url
            }`
          : null,
        order: (fields.order as number) || 0,
      };
    })
  );

  products.sort((a, b) => a.order - b.order);

  const translatedCategory = await translateObject(
    category.fields as Record<string, unknown>,
    lang
  );

  return {
    title: (translatedCategory.title as string) || "",
    slug: (category.fields.slug as string) || "",
    products,
  };
};

/* ------------------------------------------------------------------ */
/* Contact */
/* ------------------------------------------------------------------ */

export const getContactSection = async (
  lang: string = "en"
): Promise<Record<string, unknown> | null> => {
  const items = await getEntries({
    content_type: "contactSection",
    limit: 1,
  });

  const data = items[0]?.fields;
  if (!data) return null;

  return await translateObject(data, lang);
};