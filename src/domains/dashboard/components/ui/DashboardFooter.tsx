"use client";

import { LogoutButton } from "@/domains/authentication/components/ui";
import { useSessionWithUpdate } from "@/domains/authentication/hooks";

const DashboardFooter = () => {
	const { session } = useSessionWithUpdate();
	const userName = session?.user.name ?? "Username";
	const email = session?.user.email ?? "";
	return (
		<footer className="flex flex-col p-6 [&>[data-slot=section]+[data-slot=section]]:mt-2.5">
			<div className="dashboard-footer-inner border-t dark-border pt-6">
				{session && session.user && (
					<>
						<div className="username-wrapper mb-4 flex w-full select-none flex-col flex-wrap gap-[5px]">
							<label className={`text-base font-normal uppercase text-text-grey`}>Signed as</label>
							{status === "loading" ? (
								<span>Loading...</span>
							) : (
								<div className="flex w-full flex-col flex-wrap gap-[3px]">
									<p className="w-full overflow-hidden text-ellipsis text-left text-sm text-text-light">
										{userName}
									</p>
									<p className="w-full overflow-hidden text-ellipsis text-left text-sm font-semibold text-text-light">
										{email}
									</p>
								</div>
							)}
						</div>
						<div className="flex items-center py-4">
							<LogoutButton />
						</div>
					</>
				)}
			</div>
		</footer>
	);
};

export { DashboardFooter };
