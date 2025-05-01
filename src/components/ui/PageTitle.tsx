import { ReadOnly } from "@/shared/types";
import { StarsIcon } from "../svg";
import { cn } from "@/utils";

type Props = {
	title: string;
	subtitle: string;
	slogan: string;
	className: string;
};

type PropsWithoutTitle = Omit<Props, "title">;
type PropsWithTitle = Pick<Props, "title">;
type OptionalProps = Partial<PropsWithoutTitle>;
type PageTitleProps = PropsWithTitle & OptionalProps;
type PageTitlePropsReadOnly = ReadOnly<PageTitleProps>;

const PageTitle = ({ title, subtitle, slogan, className }: PageTitlePropsReadOnly) => {
	return (
		<header className={cn("flex w-full flex-col", className)}>
			<div className={`${slogan || subtitle ? "mb-4" : "mb-0"} flex items-center gap-2`}>
				<StarsIcon />
				<h1 className="page-main-title">{title}</h1>
			</div>
			{slogan && <p className="slogan-text">{slogan}</p>}
			{subtitle && <p className="md:text-md-xl text-sm font-normal text-text-grey">{subtitle}</p>}
		</header>
	);
};

export { PageTitle };
