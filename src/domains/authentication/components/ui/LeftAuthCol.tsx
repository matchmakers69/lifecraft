import { BaseProps } from "@/shared/types";

const LeftAuthCol = ({ children }: BaseProps) => {
	return (
		<div className="col-auth-left relative flex min-h-[100vh] w-[100%] flex-col items-center justify-center scroll-touch lg:w-[50%]">
			<div className="flex w-full max-w-[480px] flex-col items-center justify-center px-[1.5rem] py-[4rem] md:max-w-[500px]">
				{children}
			</div>
		</div>
	);
};

export { LeftAuthCol };
