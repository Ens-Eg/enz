"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from "next-intl";

const HOME_WHATSAPP_URL = "https://wa.me/201500800050";

export default function HomeWhatsAppFab() {
  const t = useTranslations("personalProfile");

  return (
    <a
      href={HOME_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("contactWhatsApp")}
      className="fixed bottom-4 left-4 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
    >
      <FaWhatsapp className="size-8" aria-hidden />
    </a>
  );
}
