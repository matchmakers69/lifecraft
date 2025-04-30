import { PageTitle } from "@/components/ui";
import { HeroAuthCol, LeftAuthCol } from "@/domains/authentication/components/ui";
import { t } from "@/shared/locales";

export default function LoginPage() {
	return (
		<>
			<LeftAuthCol>
				<PageTitle
					className="mb-12"
					title={t.auth.login.title}
					slogan={t.auth.login.slogan}
					subtitle={t.auth.login.subtitle}
				/>
			</LeftAuthCol>
			<HeroAuthCol>
				<div className="width-[480px] flex flex-col flex-wrap gap-[15px]">
					<h2 className="mb-5 text-[2.4rem]">Start your experience with Lifecraft and change your life!</h2>
					<p className="text-text-grey">
						You are one step away from permanently changing the way of your life.
					</p>
				</div>
			</HeroAuthCol>
		</>
	);
}
