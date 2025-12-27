'use client';

import UserContext from "@/lib/contexts/UserContext";
import ProgressContext from "@/lib/contexts/ProgressContext";
import StepOne from "@/app/components/StepOne";
import styles from "@/components/forms/styles/Form.module.css";

const { UserProvider } = UserContext;
const { ProgressProvider } = ProgressContext;

const Form = () => {
	return (
		<UserProvider>
			<ProgressProvider>
				<form className={styles.formWrapper}>
					<StepOne />
					{/* TODO: error text */}
				</form>
			</ProgressProvider>
		</UserProvider>
	);
}

export default Form;