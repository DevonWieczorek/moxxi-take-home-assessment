'use client';

import { useState } from 'react';
import Button from "@/components/Button";
import LabeledInput from "@/components/forms/fields/LabeledInput";
import LabeledSelect from "@/components/forms/fields/LabeledSelect";
import UserContext from "@/lib/contexts/UserContext";
import ProgressContext from "@/lib/contexts/ProgressContext";
import { US_STATES } from "@/lib/forms/constants";
import type { UserInfo } from "@/lib/forms/types";

const { useUser } = UserContext;
const { useProgress } = ProgressContext;

const StepThree = () => {
	const { userInfo, setUserInfo, updateUserInfo, setError } = useUser();
	const { step, setStep } = useProgress();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleFieldChange = (field = '', value = '') => {
		// Convert zip from string to number (optional, depending on the format we use)
		const processedValue = (field === 'zip')
			? (value === '' ? undefined : Number(value))
			: value;
		setUserInfo({
			...userInfo,
			[field]: processedValue
		});
	}

	const handleSubmit = async () => {
		// Validate required fields
		if (!userInfo?.streetAddress || !userInfo?.zip || !userInfo?.city || !userInfo?.state) {
			setError('Please fill in all required fields');
			return;
		}

		setIsSubmitting(true);
		try {
			console.log('Submitting form step 3');
			// Update user info via API
			await updateUserInfo({
				streetAddress: userInfo?.streetAddress,
				zip: userInfo?.zip,
				city: userInfo?.city,
				state: userInfo?.state,
			} as Partial<UserInfo>);
			setStep(step + 1);
		} catch (error) {
			console.error('Error updating user info:', error);
			if (error instanceof Error && error.message) {
				setError(error.message);
			} else {
				setError('Failed to save your address. Please try again.');
			}
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div>
			<h1 className="header-1">
				{userInfo?.firstname ? `Keep going, ${userInfo?.firstname}!` : 'Keep going!'}
			</h1>
			<p className="header-2">
				Confirm your address to qualify.
			</p>
			<fieldset className="grid grid-cols-1 gap-2">
				<LabeledInput value={userInfo?.zip} type="text" name="zip" required={true} onChange={(e) => handleFieldChange('zip', e?.target?.value)} />
				<LabeledInput value={userInfo?.streetAddress} type="text" name="streetAddress" required={true} onChange={(e) => handleFieldChange('streetAddress', e?.target?.value)} />
				<fieldset className="grid grid-cols-2 gap-2">
					<LabeledInput value={userInfo?.city} type="text" name="city" required={true} onChange={(e) => handleFieldChange('city', e?.target?.value)} />
					<LabeledSelect
						value={userInfo?.state}
						name="state"
						label="State"
						options={US_STATES}
						required={true}
						onChange={(e) => handleFieldChange('state', e?.target?.value)}
					/>
				</fieldset>

				<Button variant="primary" type="submit" className="button-primary" onClick={handleSubmit} disabled={isSubmitting}>
					{isSubmitting ? 'Loading...' : 'Continue'}
				</Button>
			</fieldset>
		</div>
	);
};

export default StepThree;

