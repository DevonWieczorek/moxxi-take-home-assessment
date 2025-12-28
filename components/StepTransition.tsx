'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StepTransitionProps {
	children: ReactNode;
	step: number;
	currentStep: number;
	onHeightChange?: (height: number) => void;
}

const StepTransition = ({ children, step, currentStep, onHeightChange }: StepTransitionProps) => {
	const contentRef = useRef<HTMLDivElement>(null);
	const [wasActive, setWasActive] = useState(() => currentStep === step);
	// Capture mount-time value: was this step active when component first mounted?
	// Using useState with a function initializer ensures this is only computed once
	const [wasActiveOnMount] = useState(() => currentStep === step);

	const isActive = currentStep === step;
	// Only skip initial animation if this step was already active on the very first render
	const shouldSkipInitial = wasActiveOnMount && isActive;

	// Update wasActive when step becomes active
	// Note: setState in useEffect is necessary here to track when step becomes active
	useEffect(() => {
		if (isActive) {
			setWasActive(true);
		}
	}, [isActive]);

	// Measure and report height when step becomes active using ResizeObserver
	useEffect(() => {
		if (isActive && contentRef.current && onHeightChange) {
			const updateHeight = () => {
				if (contentRef.current) {
					const height = contentRef.current.offsetHeight || contentRef.current.scrollHeight;
					onHeightChange(height);
				}
			};

			updateHeight();

			const resizeObserver = new ResizeObserver(() => {
				updateHeight();
			});

			resizeObserver.observe(contentRef.current);

			return () => {
				resizeObserver.disconnect();
			};
		}
	}, [isActive, onHeightChange]);

	// Don't render anything if step was never active and isn't currently active
	if (!isActive && !wasActive) {
		return null;
	}

	return (
		<AnimatePresence onExitComplete={() => setWasActive(false)}>
			{isActive && (
				<motion.div
					key={step}
					ref={contentRef}
					initial={shouldSkipInitial ? false : { x: '-100%', opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: '100%', opacity: 0 }}
					transition={{ duration: 0.5, ease: 'easeInOut' }}
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
					}}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default StepTransition;

