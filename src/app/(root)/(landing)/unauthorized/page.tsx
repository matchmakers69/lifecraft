"use client";

import { PageTitle } from "@/components/ui";
import { Button } from "@/shared/components/ui";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
	const router = useRouter();
	return (
		<>
			<PageTitle title="Unauthorized" slogan="Access denied" />
			<div className="mt-10 flex flex-col items-center justify-center text-center">
				<p className="mb-8 text-lg text-text-light">You do not have permission to view this page.</p>
				<Button type="button" variant="default" onClick={() => router.push("/")}>
					Go to Homepage
				</Button>
			</div>
		</>
	);
}
