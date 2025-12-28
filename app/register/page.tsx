'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ErrorContent from "@/components/ErrorContent";
import IconSection from "@/components/IconSection";
import ProgressArea from "@/components/ProgressArea";
import UserContext from "@/lib/contexts/UserContext";
import ProgressContext from "@/lib/contexts/ProgressContext";
import StepTwo from "@/app/register/components/StepTwo";
import StepThree from "@/app/register/components/StepThree";
import StepFour from "@/app/register/components/StepFour";
import StepTransition from "@/app/register/components/StepTransition";
import styles from "@/components/forms/styles/Form.module.css";

const { UserProvider, useUser } = UserContext;
const { ProgressProvider, useProgress } = ProgressContext;

function RegisterContent() {
	const router = useRouter();
	const { userInfo } = useUser();
	const { step } = useProgress();
	const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
	const containerRef = useRef<HTMLDivElement>(null);

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
					<div
						ref={containerRef}
						style={{
							position: 'relative',
							overflow: 'hidden',
							height: containerHeight ? `${containerHeight}px` : 'auto',
							transition: 'height 0.5s ease-in-out'
						}}
					>
						<StepTransition step={2} currentStep={step} onHeightChange={setContainerHeight}>
							<StepTwo />
						</StepTransition>
						<StepTransition step={3} currentStep={step} onHeightChange={setContainerHeight}>
							<StepThree />
						</StepTransition>
						<StepTransition step={4} currentStep={step} onHeightChange={setContainerHeight}>
							<StepFour />
						</StepTransition>
					</div>
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

