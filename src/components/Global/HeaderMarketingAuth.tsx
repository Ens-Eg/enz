"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type HeaderMarketingAuthProps = {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

export default function HeaderMarketingAuth({
  variant = "desktop",
  onNavigate,
}: HeaderMarketingAuthProps) {
  const tHeader = useTranslations("Landing.header");
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    setHasSession(Boolean(Cookies.get("sub")));
  }, []);

  if (variant === "mobile") {
    if (hasSession) {
      return (
        <div className="flex flex-col gap-3 pt-4">
          <Link
            href="/dashboard"
            prefetch={false}
            onClick={onNavigate}
            className="block w-full rounded-2xl bg-linear-to-r from-purple-600 to-purple-700 py-4 text-base font-bold text-white dark:from-purple-500 dark:to-purple-600"
          >
            {tHeader("signIn")}
          </Link>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3 pt-4">
        <Link
          href="/auth/login"
          prefetch={false}
          onClick={onNavigate}
          className="block w-full rounded-2xl border-2 border-purple-600 py-3 text-base font-bold text-purple-600 dark:border-purple-500 dark:text-purple-400"
        >
          {tHeader("signIn")}
        </Link>
        <Link
          href="/auth/register"
          prefetch={false}
          onClick={onNavigate}
          className="block w-full rounded-2xl bg-linear-to-r from-purple-600 to-purple-700 py-4 text-base font-bold text-white dark:from-purple-500 dark:to-purple-600"
        >
          {tHeader("startNow")}
        </Link>
      </div>
    );
  }

  if (hasSession) {
    return (
      <Link
        href="/dashboard"
        prefetch={false}
        className="hidden rounded-full bg-linear-to-r from-purple-600 to-purple-700 px-7 py-2.5 text-[14px] font-bold text-white shadow-lg shadow-purple-200 lg:block dark:from-purple-500 dark:to-purple-600 dark:shadow-purple-900/50"
      >
        {tHeader("signIn")}
      </Link>
    );
  }

  return (
    <>
      <Link
        href="/auth/login"
        prefetch={false}
        className="hidden rounded-full px-5 py-2 text-[14px] font-bold text-purple-600 hover:bg-purple-50 lg:block dark:text-purple-400 dark:hover:bg-purple-500/20"
      >
        {tHeader("signIn")}
      </Link>
      <div className="hidden lg:block">
        <Link
          href="/auth/register"
          prefetch={false}
          className="rounded-full bg-linear-to-r from-purple-600 to-purple-700 px-7 py-2.5 text-[14px] font-bold text-white shadow-lg shadow-purple-200 dark:from-purple-500 dark:to-purple-600 dark:shadow-purple-900/50"
        >
          {tHeader("startNow")}
        </Link>
      </div>
    </>
  );
}
