'use client';

import UserContext from "@/lib/contexts/UserContext";

const { useUser } = UserContext;

const ErrorContent = () => {
	const { error } = useUser();
	if (error) {
		return (
			<div 
				className="error-message" 
				role="alert"
				aria-live="polite"
				aria-atomic="true"
				style={{
					color: '#d32f2f',
					fontFamily: 'var(--font-lato, sans-serif)',
					fontSize: '14px',
					fontWeight: 400,
					padding: '12px',
					marginTop: '8px',
					marginBottom: '8px',
					backgroundColor: '#ffebee',
					border: '1px solid #ef5350',
					borderRadius: '7px',
					textAlign: 'center'
				}}>
				{error}
			</div>
		);
	}
	return null;
}

export default ErrorContent;