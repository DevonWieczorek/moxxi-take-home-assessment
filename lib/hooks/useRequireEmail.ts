import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserContext from '@/lib/contexts/UserContext';

const { useUser } = UserContext;

/**
 * Custom hook that redirects to home if user email is not set
 * Useful for protecting pages that require the user to have completed step one
 * 
 * @param redirectPath - Optional path to redirect to (defaults to '/')
 * @returns boolean indicating whether email has been found
 */
export const useRequireEmail = (redirectPath: string = '/'): boolean => {
	const router = useRouter();
	const { userInfo, isLoading } = useUser();

	useEffect(() => {
		// Don't redirect while still loading from localStorage
		if (isLoading) {
			return;
		}

		// Redirect to home if no email is set (user hasn't completed step one)
		if (!userInfo?.email) {
			router.push(redirectPath);
			console.error('User email was not found. Redirect to email step.');
		}
	}, [userInfo?.email, isLoading, router, redirectPath]);

	// Return true if email is found, false otherwise (including while loading)
	return !isLoading && !!userInfo?.email;
};

