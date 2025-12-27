import { useState } from 'react';
import UserContext from "@/lib/contexts/UserContext";
import ProgressContext from "@/lib/contexts/ProgressContext";
import type { UserInfo } from "../types";

const { useUser } = UserContext;
const { useProgress } = ProgressContext;

/**
 * Custom hook for form step logic
 * Provides common functionality for form steps including field changes and submission
 */
export const useFormStep = () => {
	const { userInfo, setUserInfo, updateUserInfo } = useUser();
	const { step, setStep } = useProgress();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleFieldChange = (field: string, value: string | number) => {
		console.log(`${field}: ${value}`);
		setUserInfo({
			...userInfo,
			[field]: value
		});
	};

	const submitStep = async (fields: Partial<UserInfo>) => {
		setIsSubmitting(true);
		try {
			await updateUserInfo(fields);
			setStep(step + 1);
		} catch (error) {
			console.error('Error updating user info:', error);
			throw error; // Re-throw so components can handle errors
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		userInfo,
		step,
		isSubmitting,
		handleFieldChange,
		submitStep,
	};
};

