"use client";

import ReduxProvider from "@/components/Global/ReduxProvider";
import Layout from "@/components/Dashboard/Layout";
import { AuthUserHydrate } from "@/components/Dashboard/AuthUserHydrate";
import { FcmTokenSync } from "@/components/Dashboard/FcmTokenSync";
import { type ReactNode } from "react";

interface ParentLayoutProps {
  children: ReactNode;
}

export default function ParentLayout({ children }: ParentLayoutProps) {
  return (
    <ReduxProvider>
      <AuthUserHydrate />
      <FcmTokenSync />
      <Layout segment={null} isAdmin={true}>
        {children}
      </Layout>
    </ReduxProvider>
  );
}
