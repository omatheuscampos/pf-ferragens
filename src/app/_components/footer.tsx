import { usePageNavigationData } from "@/hooks/use-page-navigation-data";
import { Image } from "@/components/ui/image";
import { Mail, Map, Phone } from "lucide-react";
import { FC } from "react";
import { cn } from "@/lib/utils/tailwind-class-merge";
import { Link } from "@/components/ui/link";

interface ExternalLinkProps {
  href: string;
  icon: FC<React.SVGProps<SVGSVGElement>>; // Componente React de um ícone
  children?: string; // Texto opcional
  className?: string; // Classes adicionais opcionais
}

function ExternalLink({
  href,
  icon: Icon,
  children,
  className,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      className={cn(
        "flex gap-4 text-balance w-[300px] hover:underline hover:text-blue-400",
        className
      )}
    >
      <Icon className="w-6 h-6" />
      <p className="w-full">{children}</p>
    </a>
  );
}

export async function Footer() {
  const pageNavigationData = (await usePageNavigationData()).sort((a, b) => {
    return a.sections.length > b.sections.length ? -1 : 1;
  });

  return (
    <footer className="w-full flex flex-col px-4 pt-6 gap-6 md:px-16 md:pt-16 md:gap-14 bg-gray-100">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col">
          <div className="flex h-fit items-center gap-2">
            <Image src="/icon.png" alt="Pj" ratio={1} width={80} />
            <span className="text-4xl font-serif translate-y-[-2px]">
              Ferragens
            </span>
          </div>
          <div className="flex flex-col gap-4 border-y-2 py-4 my-6">
            <ExternalLink
              icon={Phone}
              href="https://api.whatsapp.com/send?phone=55313453-6384"
            >
              (31) 3453-6384
            </ExternalLink>
            <ExternalLink icon={Mail} href="mailto:pjferragens@gmail.com">
              pjferragens@gmail.com
            </ExternalLink>
            <ExternalLink
              icon={Map}
              href="https://www.google.com/maps/place/R.+do+Cercado,+128+-+Venda+Nova,+Belo+Horizonte+-+MG/data=!4m2!3m1!1s0xa68fe9a9b4ad33:0x97811d527fe3a879?sa=X&ved=2ahUKEwimysmDlPD9AhWJO7kGHe4uCW0Q8gF6BAgNEAI"
            >
              Rua do Cercado, 128, Venda Nova, Belo Horizonte, MG, CEP 31510-405
            </ExternalLink>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 md:gap-9 w-fit">
          {pageNavigationData.map((page) => (
            <div className="flex flex-col" key={page.pathname}>
              <Link href={page.pathname}>
                <span className="font-bold mb-2 block hover:underline hover:text-blue-400">
                  {page.title}
                </span>
              </Link>
              <ul className="flex flex-col">
                {page.sections.map((section, i) => (
                  <li className="py-1 max-w-60" key={section.pathname + i}>
                    <Link
                      href={section.pathname}
                      className="text-sm block text-balance hover:underline hover:text-blue-400 font-semibold text-gray-600"
                    >
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t-2 py-6 text-sm">
        <p>© 2025 Pj Ferragens, todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
