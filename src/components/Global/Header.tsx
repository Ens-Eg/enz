"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "../Global/Logo";
import { homeLinks } from "@/modules/Header";
import LanguageToggle from "./LanguageTogle";
import DarkModeToggle from "./DarkModeToggle";
import HeaderMarketingAuth from "./HeaderMarketingAuth";

function isHomePathname(pathname: string) {
  const p = pathname.replace(/\/$/, "") || "/";
  return p === "/" || p === "/en" || p === "/ar";
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon: React.FC<{ size?: number; className?: string }>;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  icon: Icon,
  onClick,
}) => (
  <Link
    href={href}
    prefetch={false}
    onClick={onClick}
    className="relative group text-slate-600 dark:text-slate-300 text-[14px] font-bold transition-colors duration-300 py-1 flex items-center gap-1.5 cursor-pointer"
  >
    <Icon
      size={16}
      className="text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
    />
    <span className="group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
      {children}
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full rounded-full shadow-[0_0_8px_rgba(124,58,237,0.5)]" />
  </Link>
);

function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("");

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setIsOpen(false);

  const scrollToHash = (hash: string) => {
    const element = document.querySelector(hash);
    if (element) {
      const navbarHeight = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: "smooth",
      });
    }
  };

  const handleInPageNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    handleNavClick();
    if (!href.startsWith("/#")) return;
    if (!isHomePathname(pathname)) return;
    e.preventDefault();
    scrollToHash(href.slice(1));
  };

  const navLinks = homeLinks.map((link) => ({
    name: t(link.title),
    href: link.href,
    icon: link.icon,
  }));

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "border-b border-purple-100 bg-white/70 py-3 shadow-sm backdrop-blur-xl dark:border-purple-900 dark:bg-[#0d1117]/70"
          : "border-transparent bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link
          href="/"
          prefetch={false}
          onClick={handleNavClick}
          className="flex shrink-0 items-center gap-2 text-xl font-semibold text-slate-900 dark:text-white"
        >
          <Logo />
        </Link>

        <div className="hidden items-center gap-10 lg:flex lg:gap-5 xl:gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              href={link.href}
              icon={link.icon}
              onClick={(e) => handleInPageNav(e, link.href)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="ms-auto flex items-center gap-1 lg:ms-0 lg:gap-2 xl:gap-4">
          <LanguageToggle locale={locale} pathname={pathname} />
          <DarkModeToggle />
          <HeaderMarketingAuth />
        </div>

        <button
          type="button"
          className="flex shrink-0 items-center justify-center p-2 text-slate-900 lg:hidden dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 left-0 flex flex-col gap-3 border-t border-purple-50 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-xl lg:hidden dark:border-purple-900 dark:bg-[#0d1117]/90">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              prefetch={false}
              onClick={(e) => handleInPageNav(e, link.href)}
              className="flex cursor-pointer items-center justify-center gap-4 py-4 text-lg font-bold text-slate-800 hover:text-purple-600 dark:text-slate-200 dark:hover:text-purple-400"
            >
              <link.icon size={22} className="text-purple-500" />
              {link.name}
            </Link>
          ))}

          <HeaderMarketingAuth variant="mobile" onNavigate={handleNavClick} />
        </div>
      )}
    </nav>
  );
}

export default Header;
