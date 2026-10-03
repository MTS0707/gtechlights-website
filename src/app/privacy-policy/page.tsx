import { pageMetadata } from "@/lib/seo";
import { privacyPolicy } from "@/data/legal";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = pageMetadata({ title: privacyPolicy.title, description: privacyPolicy.summary, path: "/privacy-policy" });

export default function Page() {
  return <LegalPage doc={privacyPolicy} />;
}
