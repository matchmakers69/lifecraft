import { ExtendedUser } from "@/lib/auth";
import { CardDarkWrapper, CardTitle } from "@/shared/components/cards";
import { UpdateUserSettingsForm } from "./UpdateUserSettingsForm";

type SettingsDetailsProps = {
	user: ExtendedUser;
};

const SettingsDetails = ({ user }: SettingsDetailsProps) => {
	return (
		<CardDarkWrapper>
			<CardTitle text="Update password" className="text-[2.2rem]">
				Password
			</CardTitle>
			<UpdateUserSettingsForm user={user} />
		</CardDarkWrapper>
	);
};

export { SettingsDetails };
