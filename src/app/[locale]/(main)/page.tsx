import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildSeoMetadata } from "@/lib/seo";
import HeroContent from "@/components/HomePage/HeroContent";
import Features from "@/components/HomePage/FeatureSection";
import TemplateShow from "@/components/HomePage/TemplateShow";
import PhoneVideoSection from "@/components/HomePage/PhoneVideoSection";
import HowItWorks from "@/components/HomePage/HowItWorks";
import FAQ from "@/components/HomePage/FAQ";
import FooterSection from "@/components/HomePage/Footer";
import HomeWhatsAppFab from "@/components/HomePage/HomeWhatsAppFab";

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

  return (
    <>
      <HeroContent locale={locale} />
      <TemplateShow />
      <PhoneVideoSection />
      <Features />
      <HowItWorks />
      <FAQ />
      <FooterSection />
      <HomeWhatsAppFab />
    </>
  );
}

export default Page;
