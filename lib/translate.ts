export const translateText = async (
  text: string,
  lang: string
): Promise<string> => {
  if (!text || lang === "en") return text;

  try {
    const res = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${encodeURIComponent(
        text
      )}`
    );

    const data = await res.json();

    return data[0]?.map((item: [string]) => item[0]).join("") || text;
  } catch {
    return text;
  }
};