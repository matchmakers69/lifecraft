export type UpdateUserSettingsFormState = {
	errors?: {
		name?: string[];
		email?: string[];
		_form?: string[];
	};
	success?: string;
	updatedUser?: {
		name: string | null;
		email: string | null;
	};
};

export type UpdateUserAvatarState = {
	errors?: {
		image?: string[];
		_form?: string[];
	  };
	  success?: string;
	  updatedUser?: {
		image: string | null;
	  };
}