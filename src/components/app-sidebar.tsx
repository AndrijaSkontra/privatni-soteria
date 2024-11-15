"use client";

import * as React from "react";
import { MainNavigation } from "@/components/nav-main";
import { OrganizationSwitcher } from "@/components/organization-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavSettings } from "@/components/nav-settings";
import {
  NavigationLinkType,
  Organisation,
  OrganisationWithRoles,
} from "@/types/app-types";

export function AppSidebar({
  organisationsWithRoles,
  activeOrganisation,
  navigationLinks,
}: {
  organisationsWithRoles: OrganisationWithRoles[];
  activeOrganisation: Organisation;
  navigationLinks: NavigationLinkType[];
}) {
  return (
    <Sidebar>
      <SidebarHeader>
        <OrganizationSwitcher
          organisationsWithRoles={organisationsWithRoles}
          activeOrganisation={activeOrganisation}
        />
      </SidebarHeader>
      <SidebarContent>
        <MainNavigation
          links={navigationLinks}
          organisationId={activeOrganisation.id}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavSettings />
      </SidebarFooter>
    </Sidebar>
  );
}
