import { pageMetadata } from "@/lib/seo";
import { disclaimer } from "@/data/legal";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = pageMetadata({ title: disclaimer.title, description: disclaimer.summary, path: "/disclaimer" });

export default function Page() {
  return <LegalPage doc={disclaimer} />;
}
