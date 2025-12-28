import type { UserInfo } from '@/lib/forms/types';
import type { SurveyQuestion } from '@/lib/survey/types';

// API Request Types
export interface CreateUserRequest {
	email: string;
}

export interface UpdateUserRequest extends Partial<UserInfo> {
	email: string; // email is required for updates
}

// API Response Types
export interface CreateUserResponse {
	user: Partial<UserInfo>;
	exists: boolean;
}

export interface UpdateUserResponse {
	user: Partial<UserInfo>;
}

export interface SurveyResponse {
	questions: SurveyQuestion[];
}

export interface ApiErrorResponse {
	error: string;
}

