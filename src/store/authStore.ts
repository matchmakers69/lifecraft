import { Session } from "next-auth";
import { create } from "zustand";

type SessionStore = {
	session: Session | null;
	setSession: (session: Session | null) => void;
	logout: () => void;
};

const useSessionStore = create<SessionStore>((set) => ({
	session: null,
	setSession: (session) => set({ session }),
	logout: () => set({ session: null }),
}));

export { useSessionStore };
