'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from "@/components/Button";
import LabeledInput from "@/components/forms/fields/LabeledInput";
import UserContext from "@/lib/contexts/UserContext";
import type { UserInfo } from "@/lib/forms/types";

const { useUser } = UserContext;

const StepFour = () => {
	const { userInfo, setUserInfo, updateUserInfo, setError } = useUser();
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleFieldChange = (field = '', value = '') => {
		setUserInfo({
			...userInfo,
			[field]: value
		});
	}

	const handleSubmit = async () => {
		// Validate required fields
		if (!userInfo?.telephone) {
			setError('Please enter your phone number');
			return;
		}

		setIsSubmitting(true);
		try {
			// Update user info via API
			await updateUserInfo({
				telephone: userInfo?.telephone,
			} as Partial<UserInfo>);
			router.push('/survey');
		} catch (error) {
			console.error('Error updating user info:', error);
			if (error instanceof Error && error.message) {
				setError(error.message);
			} else {
				setError('Failed to save your phone number. Please try again.');
			}
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div>
			<div className="grid grid-cols-1 gap-2 pb-4">
				<h1 className="header-1">
					{userInfo?.firstname ? `Last Step, ${userInfo?.firstname}!` : 'Last Step!'}
				</h1>
				<p className="header-2 max-w-[466px] mx-auto">
					Thanks! Please confirm your number
				</p>
			</div>

			<fieldset className="grid grid-cols-1 gap-4">
				<LabeledInput
					value={userInfo?.telephone}
					type="tel"
					name="telephone"
					label="Phone Number"
					required={true}
					onChange={(e) => handleFieldChange('telephone', e?.target?.value)}
				/>
				<div className="text-legal">
					By selecting “Continue”, I provide my ESIGN signature and express consent for GetnGoods, Unified Marketing Partners & its&nbsp;
					<a href="https://unified-marketingpartners.com/subsidiaries2" target="_blank">Subsidiaries</a>, SnagnGoods, USMsg, MyJobMobile, OMG Sweeps, Best Day Ever Sweepstakes, FamilyRecoveryHub, Dollar-Sensei, CheckGo,&nbsp;
					Lendli, Benefitlink, Americas Health and Grant-Navigators to contact me at the phone number I provided for marketing and transactional&nbsp;
					messages, including personal finance, benefits & sweepstakes, via text and calls, which may use automated, manual, prerecorded,&nbsp;
					or AI technology, until I revoke consent. This applies even if my number is on a &quot;Do Not Call&quot; list. Consent is not required to to use&nbsp;
					this site or obtain goods/services. Click Here to proceed without consent. I have read and agree to the <a href="https://gettnngooods.com/p/gg-terms" target="_blank">Terms & Conditions</a>, including&nbsp;
					mandatory arbitration, and for resolving disputes and TCPA claim.
				</div>
				<Button variant="primary" type="submit" className="button-primary" onClick={handleSubmit} disabled={isSubmitting}>
					{isSubmitting ? 'Loading...' : 'Continue'}
				</Button>
			</fieldset>
		</div>
	);
};

export default StepFour;

