import { Link } from "@/components/ui/link";
import { SectionImage, LogoImage } from "./_components/home-image";
import { usePageNavigationData } from "@/hooks/use-page-navigation-data";
import { removeAccentsAndSpecialChars } from "@/lib/utils/remove-accents-and-special-chars";

export default async function Page() {
  const pages = await usePageNavigationData();
  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center gap-4 bg-primary p-6 md:p-16">
        <LogoImage />
        <h1 className="text-4xl md:text-7xl drop-shadow-lg text-white font-serif translate-y-[-2px]">
          Ferragens
        </h1>
      </div>
      <div className="md:mx-auto w-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 md:p-16 gap-4 justify-items-center">
        {pages.map((page) => (
          <Link href={page.pathname} key={page.pathname}>
            <div className="relative last-underline">
              <SectionImage
                alt={page.title}
                src={`/home/${removeAccentsAndSpecialChars(page.title)}.jpg`}
              />
              <h2 className="text-xl font-semibold w-full bg-gradient-to-b from-transparent to-black/50 p-4 absolute bottom-0 left-0 z-2 text-white">
                {page.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
