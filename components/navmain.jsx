"use client";

import * as React from "react";
import Link from "next/link";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const components = [
  {
    title: "Home",
    href: "/",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
  {
    title: "About Us",
    href: "/",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "News",
    href: "/",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Gallery",
    href: "/",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Achievements",
    href: "/",
    description: "Visually or semantically separates content.",
  },
  {
    title: "People",
    href: "/",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu viewport={false} className="relative z-50">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
          <NavigationMenuContent className="z-50 bg-white/90 text-black backdrop-blur-md rounded-md shadow-lg">
            <ul className="text-white grid w-full sm:w-[400px] md:w-[500px] lg:w-[600px] grid-cols-1 md:grid-cols-2 gap-2 max-w-[90vw] md:max-w-none overflow-y-auto max-h-[80vh] p-2">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Community</NavigationMenuTrigger>
          <NavigationMenuContent className="z-50 bg-white/90 text-black backdrop-blur-md rounded-md shadow-lg">
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="/dashboard"
                    className="block p-2 hover:bg-accent rounded-md"
                  >
                    <div className="font-medium">Forum Page</div>
                    <div className="text-muted-foreground">
                      Browse all topics
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="/search"
                    className="block p-2 hover:bg-accent rounded-md"
                  >
                    <div className="font-medium">Search</div>
                    <div className="text-muted-foreground">
                      Search for people.
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="/chat"
                    className="block p-2 hover:bg-accent rounded-md"
                  >
                    <div className="font-medium">Chat</div>
                    <div className="text-muted-foreground">
                      Interact one-on-one with everyone
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Profile</NavigationMenuTrigger>
          <NavigationMenuContent className="z-50 bg-white/90 text-black backdrop-blur-md rounded-md shadow-lg">
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/signup" className="flex-row items-center gap-2">
                    <CircleHelpIcon />
                    Sign Up
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/login" className="flex-row items-center gap-2">
                    <CircleIcon />
                    Log In
                  </Link>
                </NavigationMenuLink>
                
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
function ListItem({ title, children, href, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block p-2 hover:bg-accent rounded-md text-black"
        >
          <div className="text-sm font-medium leading-none text-black">
            {title}
          </div>
          <p className="text-sm leading-snug line-clamp-2 text-gray-700">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
