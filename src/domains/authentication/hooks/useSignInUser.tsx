"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "../validationSchemas";
import { signInUser } from "@/app/(root)/(authentication)/auth/_actions/signIn";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSessionWithUpdate } from "./useSessionWithUpdate";

export const useSignInUser = () => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const { update } = useSessionWithUpdate();
	const [success, setSuccess] = useState<string | undefined>("");
	const [error, setError] = useState<string | undefined>("");
	const [showTwoFactor, setShowTwoFactor] = useState(false);
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");
	const urlError =
		searchParams.get("error") === "OAuthAccountNotLinked"
			? `Email already in use. Please login with form.`
			: "";

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isDirty },
	} = useForm<LoginFormValues>({
		mode: "onTouched",
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			code: "",
		},
	});

	const handleSignInSubmit: SubmitHandler<LoginFormValues> = (values) => {
		setSuccess("");
		setError("");
		startTransition(() => {
			signInUser(values, callbackUrl)
				.then((data) => {
					if (data.errors?._form?.length) {
						toast.error(data.errors._form.join(", "));
						reset();
						setShowTwoFactor(false);
					}
					if (data.success) {
						reset();
						toast.success(data.success);
						setSuccess(data.success || "Congrats! You are now logged in!");
						update().then(() => {
							router.refresh();
							router.push(DEFAULT_LOGIN_REDIRECT);
						});
					}
					if (data?.twoFactor) {
						setShowTwoFactor(true);
					}
				})
				.catch((err) => {
					if (err instanceof Error) {
						setError(err.message);
					}
					setError("Unexpected error occurred during login.");
				});
		});
	};

	const submitSignIn = handleSubmit(handleSignInSubmit);

	return {
		submitSignIn,
		control,
		errors,
		isDirty,
		isSubmitting,
		isPending,
		success,
		error,
		urlError,
		showTwoFactor,
	};
};
