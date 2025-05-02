export const en = {
	errors: {
		errorMsg: "An unexpected error occurred. Please try again.",
	},
	auth: {
		logout: {
			error: "Could not sign out user!",
		},
		login: {
			slogan: "Welcome back!",
			title: "Sign in",
			subtitle: "Enter your username and password to log in to your admin panel",
			content: {
				title: "Start your experience with Lifecraft and change your life!",
				subtitle: "You are one step away from permanently changing the way of your life.",
			},
			loginSchema: {
				emailRequired: "Email is a required field",
				invalidEmailAddress: "Invalid email address",
				passwordRequired: "Password is a required field",
				codePattern: "Code must be exactly 6 digits if provided",
				codeDigitsOnly: "Code must include only digits",
			},
		},
		register: {
			title: "Sign up",
			subtitle: "Register to log in to your admin panel",
			content: {
				signUpWithOneClick: "Sign up with one click",
				googleButtonSignUpText: "Sign up with Google",
				provideRegistrationDetailsText: "or provide registration details",
			},
			registerSchema: {
				nameRequired: "Name is required field",
				nameMaxLength: "Name cannot exceed 50 characters",
				spacesNotAllowed: "Spaces are not allowed",
				emailRequired: "Email is a required field",
				invalidEmailAddress: "Invalid email address",
				passwordMinLength: "Password must be at least 6 characters",
				passwordMaxLength: "Password cannot exceed 30 characters",
				passwordUpperLetterRequired: "Password requires at least one uppercase letter",
				passwordNumberRequired: "Include at least one number in your password",
				passwordSpecialCharacterRequired: "Password requires at least one special character",
			},
			userExists: "User already exists!",
			registrationSuccess: "Registration successful! Please check your email to verify your account",
			errorInRegistration: "Error during user registration:",
		},
	},
	settings: {
		title: "Settings",
	},
} satisfies Record<string, unknown>;
