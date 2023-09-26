"use client";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-screen max-h-screen overflow-hidden">
      <Image
        src="/web.png"
        layout="fill"
        objectFit="cover"
        alt={"Two girls playing guitar"}
        className="hidden md:block"
      />

      <Image
        src="/mobile.png"
        layout="fill"
        objectFit="cover"
        alt={"Two girls playing guitar"}
        className="block md:hidden"
      />
      <div className="absolute h-screen  w-full text-center">
        <header className="flex justify-center bg-transparent">
          <h1 className="text-xl">
            S<span className="text-[#30d5c8]">hi</span>pp
          </h1>

        </header>

        <main className="space-y-3 flex-col flex justify-center items-center h-full">
          <div className="bg-white p-12 text-black space-y-12 flex-col flex justify-center items-center">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
