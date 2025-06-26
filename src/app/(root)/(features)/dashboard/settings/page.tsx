import { PageTitle } from "@/components/ui";
import { Metadata } from "next";
import { t } from "@/shared/locales";
import { currentUser } from "@/lib/getCurrentUser";
import { SettingsCurrencyPicker, SettingsDetails } from "@/domains/settings/components";

export const metadata: Metadata = {
	title: "Settings | Lifecraft",
	description:
		"Configure your Lifecraft experience, manage preferences, notifications, and security settings in one place.",
};

export default async function SettingsPage() {
	const user = await currentUser();

	return (
		<>
			<PageTitle className="mb-16" title={t.settings.title} />
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
				<SettingsDetails user={user} />
				<SettingsCurrencyPicker />
			</div>
		</>
	);
}
