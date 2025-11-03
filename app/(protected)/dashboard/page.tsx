"use client";

import {
  BarChartSquare02,
  Calendar,
  CheckDone01,
  ChevronRight,
  File05,
  PieChart03,
  Rows01,
  Users01,
} from "@untitledui/icons";
import type { NavItemType } from "@/components/application/app-navigation/config";
import { SidebarNavigationSectionsSubheadings } from "@/components/application/app-navigation/sidebar-navigation/sidebar-sections-subheadings";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";

const navItemsWithSectionsSubheadings: Array<{
  label: string;
  items: NavItemType[];
}> = [
  {
    label: "General",
    items: [
      {
        label: "Dashboard",
        href: "/",
        icon: BarChartSquare02,
      },
      {
        label: "Projects",
        href: "/projects",
        icon: Rows01,
      },
      {
        label: "Documents",
        href: "/documents",
        icon: File05,
      },
      {
        label: "Calendar",
        href: "/calendar",
        icon: Calendar,
      },
    ],
  },
  {
    label: "Untitled UI",
    items: [
      {
        label: "Reporting",
        href: "#",
        icon: PieChart03,
      },
      {
        label: "Tasks",
        href: "#",
        icon: CheckDone01,
        badge: (
          <Badge size="sm" type="modern">
            8
          </Badge>
        ),
      },
      {
        label: "Users",
        href: "#",
        icon: Users01,
      },
    ],
  },
  {
    label: "Your teams",
    items: [
      {
        label: "Catalog",
        href: "#",
        icon: () => (
          <Avatar
            src="https://www.untitledui.com/logos/images/Catalog.jpg"
            className="mr-2 size-5"
          />
        ),
        badge: (
          <div className="flex items-center gap-3">
            <Badge size="sm" type="modern">
              ⌘1
            </Badge>
            <ChevronRight size={16} className="text-fg-quaternary" />
          </div>
        ),
      },
      {
        label: "Warpspeed",
        href: "#",
        icon: () => (
          <Avatar
            src="https://www.untitledui.com/logos/images/Warpspeed.jpg"
            className="mr-2 size-5"
          />
        ),
        badge: (
          <div className="flex items-center gap-3">
            <Badge size="sm" type="modern">
              ⌘2
            </Badge>
            <ChevronRight size={16} className="text-fg-quaternary" />
          </div>
        ),
      },
      {
        label: "Boltshift",
        href: "#",
        icon: () => (
          <Avatar
            src="https://www.untitledui.com/logos/images/Boltshift.jpg"
            className="mr-2 size-5"
          />
        ),
        badge: (
          <div className="flex items-center gap-3">
            <Badge size="sm" type="modern">
              ⌘3
            </Badge>
            <ChevronRight size={16} className="text-fg-quaternary" />
          </div>
        ),
      },
      {
        label: "Sisyphus",
        href: "#",
        icon: () => (
          <Avatar
            src="https://www.untitledui.com/logos/images/Sisyphus.jpg"
            className="mr-2 size-5"
          />
        ),
        badge: (
          <div className="flex items-center gap-3">
            <Badge size="sm" type="modern">
              ⌘4
            </Badge>
            <ChevronRight size={16} className="text-fg-quaternary" />
          </div>
        ),
      },
    ],
  },
];

export default function Page() {
  return (
    <SidebarNavigationSectionsSubheadings
      activeUrl="/"
      items={navItemsWithSectionsSubheadings}
    />
  );
}
