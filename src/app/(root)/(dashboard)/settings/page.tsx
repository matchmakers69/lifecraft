import { PageTitle } from "@/components/ui";
import { t } from "@/shared/locales";

export default function SettingsPage() {
	return (
		<div>
			<PageTitle title={t.settings.title} />
		</div>
	);
}
