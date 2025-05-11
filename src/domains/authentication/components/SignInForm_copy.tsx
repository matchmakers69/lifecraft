// "use client";

// import { FormEvent, startTransition, useActionState, useEffect, useRef, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import Link from "next/link";
// import toast from "react-hot-toast";
// import { useClientReady } from "@/shared/hooks";
// import { Loader2 } from "lucide-react";
// import { LoginFormValues } from "../validationSchemas";
// import Stack from "@mui/material/Stack";
// import { Button, FormError, FormSuccess, MUIFormHelperText, MUITextField } from "@/shared/components/ui";
// import { useSearchParams, useRouter } from "next/navigation";
// import { signInUser } from "@/app/(root)/(authentication)/auth/_actions";
// import { paths } from "@/constants";
// import { t } from "@/shared/locales";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
// import { useSessionWithUpdate } from "../hooks";

// const SignInForm = () => {
// 	const [showTwoFactor, setShowTwoFactor] = useState(false);
// 	const { update } = useSessionWithUpdate();
// 	const router = useRouter();
// 	const searchParams = useSearchParams();
// 	const urlError =
// 		searchParams.get("error") === "OAuthAccountNotLinked"
// 			? `Email already in use. Please login with form.`
// 			: "";
// 	const { clientReady } = useClientReady();
// 	const formRef = useRef<HTMLFormElement>(null);
// 	const [state, formAction, isPending] = useActionState(signInUser, {
// 		errors: {},
// 		success: "",
// 	});
// 	const {
// 		control,
// 		handleSubmit,
// 		reset,
// 		formState: { isDirty },
// 	} = useForm<LoginFormValues>({
// 		mode: "onTouched",
// 		defaultValues: {
// 			email: "",
// 			password: "",
// 			code: "",
// 		},
// 	});

// 	const handleLoginUserSubmit = () => {
// 		const formData = new FormData(formRef.current!);
// 		startTransition(() => {
// 			formAction(formData);
// 		});
// 	};

// 	useEffect(() => {
// 		if (state.success) {
// 			toast.success(state.success);
// 			reset();
// 		}

// 		if (state.twoFactor) {
// 			setShowTwoFactor(true);
// 		}

// 		if (state.errors?._form?.length) {
// 			toast.error(state.errors._form.join(", "));
// 			reset();
// 			setShowTwoFactor(false);
// 		}
// 	}, [state, reset]);

// 	useEffect(() => {
// 		if (state.success && !state.twoFactor) {
// 			// 1. Update session
// 			update().then(() => {
// 				// 2. Then refresh router and redirect
// 				router.refresh();
// 				router.push(state.callbackUrl || DEFAULT_LOGIN_REDIRECT);
// 			});
// 		}
// 	}, [state, router, update]);

// 	if (!clientReady) {
// 		return <Loader2 size={30} className="mx-auto my-10 animate-spin" />;
// 	}
// 	return (
// 		<>
// 			<form
// 				onSubmit={(e: FormEvent<HTMLFormElement>) => {
// 					e.preventDefault();
// 					handleSubmit(handleLoginUserSubmit)(e);
// 				}}
// 				className="w-full"
// 				action={formAction}
// 				ref={formRef}
// 				autoComplete="off"
// 				noValidate
// 			>
// 				{showTwoFactor && ( // BE AWARE: Currently no functinality to change 2FA from front end, possibly Admin panel needed - currentlu we toggle tru/false from database
// 					<div>
// 						<Controller
// 							name="code"
// 							control={control}
// 							render={({ field }) => (
// 								<MUITextField
// 									{...field}
// 									id="code"
// 									placeholder="i.e 123456"
// 									label="Verification Code"
// 									variant="outlined"
// 									error={!!state?.errors?.code}
// 									fullWidth
// 									disabled={isPending}
// 									margin="normal"
// 								/>
// 							)}
// 						/>
// 						{state?.errors?.code && <MUIFormHelperText>{state.errors.code.join(", ")}</MUIFormHelperText>}
// 					</div>
// 				)}
// 				{!showTwoFactor && (
// 					<Stack
// 						sx={{
// 							marginBottom: "30px",
// 						}}
// 						gap={1}
// 					>
// 						<div>
// 							<Controller
// 								name="email"
// 								control={control}
// 								render={({ field }) => (
// 									<MUITextField
// 										{...field}
// 										type="email"
// 										id="email"
// 										placeholder="Enter your email"
// 										label="Email"
// 										variant="outlined"
// 										error={!!state?.errors?.email}
// 										fullWidth
// 										margin="normal"
// 									/>
// 								)}
// 							/>
// 							{state?.errors?.email && <MUIFormHelperText>{state.errors.email.join(", ")}</MUIFormHelperText>}
// 						</div>
// 						<div>
// 							<Controller
// 								name="password"
// 								control={control}
// 								render={({ field }) => (
// 									<MUITextField
// 										{...field}
// 										type="password"
// 										id="password"
// 										placeholder="******************"
// 										label="Password"
// 										variant="outlined"
// 										error={!!state?.errors?.password}
// 										fullWidth
// 										margin="normal"
// 									/>
// 								)}
// 							/>
// 							{state?.errors?.password && (
// 								<MUIFormHelperText>{state.errors.password.join(", ")}</MUIFormHelperText>
// 							)}
// 						</div>
// 					</Stack>
// 				)}
// 				<div className="mb-8">
// 					<FormError message={state.errors?._form?.join(", ") || urlError} />
// 					<FormSuccess message={state.success ?? ""} />
// 				</div>
// 				<Button type="submit" variant="default" size="full" disabled={!isDirty || isPending}>
// 					{isPending
// 						? t.auth.login.processingText
// 						: showTwoFactor
// 							? t.auth.login.confirmText
// 							: t.auth.login.signInButton}
// 				</Button>
// 			</form>
// 			<Stack
// 				spacing={4}
// 				direction="row"
// 				alignItems="center"
// 				justifyContent="space-between"
// 				width="100%"
// 				marginTop={2}
// 			>
// 				<div className="cta-button-wrapper flex items-center gap-[8px]">
// 					<p className="text-[12px] text-text-grey">{t.auth.login.content.noAccountYet}</p>
// 					<Button className="flex-start min-w-[auto] px-0 underline" asChild variant="link" size="sm">
// 						<Link href={paths.register()}>{t.auth.login.content.signUpText}</Link>
// 					</Button>
// 				</div>
// 				<div className="flex gap-[8px]">
// 					<Button className="flex-start min-w-[auto] px-0 underline" asChild variant="link" size="sm">
// 						<Link href={paths.passwordReset()}>{t.auth.login.content.forgotPasswordLink}</Link>
// 					</Button>
// 				</div>
// 			</Stack>
// 		</>
// 	);
// };

// export { SignInForm };
