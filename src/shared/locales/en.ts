export const en = {
	navigationLinks: {
		home: "Home",
		settings: "Settings",
		account: "Account",
		admin: "Admin",
	},
	sidebarNavigationLinks: {
		home: "Home",
		settings: "Settings",
		account: "Account",
	},
	errors: {
		errorMsg: "An unexpected error occurred. Please try again.",
	},
	auth: {
		logout: {
			error: "Could not sign out user!",
			signOut: "Sign out",
		},
		login: {
			slogan: "Welcome back!",
			title: "Sign in",
			subtitle: "Enter your username and password to log in to your admin panel",
			content: {
				title: "Start your experience with Lifecraft and change your life!",
				subtitle: "You are one step away from permanently changing the way of your life.",
				signInWithOneClick: "Sign in with one click",
				googleButtonSignInText: "Sign in with Google",
				provideLoginDetailsText: "or provide login details",
				noAccountYet: "Don’t have account yet?",
				forgotPasswordLink: "Forgot your password?",
				signUpText: "Sign up",
			},
			loginSchema: {
				emailRequired: "Email is a required field",
				invalidEmailAddress: "Invalid email address",
				passwordRequired: "Password is a required field",
				codePattern: "Code must be exactly 6 digits if provided",
				codeDigitsOnly: "Code must include only digits",
			},
			accountNotFound: "No account found with these credentials. Please sign up",
			confirmationEmailSent: "Confirmation email sent!",
			invalidCredentials: "Invalid credentials",
			incorrectCode: "The code you entered is incorrect. Please try again",
			codeExpired: "Your code has expired",
			loginSuccess: "You’ve successfully signed in. Please wait while we redirect you to your dashboard.",
			incorrectEmailOrPassword: "The email or password you entered is incorrect.",
			loginError: "Something went wrong with login!",
			signInButton: "Sign in",
			processingText: "Processing...",
			confirmText: "Confirm",
		},
		register: {
			title: "Sign up",
			subtitle: "Register to log in to your admin panel",
			content: {
				signUpWithOneClick: "Sign up with one click",
				googleButtonSignUpText: "Sign up with Google",
				provideRegistrationDetailsText: "or provide registration details",
				haveAccount: "Have an account?",
				signInText: "Sign in",
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
		verification: {
			tokenExpired: "Token has expired!",
			verificationTokenDoeasNotExist: "Verification token does not exist!",
			userDoesNotExist: "User does not exist!",
			emailVerified: "Congrats! Your email has been verified.",
			title: "User verification",
			subtitle: "Your verification is complete",
		},
		errors: {
			mustBeAuthorized: "You must be authorized to do this.",
			emailUsed: "Email already used",
			userNotFoundInSession: "User not found in session. Middleware may not be protecting this route."
		},
		success: {
			alertEmail:"Verification email sent!"
		}
	},
	settings: {
		title: "Settings",
		errors: {
			noUpdate:"No changes to update. Please modify at least one field."
		}
	},
	account: {
		title: "Account",
		errors: {
			noUpdate:"No changes to update. Please modify at least one field."
		}
	},
} satisfies Record<string, unknown>;
