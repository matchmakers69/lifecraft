"use client";

import { Controller } from "react-hook-form";
import Link from "next/link";

import { useClientReady } from "@/shared/hooks";
import { Loader2 } from "lucide-react";

import Stack from "@mui/material/Stack";
import { Button, FormError, FormSuccess, MUIFormHelperText, MUITextField } from "@/shared/components/ui";

import { paths } from "@/constants";
import { t } from "@/shared/locales";
import { useSignInUser } from "../hooks";

const SignInForm = () => {
	const { clientReady } = useClientReady();
	const { submitSignIn, control, isDirty, isPending, success, error, errors, urlError, showTwoFactor } =
		useSignInUser();

	if (!clientReady) {
		return <Loader2 size={30} className="mx-auto my-10 animate-spin" />;
	}
	return (
		<>
			<form onSubmit={submitSignIn} className="w-full" autoComplete="off" noValidate>
				{showTwoFactor && ( // BE AWARE: Currently no functinality to change 2FA from front end, possibly Admin panel needed - currentlu we toggle tru/false from database
					<div>
						<Controller
							name="code"
							control={control}
							render={({ field }) => (
								<MUITextField
									{...field}
									id="code"
									placeholder="i.e 123456"
									label="Verification Code"
									variant="outlined"
									error={!!errors?.code}
									fullWidth
									disabled={isPending}
									margin="normal"
								/>
							)}
						/>
						{errors?.code && <MUIFormHelperText>{errors.code.message}</MUIFormHelperText>}
					</div>
				)}
				{!showTwoFactor && (
					<Stack
						sx={{
							marginBottom: "30px",
						}}
						gap={1}
					>
						<div>
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
										error={!!errors?.email}
										fullWidth
										margin="normal"
									/>
								)}
							/>
							{errors?.email && <MUIFormHelperText>{errors.email.message}</MUIFormHelperText>}
						</div>
						<div>
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
										error={!!errors?.password}
										fullWidth
										margin="normal"
									/>
								)}
							/>
							{errors?.password && <MUIFormHelperText>{errors.password.message}</MUIFormHelperText>}
						</div>
					</Stack>
				)}
				<div className="mb-8">
					<FormError message={error || urlError} />
					<FormSuccess message={success ?? "Congrats! You are now logged in!"} />
				</div>
				<Button type="submit" variant="default" size="full" disabled={!isDirty || isPending}>
					{isPending
						? t.auth.login.processingText
						: showTwoFactor
							? t.auth.login.confirmText
							: t.auth.login.signInButton}
				</Button>
			</form>
			<Stack
				spacing={4}
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				width="100%"
				marginTop={2}
			>
				<div className="cta-button-wrapper flex items-center gap-[8px]">
					<p className="text-[12px] text-text-grey">{t.auth.login.content.noAccountYet}</p>
					<Button className="flex-start min-w-[auto] px-0 underline" asChild variant="link" size="sm">
						<Link href={paths.register()}>{t.auth.login.content.signUpText}</Link>
					</Button>
				</div>
				<div className="flex gap-[8px]">
					<Button className="flex-start min-w-[auto] px-0 underline" asChild variant="link" size="sm">
						<Link href={paths.passwordReset()}>{t.auth.login.content.forgotPasswordLink}</Link>
					</Button>
				</div>
			</Stack>
		</>
	);
};

export { SignInForm };
