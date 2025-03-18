import Logo from "@/components/ui/Logo";
import ToasNotification from "@/components/ui/ToastNotification";
import Link from "next/link";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="lg:grid lg:grid-cols-2 lg:min-h-screen">
        <div className="flex justify-center lg:bg-[url(/grafico.svg)] lg:bg-[length:-30rem] bg-no-repeat bg-left-bottom bg-purple-950">
          <div className="w-96 py-10 lg:py-20">
            <Link href="/">
              <Logo />
            </Link>
          </div>
        </div>
        <div className="p-10 lg:py-28">
          <div className="max-w-3xl mx-auto">{children}</div>
        </div>
      </div>

      <ToasNotification />
    </>
  );
}
