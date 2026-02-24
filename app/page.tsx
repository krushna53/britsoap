import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const headersList = await headers();
  const acceptLang = headersList.get("accept-language") || "en";

  let lang = "en";

  if (acceptLang.includes("hi")) lang = "hi";
  else if (acceptLang.includes("zh")) lang = "zh";
  else if (acceptLang.includes("ar")) lang = "ar";
  else if (acceptLang.includes("fr")) lang = "fr";

  redirect(`/${lang}`);
}