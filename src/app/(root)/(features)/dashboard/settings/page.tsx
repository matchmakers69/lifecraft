import { PageTitle } from "@/components/ui";
import { Metadata } from "next";
import { t } from "@/shared/locales";

export const metadata: Metadata = {
	title: "Account Settings | Lifecraft",
	description:
		"Manage your account settings, update personal information, change preferences, and enhance security. Customize your experience effortlessly.",
};

export default function SettingsPage() {
	return (
		<div>
			<PageTitle className="mb-16" title={t.settings.title} />
		</div>
	);
}
