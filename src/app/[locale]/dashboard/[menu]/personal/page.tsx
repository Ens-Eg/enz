"use client";

import { useAppSelector } from "@/store/hooks";
import PersonalProfile from "@/components/Dashboard/PersonalProfile";
import { useTranslations } from "next-intl";

export default function PersonalProfilePage() {
    const menuId = useAppSelector((state) => state.menuData.menu?.id);
    const t = useTranslations("personalProfile");

    return (
        <PersonalProfile
            backLink={`/dashboard/${menuId ?? ""}/settings`}
            backLinkText={t("backToProfile")}
        />
    );
}
