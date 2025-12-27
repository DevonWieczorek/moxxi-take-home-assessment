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
		} else {
			console.log(answer);
		}
	};

	if (!surveyQuestion?.question) {
		return null;
	}

	return (
		<div className="grid grid-cols-1 gap-8">
			<div className={styles.surveyQuestion}>
				{surveyQuestion.question}
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8">
				{surveyQuestion?.options.map(option => (
					<Button
						key={option.value}
						type="button"
						variant="survey"
						onClick={() => handleClick(option.value)}
					>
						{option.label}
					</Button>
				))}
			</div>
		</div>
	);
}

export default SurveyQuestion;