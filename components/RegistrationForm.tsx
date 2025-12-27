'use client';

import { useState } from 'react';
import Button from "@/components/Button";
import DobField from "@/components/DobField";
import LabeledInput from "@/components/LabeledInput";
import LabeledSelect from "@/components/LabeledSelect";
import UserContext from "@/lib/contexts/UserContext";
import ProgressContext from "@/lib/contexts/ProgressContext";
import type { UserInfo } from "@/lib/types";
import styles from "@/styles/Form.module.css";

const { useUser } = UserContext;
const { useProgress } = ProgressContext;

const StepTwo = () => {
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
			// TODO: show error message to user
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
				<LabeledInput type="text" name="firstname" onChange={(e) => handleFieldChange('firstname', e?.target?.value)} />
				<LabeledInput type="text" name="lastname" onChange={(e) => handleFieldChange('lastname', e?.target?.value)} />
				<DobField handleFieldChange={handleFieldChange} />
				<LabeledSelect
					name="gender"
					label="Gender"
					options={[
						{ value: 'male', label: 'Male' },
						{ value: 'female', label: 'Female' },
						{ value: 'na', label: 'Choose not to specify' },
					]}
					onChange={(e) => handleFieldChange('gender', e?.target?.value)}
				/>

				<Button variant="primary" type="submit" className="button-primary" onClick={handleSubmit} disabled={isSubmitting}>
					{isSubmitting ? 'Loading...' : 'Continue'}
				</Button>
			</fieldset>
		</div>
	);
};

const StepThree = () => {
	const { userInfo, setUserInfo, updateUserInfo } = useUser();
	const { step, setStep } = useProgress();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const states = [
		{ value: 'AL', label: 'Alabama' },
		{ value: 'AK', label: 'Alaska' },
		{ value: 'AZ', label: 'Arizona' },
		{ value: 'AR', label: 'Arkansas' },
		{ value: 'CA', label: 'California' },
		{ value: 'CO', label: 'Colorado' },
		{ value: 'CT', label: 'Connecticut' },
		{ value: 'DE', label: 'Delaware' },
		{ value: 'FL', label: 'Florida' },
		{ value: 'GA', label: 'Georgia' },
		{ value: 'HI', label: 'Hawaii' },
		{ value: 'ID', label: 'Idaho' },
		{ value: 'IL', label: 'Illinois' },
		{ value: 'IN', label: 'Indiana' },
		{ value: 'IA', label: 'Iowa' },
		{ value: 'KS', label: 'Kansas' },
		{ value: 'KY', label: 'Kentucky' },
		{ value: 'LA', label: 'Louisiana' },
		{ value: 'ME', label: 'Maine' },
		{ value: 'MD', label: 'Maryland' },
		{ value: 'MA', label: 'Massachusetts' },
		{ value: 'MI', label: 'Michigan' },
		{ value: 'MN', label: 'Minnesota' },
		{ value: 'MS', label: 'Mississippi' },
		{ value: 'MO', label: 'Missouri' },
		{ value: 'MT', label: 'Montana' },
		{ value: 'NE', label: 'Nebraska' },
		{ value: 'NV', label: 'Nevada' },
		{ value: 'NH', label: 'New Hampshire' },
		{ value: 'NJ', label: 'New Jersey' },
		{ value: 'NM', label: 'New Mexico' },
		{ value: 'NY', label: 'New York' },
		{ value: 'NC', label: 'North Carolina' },
		{ value: 'ND', label: 'North Dakota' },
		{ value: 'OH', label: 'Ohio' },
		{ value: 'OK', label: 'Oklahoma' },
		{ value: 'OR', label: 'Oregon' },
		{ value: 'PA', label: 'Pennsylvania' },
		{ value: 'RI', label: 'Rhode Island' },
		{ value: 'SC', label: 'South Carolina' },
		{ value: 'SD', label: 'South Dakota' },
		{ value: 'TN', label: 'Tennessee' },
		{ value: 'TX', label: 'Texas' },
		{ value: 'UT', label: 'Utah' },
		{ value: 'VT', label: 'Vermont' },
		{ value: 'VA', label: 'Virginia' },
		{ value: 'WA', label: 'Washington' },
		{ value: 'WV', label: 'West Virginia' },
		{ value: 'WI', label: 'Wisconsin' },
		{ value: 'WY', label: 'Wyoming' }
	];

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
						options={states}
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

const RegistrationForm = () => {
	const { step } = useProgress();

	return (
		<form className={styles.formWrapper}>
			{step === 2 && <StepTwo />}
			{step === 3 && <StepThree />}
			{/* TODO: error text */}
		</form>
	);
}

export default RegistrationForm;

