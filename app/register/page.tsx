'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RegistrationForm from "@/components/RegistrationForm";
import Logo from "@/components/Logo";
import UserContext from "@/lib/contexts/UserContext";
import ProgressContext from "@/lib/contexts/ProgressContext";

const { UserProvider, useUser } = UserContext;
const { ProgressProvider } = ProgressContext;

function RegisterContent() {
	const router = useRouter();
	const { userInfo } = useUser();

	useEffect(() => {
		// Redirect to home if no email is set (user hasn't completed step one)
		if (!userInfo?.email) {
			router.push('/');
		}
	}, [userInfo?.email, router]);

	// Don't render if no email (will redirect)
	if (!userInfo?.email) {
		return null;
	}

	return (
		<div className="page-wrapper bg-white rounded">
			<Logo />
			<div className="max-width-600">
				<RegistrationForm />
			</div>
		</div>
	);
}

export default function Register() {
	return (
		<UserProvider>
			<ProgressProvider initialStep={2}>
				<RegisterContent />
			</ProgressProvider>
		</UserProvider>
	);
}

