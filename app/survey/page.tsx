'use client';

import { useState, useRef } from 'react';
import ProgressArea from "@/components/ProgressArea";
import UserContext from "@/lib/contexts/UserContext";
import ProgressContext from "@/lib/contexts/ProgressContext";
import SurveyContext from "@/lib/contexts/SurveyContext";
import StepTransition from "@/components/StepTransition";
import SurveyQuestion from './components/SurveyQuestion';
import { useRequireEmail } from '@/lib/hooks/useRequireEmail';
import surveyStyles from './components/SurveyQuestion.module.css';

const { UserProvider } = UserContext;
const { ProgressProvider } = ProgressContext;
const { SurveyProvider, useSurvey } = SurveyContext;

function SurveyContent() {
	const hasEmail = useRequireEmail();

	const {
		questions,
		currentQuestionIndex,
		handleAnswer,
		isLoading,
		answers
	} = useSurvey();
	const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
	const containerRef = useRef<HTMLDivElement>(null);

	// Don't render if no email (will redirect)
	if (!hasEmail) {
		return null;
	}

	if (isLoading) {
		return (
			<div className="w-[95%] max-w-[960px] mx-auto bg-white rounded min-h-[500px] md:min-h-[300px] pt-8 px-4">
				<div className="max-width-600">
					<p className={surveyStyles.surveyQuestion}>Loading survey questions...</p>
				</div>
			</div>
		);
	}

	// Check if all questions have been answered
	const lastQuestionIndex = questions.length - 1;
	const allQuestionsAnswered = questions.length > 0 &&
		currentQuestionIndex === lastQuestionIndex &&
		answers[lastQuestionIndex] !== undefined;

	if (questions.length === 0 || allQuestionsAnswered) {
		return (
			<div className="w-[95%] max-w-[960px] mx-auto bg-white rounded min-h-[500px] md:min-h-[300px] pt-8 px-4">
				<div className="max-width-600">
					<p className={surveyStyles.surveyQuestion}>
						Thank you for taking our survey!
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="w-[95%] max-w-[960px] mx-auto bg-white rounded min-h-[500px] md:min-h-[300px] pt-8 px-4">
			<div className="max-width-600">
				<div
					ref={containerRef}
					style={{
						position: 'relative',
						overflow: 'hidden',
						height: containerHeight ? `${containerHeight}px` : 'auto',
						transition: 'height 0.5s ease-in-out'
					}}
				>
					{questions.map((question, index) => (
						<StepTransition
							key={index}
							step={index}
							currentStep={currentQuestionIndex}
							onHeightChange={setContainerHeight}
						>
							<SurveyQuestion
								surveyQuestion={question}
								questionIndex={index}
								onAnswer={handleAnswer}
							/>
						</StepTransition>
					))}
				</div>
			</div>
		</div>
	);
}

export default function Survey() {
	return (
		<UserProvider>
			<ProgressProvider initialStep={4}>
				<SurveyProvider>
					<ProgressArea />
					<SurveyContent />
				</SurveyProvider>
			</ProgressProvider>
		</UserProvider>
	);
}

