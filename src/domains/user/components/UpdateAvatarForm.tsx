import { updateAvatar } from "@/app/(root)/(features)/dashboard/account/_actions";
import { useClientReady } from "@/shared/hooks";
import toast from "react-hot-toast";
import { Loader, Loader2 } from "lucide-react";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ExtendedUser } from "@/lib/auth";
import { Button, MUIFileInput } from "@/shared/components/ui";
import { UpdateAvatarValues } from "../validationSchemas";

type UpdateAvatarFormProps = {
	user: ExtendedUser;
};

export const UpdateAvatarForm = ({ user }: UpdateAvatarFormProps) => {
	const { clientReady } = useClientReady();
	const formRef = useRef<HTMLFormElement>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [state, formAction, isPending] = useActionState(updateAvatar, {
		errors: {},
		success: "",
	});
	const { control, handleSubmit, reset } = useForm<UpdateAvatarValues>({
		mode: "onTouched",
		defaultValues: {
			image: "",
		},
	});
	useEffect(() => {
		reset({
			image: user?.image || "",
		});
	}, [user, reset]);

	useEffect(() => {
		if (state?.success) {
			toast.success(state.success);
			reset({
				image: state.updateUserAvatar?.image || user.image || undefined,
			});
		}
	}, [reset, state, user]);

	const handleUpdateUserDetails = () => {
		const formData = new FormData(formRef.current!);
		startTransition(() => formAction(formData));
	};
	if (!clientReady) {
		return <Loader2 size={30} className="mx-auto my-10 animate-spin" />;
	}
	return (
		<form
			ref={formRef}
			className="flex w-full flex-col flex-wrap"
			autoComplete="off"
			noValidate
			action={formAction}
			onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
				event.preventDefault();
				handleSubmit(handleUpdateUserDetails)(event);
			}}
		>
			{!user.is0Auth && (
				<>
					<div className="mb-12">
						<Controller
							name="image"
							control={control}
							render={({ field: { onChange, onBlur, ref, name } }) => (
								<MUIFileInput
									accept="image/*"
									id="image"
									name={name}
									label="Avatar"
									variant="outlined"
									onBlur={onBlur}
									ref={ref}
									fullWidth
									margin="none"
									onFileChange={(file) => {
										onChange(file ?? imagePreview);
										if (file) {
											const imageUrl = URL.createObjectURL(file);
											setImagePreview(imageUrl);
										}
									}}
								/>
							)}
						/>
					</div>
				</>
			)}
			<div>
				<Button type="submit" variant="default" size="sm" disabled={isPending}>
					{isPending && <Loader className="size-6 animate-spin" />}
					<span className="inline-block">{isPending ? "Updating now..." : "Update user details"}</span>
				</Button>
			</div>
		</form>
	);
};
