'use client';

import ErrorContent from "@/components/ErrorContent";
import IconSection from "@/components/IconSection";
import Logo from "@/components/Logo";
import StepOne from "@/app/components/StepOne";
import UserContext from "@/lib/contexts/UserContext";
import ProgressContext from "@/lib/contexts/ProgressContext";
import styles from "@/components/forms/styles/Form.module.css";

const { UserProvider } = UserContext;
const { ProgressProvider } = ProgressContext;

export default function UserLookup() {
  return (
    <UserProvider>
      <ProgressProvider>
        <div className="page-wrapper bg-white rounded">
          <Logo />
          <div className="max-width-600">
            <form className={styles.formWrapper} onSubmit={(e) => e.preventDefault()}>
              <StepOne />
              <ErrorContent />
            </form>
          </div>
        </div>
        <IconSection />
      </ProgressProvider>
    </UserProvider>
  );
}
