"use client";

import { updateUserDetails } from "@/app/(root)/(features)/dashboard/account/_actions";
import { useClientReady } from "@/shared/hooks";
import toast from "react-hot-toast";
import { Loader, Loader2 } from "lucide-react";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { UpdateUserDetailsValues } from "../validationSchemas";
import { Controller, useForm } from "react-hook-form";
import { ExtendedUser } from "@/lib/auth";
import { Button, MUIFormHelperText, MUITextField } from "@/shared/components/ui";

type UpdateUserDetailsFormProps = {
	user: ExtendedUser;
};

export const UpdateUserDetailsForm = ({ user }: UpdateUserDetailsFormProps) => {
	const { clientReady } = useClientReady();
	const formRef = useRef<HTMLFormElement>(null);
	const [state, formAction, isPending] = useActionState(updateUserDetails, {
		errors: {},
		success: "",
	});
	const { control, handleSubmit, reset } = useForm<UpdateUserDetailsValues>({
		mode: "onTouched",
		defaultValues: {
			name: "",
			email: "",
		},
	});
	useEffect(() => {
		reset({
			name: user?.name || "",
			email: user?.email || "",
		});
	}, [user, reset]);

	useEffect(() => {
		if (state?.success) {
			toast.success(state.success);
			reset({
				name: state.updatedUser?.name || user.name || undefined,
				email: state.updatedUser?.email || user.email || undefined,
			});
		}
	}, [reset, state, user]);

	const handleUpdateUserDetails = () => {
		const formData = new FormData(formRef.current!);
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
			<div>
				<Button type="submit" variant="default" size="sm" disabled={isPending}>
					{isPending && <Loader className="size-6 animate-spin" />}
					<span className="inline-block">{isPending ? "Updating now..." : "Update user details"}</span>
				</Button>
			</div>
		</form>
	);
};
