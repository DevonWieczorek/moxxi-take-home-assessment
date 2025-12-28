import Button from "@/components/Button";
import type { SurveyQuestion } from "@/lib/survey/types";
import styles from './SurveyQuestion.module.css';

interface SurveyQuestionProps {
	surveyQuestion: SurveyQuestion;
	questionIndex: number;
	onAnswer?: (params: { questionIndex: number; value: string }) => void;
}

const SurveyQuestion = ({ surveyQuestion, questionIndex, onAnswer }: SurveyQuestionProps) => {
	const handleClick = (answer: string) => {
		if (onAnswer) {
			onAnswer({ questionIndex, value: answer });
		}
	};

	if (!surveyQuestion?.question) {
		return null;
	}

	return (
		<div className="grid grid-cols-1 gap-8">
			<h2 className={styles.surveyQuestion} id={`question-${questionIndex}`}>
				{surveyQuestion.question}
			</h2>
			<div
				className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8"
				role="group"
				aria-labelledby={`question-${questionIndex}`}
			>
				{surveyQuestion?.options.map(option => (
					<Button
						key={option.value}
						type="button"
						variant="survey"
						onClick={() => handleClick(option.value)}
						aria-label={`${surveyQuestion.question}: ${option.label}`}
					>
						{option.label}
					</Button>
				))}
			</div>
		</div>
	);
}

export default SurveyQuestion;