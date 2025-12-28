'use client';

import { createContext, useContext, useMemo, useState, useEffect, useCallback, type ReactNode } from "react";
import type { UserInfo } from "@/lib/types";
import type { CreateUserResponse, UpdateUserResponse, ApiErrorResponse } from "@/lib/api/types";

interface UserContextValue {
	userInfo: Partial<UserInfo> | null;
	setUserInfo: (userInfo: Partial<UserInfo> | null) => void;
	updateUserInfo: (updates: Partial<UserInfo>) => Promise<void>;
	lookupUser: (email: string) => Promise<void>;
	error: string | null;
	setError: (error: string | null) => void;
	clearError: () => void;
	isLoading: boolean;
}

const STORAGE_KEY = 'userInfo';

const UserContext = createContext<UserContextValue | undefined>(undefined);

function UserProvider({ children }: { children: ReactNode }) {
	const [userInfo, setUserInfoState] = useState<Partial<UserInfo> | null>(null);
	const [error, setErrorState] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	// Load user info from localStorage on mount
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				try {
					const parsed = JSON.parse(stored) as Partial<UserInfo>;
					// Basic validation - ensure it's an object
					if (parsed && typeof parsed === 'object') {
						setUserInfoState(parsed);
					} else {
						localStorage.removeItem(STORAGE_KEY);
					}
				} catch (error) {
					console.error('Error parsing stored user info:', error);
					localStorage.removeItem(STORAGE_KEY);
				}
			}
			setIsLoading(false);
		} else {
			setIsLoading(false);
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
		// Clear errors when user info is updated (user is typing/interacting)
		setErrorState(null);
		setUserInfoState(info);
	};

	const setError = (errorMessage: string | null) => {
		setErrorState(errorMessage);
	};

	const clearError = () => {
		setErrorState(null);
	};

	const lookupUser = useCallback(async (email: string) => {
		if (!email || email === '') {
			const errorMessage = 'Please input a valid email.';
			setErrorState(errorMessage);
			throw new Error(errorMessage);
		}

		try {
			setErrorState(null);
			const response = await fetch('/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});

			if (!response.ok) {
				// Try to parse error response from API
				let errorMessage = 'Failed to lookup user';
				try {
					const errorData = await response.json() as ApiErrorResponse;
					if (errorData.error) {
						errorMessage = errorData.error;
					}
				} catch {
					// If parsing fails, use default message
				}
				setErrorState(errorMessage);
				throw new Error(errorMessage);
			}

			const data = await response.json() as CreateUserResponse;
			if (data.user) {
				setUserInfoState((prev) => ({
					...prev,
					...data.user,
				}));
			}
		} catch (err) {
			console.error('Error looking up user:', err);
			if (err instanceof Error) {
				setErrorState(err.message);
			}
			throw err;
		}
	}, []);

	const updateUserInfo = useCallback(async (updates: Partial<UserInfo>) => {
		if (!userInfo?.email) {
			const errorMessage = 'Email is required to update user info';
			setErrorState(errorMessage);
			throw new Error(errorMessage);
		}

		try {
			setErrorState(null);
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
				// Try to parse error response from API
				let errorMessage = 'Failed to update user';
				try {
					const errorData = await response.json() as ApiErrorResponse;
					if (errorData.error) {
						errorMessage = errorData.error;
					}
				} catch {
					// If parsing fails, use default message
				}
				setErrorState(errorMessage);
				throw new Error(errorMessage);
			}

			const data = await response.json() as UpdateUserResponse;
			if (data.user) {
				setUserInfoState((prev) => ({
					...prev,
					...data.user,
				}));
			}
		} catch (err) {
			console.error('Error updating user:', err);
			if (err instanceof Error) {
				setErrorState(err.message);
			}
			throw err;
		}
	}, [userInfo]);

	const value = useMemo(
		() => ({
			userInfo,
			setUserInfo,
			updateUserInfo,
			lookupUser,
			error,
			setError,
			clearError,
			isLoading,
		}),
		[userInfo, error, updateUserInfo, lookupUser, isLoading],
	);

	// Clear errors when component mounts
	useEffect(() => {
		setErrorState(null);
	}, []);

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