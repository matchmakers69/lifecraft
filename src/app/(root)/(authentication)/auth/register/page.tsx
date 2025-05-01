import { PageTitle } from "@/components/ui";
import { GoogleAuthButton, HeroAuthCol, LeftAuthCol } from "@/domains/authentication/components/ui";
import { t } from "@/shared/locales";

export default function RegisterPage() {
	return (
		<>
			<LeftAuthCol>
				<PageTitle className="mb-12" title={t.auth.register.title} subtitle={t.auth.register.subtitle} />
				<div className="mb-4 w-full">
					<p className="mb-4 text-base font-normal text-text-light">
						{t.auth.register.content.signUpWithOneClick}
					</p>
					<div className="flex w-full flex-col gap-[15px]">
						<div className="flex w-full flex-wrap items-center justify-between gap-[15px] sm:flex-nowrap">
							<div className="w-full max-w-[100%] xl:max-w-md">
								<GoogleAuthButton text={t.auth.register.content.googleButtonSignUpText} />
							</div>
						</div>
					</div>
				</div>
				<div className="relative w-full">
					<div aria-hidden="true" className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-[rgb(175,175,175)]" />
					</div>
					<div className="relative flex justify-center">
						<p className="bg-[rgb(20,20,20)] px-3 text-base text-text-grey dark:bg-neutral-900">
							{t.auth.register.content.provideRegistrationDetailsText}
						</p>
					</div>
				</div>
				{/* Sign up form */}
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
