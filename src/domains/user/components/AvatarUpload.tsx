"use client";

import { Controller, useFormContext } from "react-hook-form";
import { ExtendedUser } from "@/lib/auth";
import { FileUploadLabel, MUIFileInput } from "@/shared/components/ui";
import { ChangeEvent } from "react";

type AvatarUploadProps = {
	user: ExtendedUser;
	onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
	file?: File;
	fileUrl: string | null;
};

export const AvatarUpload = ({ user, onImageChange }: AvatarUploadProps) => {
	const { control } = useFormContext();
	return (
		<>
			{!user.is0Auth && (
				<>
					<div className="mb-12">
						<FileUploadLabel className="text-sm" id="image" label="Upload file">
							<svg
								className="w-7 h-7 hover:cursor-pointer transform-gpu active:scale-75 transition-all text-white"
								aria-label="Attach media"
								role="img"
								viewBox="0 0 20 20"
							>
								<title>Attach media</title>
								<path
									d="M13.9455 9.0196L8.49626 14.4688C7.16326 15.8091 5.38347 15.692 4.23357 14.5347C3.07634 13.3922 2.9738 11.6197 4.30681 10.2794L11.7995 2.78669C12.5392 2.04694 13.6745 1.85651 14.4289 2.60358C15.1833 3.3653 14.9855 4.4859 14.2458 5.22565L6.83367 12.6524C6.57732 12.9088 6.28435 12.8355 6.10124 12.6671C5.94011 12.4986 5.87419 12.1983 6.12322 11.942L11.2868 6.78571C11.6091 6.45612 11.6164 5.97272 11.3088 5.65778C10.9938 5.35749 10.5031 5.35749 10.1808 5.67975L4.99529 10.8653C4.13835 11.7296 4.1823 13.0626 4.95134 13.8316C5.77898 14.6592 7.03874 14.6446 7.903 13.7803L15.3664 6.32428C16.8678 4.81549 16.8312 2.83063 15.4909 1.4903C14.1799 0.179264 12.1584 0.106021 10.6496 1.60749L3.10564 9.16608C1.16472 11.1143 1.27458 13.9268 3.06169 15.7139C4.8488 17.4937 7.6613 17.6109 9.60955 15.6773L15.1027 10.1841C15.4103 9.87653 15.4103 9.30524 15.0881 9.00495C14.7878 8.68268 14.2677 8.70465 13.9455 9.0196Z"
									className="fill-current"
								></path>
							</svg>
							<Controller
								name="image"
								control={control}
								render={({ field: { onChange, onBlur, ref, name } }) => (
									<MUIFileInput
										id="image"
										name={name}
										variant="outlined"
										onBlur={onBlur}
										ref={ref}
										margin="none"
										onChange={onImageChange}
										onFileChange={(file) => {
											onChange(file);
										}}
									/>
								)}
							/>
						</FileUploadLabel>
					</div>
				</>
			)}
		</>
	);
};
