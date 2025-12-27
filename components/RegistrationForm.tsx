'use client';

import ProgressContext from "@/lib/contexts/ProgressContext";
import StepTwo from "@/app/register/components/StepTwo";
import StepThree from "@/app/register/components/StepThree";
import styles from "@/components/forms/styles/Form.module.css";

const { useProgress } = ProgressContext;

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

