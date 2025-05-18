"use client";

import { Controller, useFormContext } from "react-hook-form";
import { ExtendedUser } from "@/lib/auth";
import { MUIFormHelperText, MUITextField } from "@/shared/components/ui";
import { UpdateUserSettingsFormState } from "../types";

type PersonalDetailsProps = {
	user: ExtendedUser;
	state: UpdateUserSettingsFormState;
};

export const PersonalDetails = ({ user, state }: PersonalDetailsProps) => {
	const { control } = useFormContext();

	return (
		<>
			<div className="mb-12">
				<Controller
					name="name"
					control={control}
					render={({ field }) => (
						<MUITextField
							{...field}
							id="name"
							placeholder="Enter your name"
							label="Name"
							variant="outlined"
							error={!!state?.errors?.name}
							fullWidth
							margin="none"
						/>
					)}
				/>

				{state?.errors?.name && <MUIFormHelperText>{state.errors.name.join(", ")}</MUIFormHelperText>}
			</div>

			{!user.is0Auth && (
				<>
					<div className="mb-12">
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<MUITextField
									{...field}
									id="email"
									placeholder="Enter your email"
									label="Email"
									variant="outlined"
									error={!!state?.errors?.email}
									fullWidth
									margin="none"
									type="email"
								/>
							)}
						/>
						{state?.errors?.email && <MUIFormHelperText>{state.errors.email.join(", ")}</MUIFormHelperText>}
					</div>
				</>
			)}
		</>
	);
};
