'use client';

import { useState } from 'react';
import Button from "@/components/Button";
import DobField from "@/components/forms/fields/DobField";
import LabeledInput from "@/components/forms/fields/LabeledInput";
import LabeledSelect from "@/components/forms/fields/LabeledSelect";
import UserContext from "@/lib/contexts/UserContext";
import ProgressContext from "@/lib/contexts/ProgressContext";
import { GENDER_OPTIONS } from "@/lib/forms/constants";
import type { UserInfo } from "@/lib/forms/types";

const { useUser } = UserContext;
const { useProgress } = ProgressContext;

const StepTwo = () => {
	const { userInfo, setUserInfo, updateUserInfo, setError } = useUser();
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
		// Validate required fields
		if (!userInfo?.firstname || !userInfo?.lastname || !userInfo?.dobDay || !userInfo?.dobMonth || !userInfo?.dobYear || !userInfo?.gender) {
			setError('Please fill in all required fields');
			return;
		}

		setIsSubmitting(true);
		try {
			console.log('Submitting form step 2');
			// Update user info via API
			await updateUserInfo({
				firstname: userInfo?.firstname,
				lastname: userInfo?.lastname,
				dobDay: userInfo?.dobDay,
				dobMonth: userInfo?.dobMonth,
				dobYear: userInfo?.dobYear,
				gender: userInfo?.gender,
			} as Partial<UserInfo>);
			setStep(step + 1);
		} catch (error) {
			console.error('Error updating user info:', error);
			if (error instanceof Error && error.message) {
				setError(error.message);
			} else {
				setError('Failed to save your information. Please try again.');
			}
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div>
			<h1 className="header-1">
				Welcome!
			</h1>
			<p className="header-2">
				Now we just need the basics.
			</p>
			<fieldset className="grid grid-cols-1 gap-2">
				<LabeledInput value={userInfo?.firstname} type="text" name="firstname" required={true} onChange={(e) => handleFieldChange('firstname', e?.target?.value)} />
				<LabeledInput value={userInfo?.lastname} type="text" name="lastname" required={true} onChange={(e) => handleFieldChange('lastname', e?.target?.value)} />
				<DobField
					dobDay={userInfo?.dobDay}
					dobMonth={userInfo?.dobMonth}
					dobYear={userInfo?.dobYear}
					handleFieldChange={handleFieldChange}
					required={true}
				/>
				<LabeledSelect
					value={userInfo?.gender}
					name="gender"
					label="Gender"
					options={GENDER_OPTIONS}
					required={true}
					onChange={(e) => handleFieldChange('gender', e?.target?.value)}
				/>

				<Button variant="primary" type="submit" className="button-primary" onClick={handleSubmit} disabled={isSubmitting}>
					{isSubmitting ? 'Loading...' : 'Continue'}
				</Button>
			</fieldset>
		</div>
	);
};

export default StepTwo;

