import { auth } from "@/auth";
import { isUserAdmin } from "@/lib/services/user-service";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: RouteParams;
}) {
  // const session = await auth();
  // const organisationId = (await params).organisationId;
  // const isAdmin = await isUserAdmin(organisationId, session!.user.userId);
  // if (!isAdmin) {
  //   redirect("/not-found");
  // }
  return <div>{children}</div>;
}
