import { PageProps } from "@/types/page-types";
import { getTranslations } from "next-intl/server";

export default async function OrganisationPage({ params }: PageProps) {
  const t = await getTranslations("HomePage");
  const orgId = await params.then((data) => data.organisationId);
  return (
    <div>
      <h1>
        {t("welcome")}: {orgId}
      </h1>
    </div>
  );
}
