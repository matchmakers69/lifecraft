"use client";

import { ExtendedUser } from "@/lib/auth";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserDetailsSchema, UpdateUserDetailsValues } from "../validationSchemas";
import { updateUserDetails } from "@/app/(root)/(features)/dashboard/account/_actions";
import { useClientReady } from "@/shared/hooks";
import { useRef, useActionState, useEffect, startTransition } from "react";
import { Loader, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/shared/components/ui";
import { PersonalDetails } from "./PersonalDetails";

type UserDetailsFormProps = {
	user: ExtendedUser;
};

export const UserDetailsForm = ({ user }: UserDetailsFormProps) => {
	const { clientReady } = useClientReady();
	const formRef = useRef<HTMLFormElement>(null);
	const [state, formAction, isPending] = useActionState(updateUserDetails, {
		errors: {},
		success: "",
	});
	const methods = useForm<UpdateUserDetailsValues>({
		mode: "onTouched",
		resolver: zodResolver(updateUserDetailsSchema),
		defaultValues: {
			name: "",
			email: "",
		},
	});

	const { handleSubmit, reset } = methods;

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
		<FormProvider {...methods}>
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
				<PersonalDetails state={state} user={user} />
				<div>
					<Button type="submit" variant="default" size="sm" disabled={isPending}>
						{isPending && <Loader className="size-6 animate-spin" />}
						<span className="inline-block">{isPending ? "Updating now..." : "Update user settings"}</span>
					</Button>
				</div>
			</form>
		</FormProvider>
	);
};
