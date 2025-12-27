'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProgressArea from "@/components/ProgressArea";
import UserContext from "@/lib/contexts/UserContext";
import ProgressContext from "@/lib/contexts/ProgressContext";

const { UserProvider, useUser } = UserContext;
const { ProgressProvider } = ProgressContext;

function SurveyContent() {
	const router = useRouter();
	const { userInfo } = useUser();

	useEffect(() => {
		// Redirect to home if no email is set (user hasn't completed step one)
		if (!userInfo?.email) {
			// router.push('/');
			console.error('User email was not found. Redirect to email step.');
		}
	}, [userInfo?.email, router]);

	// Don't render if no email (will redirect)
	if (!userInfo?.email) {
		return null;
	}

	return (
		<div className="page-wrapper bg-white rounded">
			<div className="max-width-600">
				Survey Content Here
			</div>
		</div>
	);
}

export default function Survey() {
	return (
		<UserProvider>
			<ProgressProvider initialStep={4}>
				<ProgressArea />
				<SurveyContent />
			</ProgressProvider>
		</UserProvider>
	);
}

