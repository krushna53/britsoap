import { createClient } from "contentful";

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// ✅ Generic fetch
export const getEntries = async (query: any) => {
  try {
    const response = await contentfulClient.getEntries({
      ...query,
      include: query.include || 3, // ensure deep resolve
    });

    return response.items;
  } catch (error) {
    console.error("Contentful Error:", error);
    return [];
  }
};

//
// ✅ STATIC PAGES
//

export const getHomepage = async () => {
  const items = await getEntries({
    content_type: "homepage",
    include: 2,
    limit: 1,
  });

  return items[0]?.fields || null;
};

export const getServices = async () => {
  const items = await getEntries({
    content_type: "service",
    order: ["fields.order"],
  });

  return items.map((item: any) => ({
    title: item.fields.title,
    description: item.fields.description,
  }));
};

export const getAboutPage = async () => {
  const items = await getEntries({
    content_type: "aboutPage",
    include: 2,
    limit: 1,
  });

  return items[0]?.fields || null;
};

//
// ✅ PRODUCTS (CLEAN ARCHITECTURE)
//

// 👉 Get ALL categories with product count (for /products page)
export const getCategoriesWithCounts = async () => {
  const items = await getEntries({
    content_type: "productCategory",
    include: 2,
  });

  return items.map((item: any) => {
    const products = item.fields.products || [];

    return {
      title: item.fields.title || "",
      slug: item.fields.slug || "",
      count: products.length,
    };
  });
};

// 👉 Get SINGLE category with its products (for /products/[category])
export const getCategoryWithProducts = async (slug: string) => {
  const items = await getEntries({
    content_type: "productCategory",
    "fields.slug": slug,
    include: 3,
    limit: 1,
  });

  const category = items[0];
  if (!category) return null;

  const rawProducts = category.fields.products || [];

  // 🔍 DEBUG (see terminal)
  console.log("CATEGORY:", slug);
  console.log(
    "PRODUCT SLUGS:",
    rawProducts.map((p: any) => p?.fields?.slug)
  );

  const products = rawProducts
    .filter((p: any) => p?.fields)
    .map((product: any) => ({
      name: product.fields.name || "",
      slug: product.fields.slug || "",
      shortDescription: product.fields.shortDescription || "",

      imageUrl: product.fields.image?.fields?.file?.url
        ? `https:${product.fields.image.fields.file.url}`
        : null,

      order: product.fields.order || 0,
    }));

  products.sort((a: any, b: any) => a.order - b.order);

  return {
    title: category.fields.title || "",
    slug: category.fields.slug || "",
    products,
  };
};

export const getContactSection = async () => {
  const items = await getEntries({
    content_type: "contactSection",
    limit: 1,
  });

  return items[0]?.fields || null;
};