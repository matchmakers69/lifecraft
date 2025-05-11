"use client";

import { useClientReady } from "@/shared/hooks";
import toast from "react-hot-toast";
import { Loader, Loader2 } from "lucide-react";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ExtendedUser } from "@/lib/auth";
import { Button, Checkbox, MUIFormHelperText, MUITextField } from "@/shared/components/ui";
import { UpdateUserSettingsValues } from "@/domains/user/validationSchemas/updateUserSettingsSchema";
import { updateUserSettings } from "@/app/(root)/(features)/dashboard/settings/_actions";

type UpdateUserSettingsFormProps = {
	user: ExtendedUser;
};

export const UpdateUserSettingsForm = ({ user }: UpdateUserSettingsFormProps) => {
	const { clientReady } = useClientReady();
	const formRef = useRef<HTMLFormElement>(null);
	const [enablePasswordUpdate, setEnablePasswordsUpdate] = useState(false);
	const [state, formAction, isPending] = useActionState(updateUserSettings, {
		errors: {},
		success: "",
	});
	const { control, handleSubmit, reset } = useForm<UpdateUserSettingsValues>({
		mode: "onTouched",
		defaultValues: {
			password: "",
			newPassword: "",
		},
	});

	useEffect(() => {
		if (state?.success) {
			toast.success(state.success);
			reset({
				password: "",
				newPassword: "",
			});
		}
	}, [reset, state, user]);

	const handleUpdateUserDetails = () => {
		const formData = new FormData(formRef.current!);
		if (!enablePasswordUpdate) {
			formData.delete("password");
			formData.delete("newPassword");
		}

		startTransition(() => formAction(formData));
	};
	if (!clientReady) {
		return <Loader2 size={30} className="mx-auto my-10 animate-spin" />;
	}
	return (
		<form
			ref={formRef}
			className="flex w-full flex-col flex-wrap"
			autoComplete="off"
			noValidate
			action={formAction}
			onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
				event.preventDefault();
				handleSubmit(handleUpdateUserDetails)(event);
			}}
		>
			{!user.is0Auth && (
				<>
					<div className="mb-12">
						<Checkbox
							label="I want to update my password"
							defaultChecked={enablePasswordUpdate}
							onChange={() => setEnablePasswordsUpdate(!enablePasswordUpdate)}
							id="display-passwords"
							strokeColor="white"
							className="border-border-input-light checked:bg-[hsla(0,0%,100%,0.09)]"
						/>
					</div>
					<div className="mb-12">
						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<MUITextField
									{...field}
									id="password"
									placeholder="********"
									label="Old password"
									variant="outlined"
									error={!!state?.errors?.password}
									fullWidth
									margin="none"
									type="password"
									disabled={!enablePasswordUpdate}
								/>
							)}
						/>
						{state?.errors?.password && (
							<MUIFormHelperText>{state.errors.password.join(", ")}</MUIFormHelperText>
						)}
					</div>
					<div className="mb-12">
						<Controller
							name="newPassword"
							control={control}
							render={({ field }) => (
								<MUITextField
									{...field}
									id="newPassword"
									placeholder="********"
									label="New password"
									variant="outlined"
									error={!!state?.errors?.newPassword}
									fullWidth
									margin="none"
									type="password"
									disabled={!enablePasswordUpdate}
								/>
							)}
						/>
						{state?.errors?.newPassword && (
							<MUIFormHelperText>{state.errors.newPassword.join(", ")}</MUIFormHelperText>
						)}
					</div>
				</>
			)}
			<div>
				<Button type="submit" variant="default" size="sm" disabled={isPending || !enablePasswordUpdate}>
					{isPending && <Loader className="size-6 animate-spin" />}
					<span className="inline-block">{isPending ? "Updating now..." : "Update password"}</span>
				</Button>
			</div>
		</form>
	);
};
