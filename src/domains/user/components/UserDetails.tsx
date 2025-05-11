import { ExtendedUser } from "@/lib/auth";
import { CardDarkWrapper, CardTitle } from "@/shared/components/cards";
import { UpdateUserDetailsForm } from "./UpdateUserDetailsForm";

type UserDetailsProps = {
	user: ExtendedUser;
};

const UserDetails = ({ user }: UserDetailsProps) => {
	return (
		<CardDarkWrapper>
			<CardTitle className="text-[2.2rem]">Profile</CardTitle>
			<UpdateUserDetailsForm user={user} />
		</CardDarkWrapper>
	);
};

export { UserDetails };
