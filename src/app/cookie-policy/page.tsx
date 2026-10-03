import { pageMetadata } from "@/lib/seo";
import { cookiePolicy } from "@/data/legal";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = pageMetadata({ title: cookiePolicy.title, description: cookiePolicy.summary, path: "/cookie-policy" });

export default function Page() {
  return <LegalPage doc={cookiePolicy} />;
}
