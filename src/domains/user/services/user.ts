import { db } from "@/db";


const getUserByEmail = async (email: string) => {
	try {
		const user = await db.user.findUnique({
			where: {
				email,
			},
		});

		return user;
	} catch {
		return null;
	}
};

const getUserById = async (id: string) => {
	try {
		const user = await db.user.findUnique({
			where: {
				id,
			},
		});

		return user;
	} catch {
		return null;
	}
};

// export const currentUser = async () => {
// 	const session = await auth();
  
// 	return session?.user;
//   };

export { getUserById, getUserByEmail };
