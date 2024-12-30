import { Image } from "./image";
import { Link } from "./link";

interface LinkToHomeProps {
  onClick?: () => void;
}

export function LinkToHome(props: LinkToHomeProps) {
  return (
    <Link href="/" onClick={props.onClick}>
      <div className="flex items-center gap-1 px-4 cursor-pointer">
        <Image alt="pj" src="/icon.png" ratio={1} width={36} />
        <span className="text-lg font-serif">Ferragens</span>
      </div>
    </Link>
  );
}
