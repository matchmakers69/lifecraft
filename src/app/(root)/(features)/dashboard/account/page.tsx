import { PageTitle } from "@/components/ui";
import { Metadata } from "next";
import { currentUser } from "@/lib/getCurrentUser";
import { t } from "@/shared/locales";
import { UserDetails } from "@/domains/user/components";

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
			<div className="grid-row-2">
				<UserDetails user={user} />
			</div>
		</>
	);
}
