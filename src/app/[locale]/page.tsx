import OrganisationSelect from "@/components/organisation-select";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <h1>{t("title")}</h1>
      <OrganisationSelect />
    </div>
  );
}
