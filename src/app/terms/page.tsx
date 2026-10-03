import { pageMetadata } from "@/lib/seo";
import { termsOfUse } from "@/data/legal";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = pageMetadata({ title: termsOfUse.title, description: termsOfUse.summary, path: "/terms" });

export default function Page() {
  return <LegalPage doc={termsOfUse} />;
}
