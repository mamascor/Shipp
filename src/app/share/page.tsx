import Image from "next/image";

export default function Share() {
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
          <h1 className="text-2xl md:text-5xl font-light">
            Online Dating Sucks.
          </h1>
          <h1 className="text-2xl md:text-5xl font-light">
            Meet someone IRL and get a drink
          </h1>
          
        </main>
      </div>
    </div>
  );
}
