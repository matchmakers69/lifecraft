import { Size } from "@/shared/types";
import Image from "next/image";

type Props = Size<unknown>;
type LogoProps = {
	readonly [P in keyof Props]?: number;
};

const Logo = ({ width = 60, height = 30 }: LogoProps) => {
	return (
		<figure className="relative block">
			<Image
				src="/icons/logo.svg"
				alt="logo"
				className="cursor-pointer"
				quality={100}
				priority
				width={width}
				height={height}
				sizes={`(max-width: ${width}px) 100vw, ${width}px`}
				style={{
					objectFit: "contain",
					width: `${width}px`,
					height: `${height}px`,
				}}
			/>
		</figure>
	);
};

export { Logo };
