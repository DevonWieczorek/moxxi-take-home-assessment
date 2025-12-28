'use client';

import { useEffect, useState, useRef } from 'react';
import CashImage from "@/components/CashImage";
import Logo from "@/components/Logo";
import ProgressContext from "@/lib/contexts/ProgressContext";
const { useProgress } = ProgressContext;

const ANIMATION_DURATION = 500; // ms

const ProgressArea = () => {
	const { step, totalSteps } = useProgress();
	const [animatedSteps, setAnimatedSteps] = useState<Set<number>>(new Set());
	const hasAnimated = useRef(false);
	const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
	const animatedStepsRef = useRef<Set<number>>(new Set());

	useEffect(() => {
		// Clear any pending timeouts
		timeoutRefs.current.forEach(timer => clearTimeout(timer));
		timeoutRefs.current = [];

		// Small delay to ensure bars start at 0 before animating on initial render
		const initialDelay = hasAnimated.current ? 0 : 50;

		// Only animate new steps that haven't been animated yet
		setTimeout(() => {
			// Find the highest step that's already been animated
			const maxAnimatedStep = animatedStepsRef.current.size > 0
				? Math.max(...Array.from(animatedStepsRef.current))
				: 0;
			const startStep = maxAnimatedStep + 1;

			// Animate only new steps
			for (let i = startStep; i <= step; i++) {
				const stepNumber = i;
				// Calculate delay relative to the first new step
				const delay = (stepNumber - startStep) * ANIMATION_DURATION;

				const timer = setTimeout(() => {
					animatedStepsRef.current.add(stepNumber);
					setAnimatedSteps(new Set(animatedStepsRef.current));
				}, delay);

				timeoutRefs.current.push(timer);
			}
		}, initialDelay);

		hasAnimated.current = true;

		return () => {
			timeoutRefs.current.forEach(timer => clearTimeout(timer));
			timeoutRefs.current = [];
		};
	}, [step]);

	return (
		<div className="bg-white rounded-[11px] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.25)] w-[95%] max-w-[960px] mx-auto mb-4 p-4">
			<div className="grid grid-cols-1 gap-4 max-w-3/4 mx-auto">
				<Logo />
				<CashImage className="mx-auto" />
				<div className="flex gap-2" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={totalSteps} aria-label={`Progress: Step ${step} of ${totalSteps}`}>
					{Array.from({ length: totalSteps }, (_, index) => {
						const stepNumber = index + 1;
						const shouldAnimate = animatedSteps.has(stepNumber);

						return (
							<div
								key={stepNumber}
								className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"
								aria-hidden="true"
							>
								<div
									className="h-full bg-green-500 rounded-full transition-all duration-500 ease-out"
									style={{
										width: shouldAnimate ? '100%' : '0%',
										transitionDelay: '0ms'
									}}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ProgressArea;