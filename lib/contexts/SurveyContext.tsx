'use client';

import { createContext, useContext, useMemo, useState, useEffect, useCallback, type ReactNode } from "react";
import type { SurveyQuestion, SurveyAnswer } from "@/lib/survey/types";
import type { SurveyResponse } from "@/lib/api/types";

interface SurveyContextValue {
	questions: SurveyQuestion[];
	currentQuestionIndex: number;
	answers: Record<number, SurveyAnswer>;
	setCurrentQuestionIndex: (index: number) => void;
	setAnswer: (questionIndex: number, answer: SurveyAnswer) => void;
	getAnswer: (questionIndex: number) => SurveyAnswer | undefined;
	handleAnswer: (params: { questionIndex: number; value: string }) => void;
	loadQuestions: () => Promise<void>;
	isLoading: boolean;
	error: string | null;
	clearError: () => void;
}

const QUESTIONS_STORAGE_KEY = 'surveyQuestions';
const CURRENT_QUESTION_STORAGE_KEY = 'surveyCurrentQuestion';
const ANSWERS_STORAGE_KEY = 'surveyAnswers';

const SurveyContext = createContext<SurveyContextValue | undefined>(undefined);

function SurveyProvider({ children }: { children: ReactNode }) {
	const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
	const [currentQuestionIndex, setCurrentQuestionIndexState] = useState<number>(0);
	const [answers, setAnswersState] = useState<Record<number, SurveyAnswer>>({});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setErrorState] = useState<string | null>(null);

	// Load questions, current question, and answers from localStorage on mount
	useEffect(() => {
		if (typeof window !== 'undefined') {
			// Load questions
			const storedQuestions = localStorage.getItem(QUESTIONS_STORAGE_KEY);
			if (storedQuestions) {
				try {
					const parsed = JSON.parse(storedQuestions);
					setQuestions(parsed);
				} catch (err) {
					console.error('Error parsing stored questions:', err);
					localStorage.removeItem(QUESTIONS_STORAGE_KEY);
				}
			}

			// Load current question index
			const storedCurrentQuestion = localStorage.getItem(CURRENT_QUESTION_STORAGE_KEY);
			if (storedCurrentQuestion) {
				try {
					const parsed = parseInt(storedCurrentQuestion, 10);
					if (!isNaN(parsed) && parsed >= 0) {
						setCurrentQuestionIndexState(parsed);
					}
				} catch (err) {
					console.error('Error parsing stored current question:', err);
					localStorage.removeItem(CURRENT_QUESTION_STORAGE_KEY);
				}
			}

			// Load answers
			const storedAnswers = localStorage.getItem(ANSWERS_STORAGE_KEY);
			if (storedAnswers) {
				try {
					const parsed = JSON.parse(storedAnswers);
					setAnswersState(parsed);
				} catch (err) {
					console.error('Error parsing stored answers:', err);
					localStorage.removeItem(ANSWERS_STORAGE_KEY);
				}
			}
		}
	}, []);

	// Persist questions to localStorage whenever they change
	useEffect(() => {
		if (typeof window !== 'undefined' && questions.length > 0) {
			localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(questions));
		}
	}, [questions]);

	// Persist current question index to localStorage whenever it changes
	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(CURRENT_QUESTION_STORAGE_KEY, currentQuestionIndex.toString());
		}
	}, [currentQuestionIndex]);

	// Persist answers to localStorage whenever they change
	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(answers));
		}
	}, [answers]);

	const setCurrentQuestionIndex = useCallback((index: number) => {
		if (index >= 0 && index < questions.length) {
			setCurrentQuestionIndexState(index);
		}
	}, [questions.length]);

	const setAnswer = useCallback((questionIndex: number, answer: SurveyAnswer) => {
		setAnswersState((prev) => ({
			...prev,
			[questionIndex]: answer,
		}));
	}, []);

	const getAnswer = useCallback((questionIndex: number): SurveyAnswer | undefined => {
		return answers[questionIndex];
	}, [answers]);

	const handleAnswer = useCallback(({ questionIndex, value }: { questionIndex: number; value: string }) => {
		const question = questions[questionIndex];
		if (!question) return;

		const selectedAnswer = question.options.find(opt => opt.value === value);
		if (selectedAnswer) {
			setAnswer(questionIndex, selectedAnswer);
			// Move to next question if available
			if (questionIndex < questions.length - 1) {
				setCurrentQuestionIndex(questionIndex + 1);
			}
		}
	}, [questions, setAnswer, setCurrentQuestionIndex]);

	const clearError = useCallback(() => {
		setErrorState(null);
	}, []);

	const loadQuestions = useCallback(async () => {
		try {
			setIsLoading(true);
			setErrorState(null);

			const response = await fetch('/api/survey', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				const errorMessage = 'Failed to load survey questions';
				setErrorState(errorMessage);
				throw new Error(errorMessage);
			}

			const data = await response.json() as SurveyResponse;
			if (data.questions && Array.isArray(data.questions)) {
				setQuestions(data.questions);
			} else {
				throw new Error('Invalid response format');
			}
		} catch (err) {
			console.error('Error loading survey questions:', err);
			if (err instanceof Error) {
				setErrorState(err.message);
			} else {
				setErrorState('An unexpected error occurred');
			}
		} finally {
			setIsLoading(false);
		}
	}, []);

	// Automatically fetch questions on mount if not already loaded from localStorage
	useEffect(() => {
		if (questions.length === 0 && !isLoading) {
			loadQuestions();
		}
	}, [questions.length, isLoading, loadQuestions]);

	const value = useMemo(
		() => ({
			questions,
			currentQuestionIndex,
			answers,
			setCurrentQuestionIndex,
			setAnswer,
			getAnswer,
			handleAnswer,
			loadQuestions,
			isLoading,
			error,
			clearError,
		}),
		[questions, currentQuestionIndex, answers, setCurrentQuestionIndex, setAnswer, getAnswer, handleAnswer, loadQuestions, isLoading, error, clearError],
	);

	return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>;
}

function useSurvey() {
	const context = useContext(SurveyContext);

	if (!context) {
		throw new Error("useSurvey must be used within a SurveyProvider");
	}

	return context;
}

export default {
	SurveyProvider,
	useSurvey,
};

