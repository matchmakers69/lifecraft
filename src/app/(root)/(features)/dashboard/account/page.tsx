import { PageTitle } from "@/components/ui";
import { CardDarkWrapper, CardTitle } from "@/shared/components/cards";
import Image from "next/image";
import { Metadata } from "next";
import { currentUser } from "@/lib/getCurrentUser";
import { t } from "@/shared/locales";
import { AvatarForm, UserDetailsForm } from "@/domains/user/components";
import { GRAVATAR_URL } from "@/constants";

export const metadata: Metadata = {
	title: "Account | Lifecraft",
	description:
		"Manage your profile settings, update personal information, change preferences, and enhance security. Customize your experience effortlessly.",
};

export default async function AccountPage() {
	const user = await currentUser();

	return (
		<>
			<PageTitle className="mb-16" title={t.account.title} />
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
				<CardDarkWrapper>
					<CardTitle className="text-[2.2rem]">Profile</CardTitle>
					<UserDetailsForm user={user} />
				</CardDarkWrapper>
				<CardDarkWrapper>
					<CardTitle className="text-[2.2rem]">Personal Details</CardTitle>
					<div className="personal-details-wrapper mb-26 flex flex-col w-full justify-center items-center">
						<div className="relative m-auto rounded-full overflow-hidden w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56">
							<Image
								className="object-cover"
								src={user.image || GRAVATAR_URL}
								alt={user.name || "user profile picture"}
								priority={true}
								fill={true}
							/>
						</div>
						<div className="details-list mt-6">
							<ul className="flex flex-col justify-center items-center">
								<li>
									<p className="text-md font-semibold">{user.name}</p>
								</li>
								<li>
									<p className="text-md font-semibold">{user.email}</p>
								</li>
							</ul>
						</div>
					</div>
					<AvatarForm user={user} />
				</CardDarkWrapper>
			</div>
		</>
	);
}
