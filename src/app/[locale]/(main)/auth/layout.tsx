import GoogleAuthProvider from "@/components/Global/GoogleAuthProvider";
import ReduxProvider from "@/components/Global/ReduxProvider";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <GoogleAuthProvider>{children}</GoogleAuthProvider>
    </ReduxProvider>
  );
}
