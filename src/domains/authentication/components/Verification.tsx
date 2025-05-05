"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { verifyEmail } from "@/app/(root)/(authentication)/auth/_actions";
import { Button, FormError, FormSuccess } from "@/shared/components/ui";
import { Loader } from "lucide-react";

const Verification = () => {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();

	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const onSubmit = useCallback(() => {
		if (success || error) return;
		if (!token) {
			setError("Missing token");
			return;
		}
		verifyEmail(token)
			.then((data) => {
				setSuccess(data.success);
				setError(data.error);
			})
			.catch(() => {
				setError("Something went wrong with verification token!");
			});
	}, [error, success, token]);

	useEffect(() => {
		onSubmit();
	}, [onSubmit]);

	return (
		<>
			<div className="flex w-full items-center justify-center">
				{!success && !error && <Loader />}
				<FormSuccess message={success ?? ""} />
				{/* // TODO be aware error may show up despite user's email is verified - should be fixed on production */}
				{!success && <FormError message={error ?? ""} />}
			</div>
			<div className="mt-[16px] flex w-full items-center gap-[8px]">
				<p className="text-[12px] text-text-grey">Have an account?</p>
				<Button className="flex-start min-w-[auto] px-0 underline" asChild variant="link" size="sm">
					<Link href="/auth/login">Sign in</Link>
				</Button>
			</div>
		</>
	);
};

export { Verification };
