import { NextResponse } from 'next/server';
import { SURVEY_QUESTIONS } from '@/lib/survey/constants';

export async function GET() {
	try {
		// Return the survey questions from constants
		// In a real application, this would fetch from a database
		return NextResponse.json(
			{ questions: SURVEY_QUESTIONS },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error fetching survey questions:', error);

		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

