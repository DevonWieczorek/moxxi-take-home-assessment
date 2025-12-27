import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export interface UserInfo {
	email: string;
	firstname: string;
	lastname: string;
	dobDay: number;
	dobMonth: number;
	dobYear: number;
	gender: 'male' | 'female' | 'na';
	streetAddress: string;
	zip: number;
	city: string;
	state: string;
	telephone: string | number; // TODO: update
}

interface UserContextValue {
	userInfo: UserInfo | null;
	setUserInfo: (userInfo: Partial<UserInfo> | null) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

function UserProvider({ children }: { children: ReactNode }) {
	const [userInfo, setUserInfo] = useState<Partial<UserInfo> | null>(null);

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