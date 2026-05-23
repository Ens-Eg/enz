import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { buildSeoMetadata } from "@/lib/seo";
import { FaWhatsapp } from "react-icons/fa";
import HeroSection from "@/components/HomePage/HeroSection";
import DeferredMount from "@/components/Global/DeferredMount";

const Features = dynamic(() => import("@/components/HomePage/FeatureSection"), {
  loading: () => <SectionSkeleton height="520px" />,
});

const TemplateShow = dynamic(
  () => import("@/components/HomePage/TemplateShow"),
  {
    loading: () => <SectionSkeleton height="640px" />,
  },
);

const PhoneVideoSection = dynamic(
  () => import("@/components/HomePage/PhoneVideoSection"),
  {
    loading: () => <SectionSkeleton height="720px" />,
  },
);

const HowItWorks = dynamic(() => import("@/components/HomePage/HowItWorks"), {
  loading: () => <SectionSkeleton height="480px" />,
});

const FAQ = dynamic(() => import("@/components/HomePage/FAQ"), {
  loading: () => <SectionSkeleton height="420px" />,
});

const FooterSection = dynamic(() => import("@/components/HomePage/Footer"), {
  loading: () => <SectionSkeleton height="320px" />,
});

function SectionSkeleton({ height }: { height: string }) {
  return (
    <div
      aria-hidden
      className="w-full animate-pulse bg-slate-50 dark:bg-[#0d1117]"
      style={{ minHeight: height }}
    />
  );
}

const HOME_WHATSAPP_URL = "https://wa.me/201500800050";
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildSeoMetadata({
    locale,
    path: "",
    title: t("home.title"),
    description: t("home.description"),
    keywords: t("home.keywords"),
    coreKeywords: t("coreKeywords"),
    siteName: t("siteName"),
    robots: "index, follow",
  });
}

async function Page({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "personalProfile" });

  return (
    <>
      <HeroSection />

      <DeferredMount minHeight="640px">
        <TemplateShow />
      </DeferredMount>

      <DeferredMount minHeight="720px">
        <PhoneVideoSection />
      </DeferredMount>

      <DeferredMount minHeight="520px">
        <Features />
      </DeferredMount>

      <DeferredMount minHeight="480px">
        <HowItWorks />
      </DeferredMount>

      <DeferredMount minHeight="420px">
        <FAQ />
      </DeferredMount>

      <DeferredMount minHeight="320px">
        <FooterSection />
      </DeferredMount>

      <a
        href={HOME_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("contactWhatsApp")}
        className="fixed bottom-4 left-4 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      >
        <FaWhatsapp className="size-8" aria-hidden />
      </a>
    </>
  );
}

export default Page;
