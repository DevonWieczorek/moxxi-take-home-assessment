'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from "@/components/Button";
import LabeledInput from "@/components/forms/fields/LabeledInput";
import UserContext from "@/lib/contexts/UserContext";
import ProgressContext from "@/lib/contexts/ProgressContext";

const { useUser } = UserContext;
const { useProgress } = ProgressContext;

const StepOne = () => {
	const { userInfo, setUserInfo, lookupUser } = useUser();
	const { step, setStep } = useProgress();
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleEmailChange = (email = '') => {
		console.log(`Email: ${email}`);
		setUserInfo({
			...userInfo,
			email
		});
	}

	const handleSubmit = async () => {
		const email = userInfo?.email;
		if (!email) {
			// TODO: show error message
			return;
		}

		setIsSubmitting(true);
		try {
			console.log('Looking up user with email:', email);
			await lookupUser(email);
			console.log('User lookup successful, navigating to registration');
			setStep(step + 1);
			router.push('/register');
		} catch (error) {
			console.error('Error looking up user:', error);
			// TODO: show error message to user
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div>
			<div className="grid grid-cols-1 gap-2 pb-4">
				<h1 className="header-1">
					Find Your Unclaimed Money
				</h1>
				<Image
					src="/promo_cash_v2.png"
					alt="Pile of cash"
					width={297}
					height={113.335}
					className="mx-auto"
				/>
				<p className="header-2 max-w-[466px] mx-auto">
					Get your free, made-for-you guide to unclaimed money, savings, and cash opportunities.
				</p>
			</div>

			<fieldset className="grid grid-cols-1 gap-4">
				<LabeledInput type="email" name="email" onChange={(e) => handleEmailChange(e?.target?.value)} />
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

