"use client";

import { FormEvent, startTransition, useActionState, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import toast from "react-hot-toast";
import { useClientReady } from "@/shared/hooks";
import { Loader2 } from "lucide-react";
import { RegisterFormValues } from "../validationSchemas";
import Stack from "@mui/material/Stack";
import { Button, FormError, FormSuccess, MUIFormHelperText, MUITextField } from "@/shared/components/ui";
import { signUpUser } from "@/app/(root)/(authentication)/auth/_actions/signUp";

const SignUpForm = () => {
	const { clientReady } = useClientReady();
	const formRef = useRef<HTMLFormElement>(null);
	const [state, formAction, isPending] = useActionState(signUpUser, {
		errors: {},
		success: "",
	});
	const {
		control,
		handleSubmit,
		reset,
		formState: { isDirty },
	} = useForm<RegisterFormValues>({
		mode: "onTouched",
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const handleRegisterUserSubmit = () => {
		const formData = new FormData(formRef.current!);
		startTransition(() => {
			formAction(formData);
		});
	};

	useEffect(() => {
		if (state.success) {
			toast.success(state.success);
			reset();
		}
		if (state.errors?._form?.length) {
			toast.error(state.errors._form.join(", "));
			reset();
		}
	}, [state, reset]);

	if (!clientReady) {
		return <Loader2 size={30} className="mx-auto my-10 animate-spin" />;
	}
	return (
		<>
			<form
				className="w-full"
				action={formAction}
				ref={formRef}
				autoComplete="off"
				noValidate
				onSubmit={(e: FormEvent<HTMLFormElement>) => {
					e.preventDefault();
					handleSubmit(handleRegisterUserSubmit)(e);
				}}
			>
				<Stack
					sx={{
						marginBottom: "30px",
					}}
					gap={1}
				>
					<div className="register-form-input-wrapper">
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
									fullWidth
									margin="normal"
									error={!!state?.errors?.name}
								/>
							)}
						/>
						{state?.errors?.name && <MUIFormHelperText>{state.errors.name.join(", ")}</MUIFormHelperText>}
					</div>
					<div className="register-form-input-wrapper">
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<MUITextField
									{...field}
									type="email"
									id="email"
									placeholder="Enter your email"
									label="Email"
									variant="outlined"
									fullWidth
									margin="normal"
									error={!!state?.errors?.email}
								/>
							)}
						/>
						{state?.errors?.email && <MUIFormHelperText>{state.errors.email.join(", ")}</MUIFormHelperText>}
					</div>
					<div className="register-form-input-wrapper">
						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<MUITextField
									{...field}
									type="password"
									id="password"
									placeholder="******************"
									label="Password"
									variant="outlined"
									fullWidth
									error={!!state?.errors?.password}
									margin="normal"
								/>
							)}
						/>
						{state?.errors?.password && (
							<MUIFormHelperText>{state.errors.password.join(", ")}</MUIFormHelperText>
						)}
					</div>
				</Stack>
				<div className="mb-3">
					<FormError message={state.errors?._form?.join(", ") ?? ""} />
					<FormSuccess message={state.success ?? ""} />
				</div>
				<Button type="submit" variant="default" size="full" disabled={isPending || !isDirty}>
					Sign up
				</Button>
			</form>
			<div className="mt-[16px] flex w-full items-center gap-[8px]">
				<p className="text-[12px] text-text-grey">Have an account?</p>
				<Button className="flex-start min-w-[auto] px-0 underline" asChild variant="link" size="sm">
					<Link href="/auth/login">Sign in</Link>
				</Button>
			</div>
		</>
	);
};

export { SignUpForm };
