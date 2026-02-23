import { createClient } from "contentful";

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// ✅ Generic fetch
export const getEntries = async (query: any) => {
  try {
    const response = await contentfulClient.getEntries(query);
    return response.items;
  } catch (error) {
    console.error("Contentful Error:", error);
    return [];
  }
};

// ✅ Specific APIs
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