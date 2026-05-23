"use client";

import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  FiArrowLeft as ArrowLeft,
  FiArrowRight as ArrowRight,
} from "react-icons/fi";
import Background from "../Global/Background";
import { useInViewMount } from "@/hooks/useInViewMount";

const HeroInteractivePhone = dynamic(
  () => import("@/components/HomePage/HeroInteractivePhone"),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto w-full max-w-[340px] animate-pulse rounded-[50px] bg-slate-100"
        style={{ height: "560px" }}
        aria-hidden
      />
    ),
  },
);

const HeroSection = () => {
  const t = useTranslations("heroSection");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const { ref: phoneRef, mounted: showPhone } = useInViewMount("120px");

  return (
    <section
      id="hero"
      className="relative flex min-h-0 items-center overflow-hidden bg-white pt-28 pb-16 lg:min-h-[92vh] lg:pt-30 lg:pb-24 dark:bg-[#0d1117]"
    >
      <Background />
      <div className="container relative z-10 mx-auto px-6">
        <div
          className={`flex flex-col items-center gap-10 lg:flex-row lg:gap-20 ${
            isRTL ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className="order-1 w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-5 py-2 text-sm font-bold text-purple-700 shadow-sm mb-6 dark:border-purple-500/30 dark:bg-purple-500/20 dark:text-purple-400">
              <span>{t("badge")}</span>
              <span>🚀</span>
            </div>

            <h1 className="mb-6 text-2xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
              {t("title1")}{" "}
              <span className="bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-400">
                {t("title2")}
              </span>
            </h1>

            <p className="mb-8 max-w-xl text-base leading-relaxed font-medium text-slate-600 sm:text-lg dark:text-slate-300">
              {t("description")}
            </p>

            <div className="mb-4 flex flex-wrap items-center gap-4">
              <Link
                href="/auth/login"
                prefetch={false}
                className="flex items-center gap-3 rounded-full bg-linear-to-r from-purple-600 to-purple-700 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-purple-300/40 transition-transform hover:scale-[1.02] dark:from-purple-500 dark:to-purple-600 dark:shadow-purple-900/50"
              >
                <span>{t("cta")}</span>
                <ArrowIcon size={22} />
              </Link>
            </div>
          </div>

          <div
            ref={phoneRef}
            className="order-2 flex w-full justify-center lg:w-1/2"
          >
            {showPhone ? (
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-purple-700 opacity-15 blur-[100px] dark:from-purple-500 dark:to-purple-600 dark:opacity-25" />
                <HeroInteractivePhone />
              </div>
            ) : (
              <div
                className="mx-auto w-full max-w-[340px] rounded-[50px] bg-slate-100"
                style={{ height: "560px" }}
                aria-hidden
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
