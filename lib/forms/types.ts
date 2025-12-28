export interface UserInfo {
	email: string;
	firstname: string;
	lastname: string;
	dobDay: number;
	dobMonth: number;
	dobYear: number;
	gender: 'male' | 'female' | 'na';
	streetAddress: string;
	zip: number;
	city: string;
	state: string;
	telephone: string;
}

