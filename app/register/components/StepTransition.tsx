'use client';

import { useEffect, useState, useRef, type ReactNode } from 'react';
import styles from './StepTransition.module.css';

interface StepTransitionProps {
	children: ReactNode;
	step: number;
	currentStep: number;
	onHeightChange?: (height: number) => void;
}

const StepTransition = ({ children, step, currentStep, onHeightChange }: StepTransitionProps) => {
	const isInitialMount = useRef(true);
	const wasActive = useRef(currentStep === step);
	const [display, setDisplay] = useState(currentStep === step);
	const [isExiting, setIsExiting] = useState(false);
	const [isEntering, setIsEntering] = useState(false);
	const [skipTransition, setSkipTransition] = useState(currentStep === step);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const enterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Clear any pending timeouts
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		if (enterTimeoutRef.current) {
			clearTimeout(enterTimeoutRef.current);
		}

		const isBecomingActive = currentStep === step && !wasActive.current;
		const isBecomingInactive = wasActive.current && currentStep !== step;

		if (isBecomingActive) {
			// Step is becoming active - use setTimeout to avoid synchronous setState
			setTimeout(() => {
				setDisplay(true);

				// Skip animation on initial mount to avoid jankiness
				if (isInitialMount.current) {
					// On initial load, skip the enter animation
					isInitialMount.current = false;
					setSkipTransition(true);
				} else {
					setSkipTransition(false);
					// Start in enter position (off-screen left), then trigger enter animation
					setIsEntering(true);
					// Use requestAnimationFrame to ensure DOM is ready before triggering animation
					enterTimeoutRef.current = setTimeout(() => {
						requestAnimationFrame(() => {
							setIsEntering(false);
						});
					}, 16); // ~1 frame delay
				}
			}, 0);
		} else if (isBecomingInactive && display) {
			// Step is becoming inactive - start exit animation
			setTimeout(() => {
				setIsExiting(true);
				setIsEntering(false);
				setSkipTransition(false);
				isInitialMount.current = false; // Mark that we've had a transition
				// Remove from DOM after animation completes
				timeoutRef.current = setTimeout(() => {
					setDisplay(false);
					setIsExiting(false);
				}, 500); // Match CSS transition duration
			}, 0);
		}

		wasActive.current = currentStep === step;
	}, [currentStep, step, display]);

	// Measure and report height when step becomes active using ResizeObserver
	useEffect(() => {
		if (currentStep === step && display && contentRef.current && onHeightChange) {
			const updateHeight = () => {
				if (contentRef.current) {
					// Use offsetHeight for more accurate measurement including padding
					const height = contentRef.current.offsetHeight || contentRef.current.scrollHeight;
					onHeightChange(height);
				}
			};

			// Initial measurement
			updateHeight();

			// Use ResizeObserver to track size changes
			const resizeObserver = new ResizeObserver(() => {
				updateHeight();
			});

			resizeObserver.observe(contentRef.current);

			return () => {
				resizeObserver.disconnect();
			};
		}
	}, [currentStep, step, display, onHeightChange]);

	if (!display) {
		return null;
	}

	// Determine the appropriate class based on state
	let stepClass = '';

	if (isExiting) {
		stepClass = styles.stepExitActive;
	} else if (isEntering) {
		stepClass = styles.stepEnter;
	} else if (currentStep === step) {
		stepClass = styles.stepEnterActive;
	}

	const className = [
		styles.step,
		stepClass,
		skipTransition ? styles.stepNoTransition : '',
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div ref={contentRef} className={className}>
			{children}
		</div>
	);
};

export default StepTransition;

