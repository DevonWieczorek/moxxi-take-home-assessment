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
	const { userInfo, setUserInfo, updateUserInfo } = useUser();
	const { step, setStep } = useProgress();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleFieldChange = (field = '', value = '') => {
		console.log(`${field}: ${value}`);
		setUserInfo({
			...userInfo,
			[field]: value
		});
	}

	const handleSubmit = async () => {
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
			// TODO: show error message to user
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
			<fieldset>
				<LabeledInput type="text" name="zip" onChange={(e) => handleFieldChange('zip', e?.target?.value)} />
				<LabeledInput type="text" name="streetAddress" onChange={(e) => handleFieldChange('streetAddress', e?.target?.value)} />
				<fieldset className="grid grid-cols-2 gap-2">
					<LabeledInput type="text" name="city" onChange={(e) => handleFieldChange('city', e?.target?.value)} />
					<LabeledSelect
						name="state"
						label="State"
						options={US_STATES}
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

