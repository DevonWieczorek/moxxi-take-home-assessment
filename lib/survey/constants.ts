import type { SurveyQuestion } from "./types";

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
	{
		question: 'Welcome back! Are you feeling lucky today?',
		options: [
			{ value: 'yes', label: 'Yes' },
			{ value: 'no', label: 'No' },
		],
	},
	{
		question: 'Are you enjoying yourself so far?',
		options: [
			{ value: 'yes', label: 'Yes' },
			{ value: 'no', label: 'No' },
		],
	},
	{
		question: 'So, did Devon get the job?',
		options: [
			{ value: 'yes', label: 'Yes' },
			{ value: 'absolutely', label: 'Absolutely, yes!' },
		],
	},
];