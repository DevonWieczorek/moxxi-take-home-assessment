'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from "@/components/Button";
import CashImage from "@/components/CashImage";
import LabeledInput from "@/components/forms/fields/LabeledInput";
import UserContext from "@/lib/contexts/UserContext";
import ProgressContext from "@/lib/contexts/ProgressContext";

const { useUser } = UserContext;
const { useProgress } = ProgressContext;

const StepOne = () => {
	const { userInfo, setUserInfo, lookupUser, setError } = useUser();
	const { step, setStep } = useProgress();
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleEmailChange = (email = '') => {
		setUserInfo({
			...userInfo,
			email
		});
	}

	const handleSubmit = useCallback(async () => {
		const email = userInfo?.email;
		console.log('email', email)
		if (!email) {
			setError('Please enter your email address');
			return;
		}

		setIsSubmitting(true);
		try {
			console.log('Looking up user with email:', email);
			await lookupUser(email);
			setStep(step + 1);
			router.push('/register');
		} catch (error) {
			console.error('Error looking up user:', error);
			// Error is already set by lookupUser, but ensure a message is shown if not already set
			if (error instanceof Error && error.message) {
				setError(error.message);
			} else {
				setError('An error occurred while looking up your account. Please refresh and try again.');
			}
		} finally {
			setIsSubmitting(false);
		}
	}, [userInfo?.email, lookupUser, router, setError, setStep, step]);

	useEffect(() => setError('Please enter your email address'), []);

	return (
		<div>
			<div className="grid grid-cols-1 gap-2 pb-4">
				<h1 className="header-1">
					Find Your Unclaimed Money
				</h1>
				<CashImage className="mx-auto" />
				<p className="header-2 max-w-[466px] mx-auto">
					Get your free, made-for-you guide to unclaimed money, savings, and cash opportunities.
				</p>
			</div>

			<fieldset className="grid grid-cols-1 gap-4">
				<LabeledInput
					type="email"
					name="email"
					required={true}
					value={userInfo?.email}
					onChange={(e) => handleEmailChange(e?.target?.value)}
				/>
				<div className="text-legal">
					By clicking Continue, I agree to receive marketing and promotional emails from GetnGooods and our partners.&nbsp;
					I also agree to the <a href="https://gettnngooods.com/p/gg-terms" target="_blank">Terms & Conditions</a>,&nbsp;
					including mandatory arbitration, <a href="https://gettnngooods.com/p/gg-privacy-policy" target="_blank">Privacy Policy</a>&nbsp;
					and site recordation by TrustedForm and Jornaya.
				</div>
				<Button variant="primary" type="submit" className="button-primary" onClick={handleSubmit} disabled={isSubmitting}>
					{isSubmitting ? 'Loading...' : 'Get My Guide'}
				</Button>
			</fieldset>
		</div>
	);
};

export default StepOne;

