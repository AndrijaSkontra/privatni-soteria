"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { createCookie } from "@/lib/serverActions/create-cookie";

export function OrganizationSwitcher({
  organisations,
  activeOrganisationFromCookie,
}: {
  organisations: Organisation[];
  activeOrganisationFromCookie: Organisation;
}) {
  const { isMobile } = useSidebar();

  const [activeOrganisation, setActiveOrganisation] = useState(
    activeOrganisationFromCookie || organisations[0],
  );

  const router = useRouter();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeOrganisation.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Organizations
            </DropdownMenuLabel>
            {organisations.map((organisation) => (
              <DropdownMenuItem
                key={organisation.name}
                onClick={() => {
                  router.push(`/${organisation.id}`);
                  createCookie("active-organisation", organisation.id);
                  setActiveOrganisation(organisation);
                }}
                className="gap-2 p-2"
              >
                {organisation.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
