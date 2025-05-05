import { PageTitle } from "@/components/ui";
import { Verification } from "@/domains/authentication/components";
import { HeroAuthCol, LeftAuthCol } from "@/domains/authentication/components/ui";
import { t } from "@/shared/locales";

export default function VerificationPage() {
	return (
		<>
			<LeftAuthCol>
				<PageTitle
					className="mb-12"
					title={t.auth.verification.title}
					subtitle={t.auth.verification.subtitle}
				/>

				<Verification />
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
