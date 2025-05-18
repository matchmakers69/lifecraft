"use client";

import { ExtendedUser } from "@/lib/auth";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateAvatarValues, updateAvatarSchema } from "../validationSchemas";
import { getSignedURL } from "@/app/(root)/(features)/dashboard/account/_actions";
import { useClientReady } from "@/shared/hooks";
import { useRef, useActionState, useEffect, useState, ChangeEvent, startTransition } from "react";
import { Loader, Loader2, X } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/shared/components/ui";
import { AvatarUpload } from "./AvatarUpload";
import { updateUserAvatar } from "@/app/(root)/(features)/dashboard/account/_actions/updateUserAvatar";
import { computeSHA256 } from "@/utils";

type AvatarFormProps = {
	user: ExtendedUser;
};

export const AvatarForm = ({ user }: AvatarFormProps) => {
	const { clientReady } = useClientReady();
	const [isUploading, setIsUploading] = useState(false);
	const [file, setFile] = useState<File | undefined>(undefined);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const [state, formAction, isPending] = useActionState(updateUserAvatar, {
		errors: {},
		success: "",
	});
	const methods = useForm<UpdateAvatarValues>({
		mode: "onTouched",
		resolver: zodResolver(updateAvatarSchema),
		defaultValues: {
			image: user.image ?? undefined,
		},
	});

	const {
		handleSubmit,
		reset,
		formState: { isDirty },
	} = methods;

	const handleImageUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		setFile(file);

		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
		}
		// if there is the file we can generate local url
		if (file) {
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);
		} else {
			setPreviewUrl(null);
		}
	};

	useEffect(() => {
		if (state?.success) {
			toast.success(state.success);
			reset({
				image: undefined,
			});
		}
	}, [reset, state.success]);

	useEffect(() => {
		if (state?.success) {
			toast.success(state.success);

			reset({
				image: undefined,
			});

			setFile(undefined);
			setPreviewUrl(null);
		}
	}, [reset, state.success]);

	const handleCancelAddingAvatar = () => {
		setFile(undefined);
		setPreviewUrl(null);
	};

	const handleUploadAvatar = async () => {
		const formData = new FormData(formRef.current!);

		try {
			if (file && file instanceof File) {
				setIsUploading(true);
				const checksum = await computeSHA256(file);
				const signedURLResult = await getSignedURL(file.type, file?.size, checksum);

				if (signedURLResult.failure !== undefined) {
					setIsUploading(false);
					console.error("error");
					return;
				}

				const url = signedURLResult.success.url;
				const avatarUrl = url.split("?")[0];

				await fetch(url, {
					method: "PUT",
					body: file,
					headers: {
						"Content-Type": file.type,
					},
				});
				formData.set("image", avatarUrl);
				startTransition(() => formAction(formData));
			} else {
				formData.delete("image");
			}
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message ?? "Avatar upload failed!");
			} else {
				console.warn(error);
				toast.error("Avatar upload failed!");
			}
		} finally {
			setIsUploading(false);
		}
	};
	if (!clientReady) {
		return <Loader2 size={30} className="mx-auto my-10 animate-spin" />;
	}
	return (
		<FormProvider {...methods}>
			<form
				ref={formRef}
				className="w-full"
				autoComplete="off"
				noValidate
				action={formAction}
				onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
					event.preventDefault();
					handleSubmit(handleUploadAvatar)(event);
				}}
			>
				{previewUrl && file && (
					<div className="flex flex-wrap justify-between items-center w-full mb-6">
						<span className="inline-block">{file?.name}</span>
						<button
							className="flex gap-2 items-center"
							onClick={handleCancelAddingAvatar}
							type="button"
							aria-label="Cancel adding image for upload"
						>
							<span className="cancel-text">Cancel</span>
							<span className="sidebar-close-menu flex h-[2rem] w-[2rem] cursor-pointer rounded-2xl flex-col items-center justify-center border border-white focus-global">
								<X size={10} strokeWidth={2} />
							</span>
						</button>
					</div>
				)}

				<AvatarUpload file={file} fileUrl={previewUrl} user={user} onImageChange={handleImageUploadChange} />
				<Button
					aria-disabled={isPending || isUploading || !isDirty}
					type="submit"
					variant="default"
					size="sm"
					disabled={isPending || isUploading || !isDirty}
				>
					{isPending || (isUploading && <Loader className="size-6 animate-spin" />)}
					<span className="inline-block">{isPending ? "Uploading now..." : "Upload avatar"}</span>
				</Button>
			</form>
		</FormProvider>
	);
};
