'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ErrorContent from "@/components/ErrorContent";
import IconSection from "@/components/IconSection";
import ProgressArea from "@/components/ProgressArea";
import UserContext from "@/lib/contexts/UserContext";
import ProgressContext from "@/lib/contexts/ProgressContext";
import StepTwo from "@/app/register/components/StepTwo";
import StepThree from "@/app/register/components/StepThree";
import StepFour from "@/app/register/components/StepFour";
import styles from "@/components/forms/styles/Form.module.css";

const { UserProvider, useUser } = UserContext;
const { ProgressProvider, useProgress } = ProgressContext;

function RegisterContent() {
	const router = useRouter();
	const { userInfo } = useUser();
	const { step } = useProgress();

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
				<form className={styles.formWrapper}>
					{step === 2 && <StepTwo />}
					{step === 3 && <StepThree />}
					{step === 4 && <StepFour />}
					<ErrorContent />
				</form>
			</div>
		</div>
	);
}

export default function Register() {
	return (
		<UserProvider>
			<ProgressProvider initialStep={2}>
				<ProgressArea />
				<RegisterContent />
				<IconSection />
			</ProgressProvider>
		</UserProvider>
	);
}

