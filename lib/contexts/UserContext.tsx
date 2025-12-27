'use client';

import { createContext, useContext, useMemo, useState, useEffect, type ReactNode } from "react";
import type { UserInfo } from "@/lib/types";

interface UserContextValue {
	userInfo: Partial<UserInfo> | null;
	setUserInfo: (userInfo: Partial<UserInfo> | null) => void;
	updateUserInfo: (updates: Partial<UserInfo>) => Promise<void>;
	lookupUser: (email: string) => Promise<void>;
}

const STORAGE_KEY = 'userInfo';

const UserContext = createContext<UserContextValue | undefined>(undefined);

function UserProvider({ children }: { children: ReactNode }) {
	const [userInfo, setUserInfoState] = useState<Partial<UserInfo> | null>(null);

	// Load user info from localStorage on mount
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				try {
					const parsed = JSON.parse(stored);
					setUserInfoState(parsed);
				} catch (error) {
					console.error('Error parsing stored user info:', error);
					localStorage.removeItem(STORAGE_KEY);
				}
			}
		}
	}, []);

	// Persist user info to localStorage whenever it changes
	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (userInfo) {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(userInfo));
			} else {
				localStorage.removeItem(STORAGE_KEY);
			}
		}
	}, [userInfo]);

	const setUserInfo = (info: Partial<UserInfo> | null) => {
		setUserInfoState(info);
	};

	const lookupUser = async (email: string) => {
		try {
			const response = await fetch('/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});

			if (!response.ok) {
				throw new Error('Failed to lookup user');
			}

			const data = await response.json();
			if (data.user) {
				setUserInfoState((prev) => ({
					...prev,
					...data.user,
				}));
			}
		} catch (error) {
			console.error('Error looking up user:', error);
			throw error;
		}
	};

	const updateUserInfo = async (updates: Partial<UserInfo>) => {
		if (!userInfo?.email) {
			throw new Error('Email is required to update user info');
		}

		try {
			const response = await fetch('/api/users', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...userInfo,
					...updates,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to update user');
			}

			const data = await response.json();
			if (data.user) {
				setUserInfoState((prev) => ({
					...prev,
					...data.user,
				}));
			}
		} catch (error) {
			console.error('Error updating user:', error);
			throw error;
		}
	};

	const value = useMemo(
		() => ({
			userInfo,
			setUserInfo,
			updateUserInfo,
			lookupUser,
		}),
		[userInfo],
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