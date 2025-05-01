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
					<h2 className="mb-5 text-[2.4rem]">{t.auth.login.content.title}</h2>
					<p className="text-text-grey">{t.auth.login.content.subtitle}</p>
				</div>
			</HeroAuthCol>
		</>
	);
}
