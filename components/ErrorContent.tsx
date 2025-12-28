'use client';

import UserContext from "@/lib/contexts/UserContext";

const { useUser } = UserContext;

const ErrorContent = () => {
	const { error } = useUser();
	if (error) {
		return (
			<div
				className="error-message text-[#d32f2f] text-sm font-normal p-3 mt-2 mb-2 bg-[#ffebee] border border-[#ef5350] rounded-[7px] text-center"
				role="alert"
				aria-live="polite"
				aria-atomic="true"
			>
				{error}
			</div>
		);
	}
	return null;
}

export default ErrorContent;