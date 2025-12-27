import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { UserInfo } from "@/lib/types";

interface UserContextValue {
	userInfo: Partial<UserInfo> | null;
	setUserInfo: (userInfo: Partial<UserInfo> | null) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

function UserProvider({ children }: { children: ReactNode }) {
	const [userInfo, setUserInfo] = useState<Partial<UserInfo> | null>(null);

	// TODO: add caching/lookup to user info

	const value = useMemo(
		() => ({
			userInfo,
			setUserInfo
		}),
		[userInfo, setUserInfo],
	);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}

	return context;
}

export default {
	UserProvider,
	useUser,
};