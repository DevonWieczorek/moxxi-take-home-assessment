export interface SurveyAnswer {
	value: string;
	label: string;
}

export interface SurveyQuestion {
	question: string;
	options: SurveyAnswer[];
}
