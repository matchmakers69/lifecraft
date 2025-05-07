"use client";

import { useDashboardContext } from "@/domains/dashboard/context/DashboardContext";
import { sidebarNavigationList } from "../../services";
import { useToggle } from "@/shared/hooks";
import { NavLink } from "@/components/ui";
import { SidebarLogoWrapper } from "./SidebarLogoWrapper";
import { DashboardFooter } from "./DashboardFooter";

const Sidebar = () => {
	const { isSidebarInView } = useDashboardContext();
	const { isOn, toggle } = useToggle();

	return (
		<aside
			className={`fixed inset-y-0 left-0 z-40 w-[32rem] bg-dark-navy flex-shrink-0 transition-transform duration-300 ease-in-out ${isSidebarInView ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
		>
			<nav className="flex h-full min-h-0 flex-col">
				<div className="flex flex-col p-6 [&>[data-slot=section]+[data-slot=section]]:mt-2.5">
					<SidebarLogoWrapper />
				</div>
				<div className="flex flex-1 flex-col overflow-y-auto p-6 [&>[data-slot=section]+[data-slot=section]]:mt-8">
					<div className="flex-scroll-mb-5 mb-8 flex w-full">
						<p className={`text-base font-normal uppercase text-text-grey`}></p>
					</div>
					<div className="flex flex-col gap-0.5" data-slot="section">
						<ul className="admin-list m-0 flex w-full flex-1 flex-col gap-4 p-0 md:flex-initial md:items-stretch">
							{sidebarNavigationList.map((link) => {
								return (
									<li key={link.id}>
										{Array.isArray(link.children) && link.children.length > 0 ? (
											<div>
												<button
													onClick={() => toggle()}
													className="relative flex h-[52px] w-full cursor-pointer select-none items-center justify-between gap-[10px] rounded-[10px] bg-transparent px-[15px] py-[10px] text-[#555] transition-all duration-200 ease-out md:hover:bg-[#ffffff13] md:hover:text-text-light"
												>
													<span className="flex items-center gap-[10px]">
														<i className={`ri-${link.icon}-line`} />
														<span className="text-inherit">{link.label}</span>
													</span>
													<i className={`ri-arrow-${isOn ? "up" : "down"}-s-line`} />
												</button>

												{/* Dropdown menu */}
												{isOn && Array.isArray(link.children) && link.children.length > 0 && (
													<ul className="ml-5 mt-2 flex flex-col gap-2">
														{link.children.map((child, index) => (
															<li key={index}>
																<NavLink
																	className="relative flex h-[40px] cursor-pointer select-none items-center gap-[10px] rounded-[8px] px-[15px] py-[8px] text-[#777] transition-all duration-200 ease-out md:hover:bg-[#ffffff13] md:hover:text-text-light"
																	href={child.href}
																>
																	<i className={`ri-${child.icon}-line`} />
																	<span className="text-inherit">{child.label}</span>
																</NavLink>
															</li>
														))}
													</ul>
												)}
											</div>
										) : (
											// Regular menu item
											<NavLink
												className="relative flex h-[52px] max-w-full cursor-pointer select-none items-center justify-start gap-[10px] rounded-[10px] bg-transparent px-[15px] py-[10px] text-[#555] transition-all duration-200 ease-out md:hover:bg-[#ffffff13] md:hover:text-text-light"
												classNameActive="text-primary bg-[#ffffff0d]"
												href={link.href}
											>
												<i className={`ri-${link.icon}-line`} />
												<span className="text-inherit">{link.label}</span>
											</NavLink>
										)}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
				<DashboardFooter />
			</nav>
		</aside>
	);
};

export { Sidebar };
