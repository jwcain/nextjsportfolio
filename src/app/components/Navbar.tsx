"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

type NavItem = {
  href: string;
  label: string;
  contentPath?: string;
};

const navItems: NavItem[] = [
  { href: "/", label: "Experience", contentPath: "experience" },
  { href: "/projects", label: "Projects", contentPath: "project" },
  { href: "/recipes", label: "Recipes", contentPath: "recipe" },
];

function capitalizeWords(str: string) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Navbar() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const [highlightStyle, setHighlightStyle] = useState({
    left: 0,
    width: 0,
    top: 0,
    height: 0,
  });
  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0,
  });
  const [subLabel, setSubLabel] = useState<string | null>(null);

  const pathParts = pathname.split("/").filter(Boolean);
  const inSubpage = pathParts.length > 1;
  const parentPath = inSubpage ? "/" + pathParts[0] : null;

  const parentNavItem =
    navItems.find((item) => item.href === parentPath) ?? null;

  useEffect(() => {
    if (inSubpage && parentNavItem) {
      const fileName = pathParts[1] + ".json";
      fetch(`/content/${parentNavItem.contentPath}/${fileName}`)
        .then((res) => {
          if (!res.ok) throw new Error("Not found");
          return res.json();
        })
        .then((data) => {
          if (data.title && typeof data.title === "string") {
            setSubLabel(data.title);
          } else {
            setSubLabel(capitalizeWords(pathParts[1].replace(/-/g, " ")));
          }
        })
        .catch(() =>
          setSubLabel(capitalizeWords(pathParts[1].replace(/-/g, " "))),
        );
    } else {
      setSubLabel(null);
    }
  }, [pathname, parentNavItem]);

  const tabs: (NavItem & { isBreadcrumb?: boolean })[] = navItems.flatMap(
    (tab) => {
      const items: (NavItem & { isBreadcrumb?: boolean })[] = [tab];
      if (inSubpage && tab.href === parentPath && parentNavItem && subLabel) {
        items.push({ href: pathname, label: subLabel, isBreadcrumb: true });
      }
      return items;
    },
  );

  const activeIndex = tabs.reduce((lastIndex, tab, idx) => {
    if (tab.isBreadcrumb && tab.href === pathname) return idx;
    if (
      !tab.isBreadcrumb &&
      (pathname === tab.href || pathname.startsWith(tab.href))
    )
      return idx;
    return lastIndex;
  }, 0);

  // Update pill position and container size
  useEffect(() => {
    const measure = () => {
      if (!innerRef.current) return;

      const tabElements = Array.from(
        containerRef.current?.querySelectorAll(".tab") ?? [],
      ) as HTMLElement[];
      const currentTab = tabElements[activeIndex];
      if (!currentTab) return;

      const { offsetLeft, offsetWidth, offsetTop, offsetHeight } = currentTab;
      setHighlightStyle({
        left: offsetLeft,
        width: offsetWidth,
        top: offsetTop,
        height: offsetHeight,
      });

      // Measure the natural size of the inner content
      const { offsetWidth: contentWidth, offsetHeight: contentHeight } =
        innerRef.current;

      // Add padding (p-2 = 0.5rem = 8px on each side = 16px total)
      setContainerSize({
        width: contentWidth + 16,
        height: contentHeight + 16,
      });
    };

    // Measure immediately
    measure();

    // Also measure after a brief delay to catch any font loading
    const timer = setTimeout(measure, 100);

    return () => clearTimeout(timer);
  }, [activeIndex, tabs.length, pathname, subLabel]);

  return (
    <nav className="relative flex justify-center">
      <div
        className="p-2 bg-black/10 rounded-4xl shadow-inner shadow-black/30 overflow-hidden transition-all duration-300"
        style={{
          width: containerSize.width,
          height: containerSize.height,
        }}
      >
        <div ref={containerRef} className="relative">
          <div
            ref={innerRef}
            className="flex flex-col sm:flex-row gap-4 relative whitespace-nowrap w-fit"
          >
            {/* Pill highlight */}
            <span
              className="absolute bg-[var(--accent-dark)] rounded-full
                shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3),0_2px_4px_rgba(255,255,255,0.05)]"
              style={{
                left: highlightStyle.left - 4,
                width: highlightStyle.width + 8,
                top: highlightStyle.top - 2,
                height: highlightStyle.height + 4,
                transition: "all 0.3s ease",
              }}
            />

            {/* Render tabs */}
            {tabs.map(({ href, label, isBreadcrumb }, index) => {
              const isActive = index === activeIndex;
              const baseClasses =
                "tab relative z-10 px-4 py-2 transition-colors";

              if (isBreadcrumb) {
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`${baseClasses} text-[var(--white)] font-semibold flex items-center`}
                  >
                    <span className="text-[var(--accent-light)] select-none mr-1">
                      /
                    </span>
                    {label}
                  </Link>
                );
              }

              return (
                <Link
                  key={href}
                  href={href}
                  className={`${baseClasses} ${
                    isActive
                      ? "text-[var(--white)]"
                      : "text-[var(--white)] hover:text-[var(--accent-light)]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
