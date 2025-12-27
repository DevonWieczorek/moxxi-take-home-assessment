import { createContext, useContext, useMemo, useState, type ReactNode, type Dispatch, type SetStateAction } from "react";

interface ProgressContextValue {
	step: number;
	setStep: Dispatch<SetStateAction<number>>;
	totalSteps: number;
}

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

function ProgressProvider({ children }: { children: ReactNode }) {
	const [step, setStep] = useState<number>(1);
	const totalSteps = 4;

	const value = useMemo(
		() => ({
			step,
			setStep,
			totalSteps,
		}),
		[step, setStep],
	);

	return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

function useProgress() {
	const context = useContext(ProgressContext);

	if (!context) {
		throw new Error("useProgress must be used within a ProgressProvider");
	}

	return context;
}

export default {
	ProgressProvider,
	useProgress,
};