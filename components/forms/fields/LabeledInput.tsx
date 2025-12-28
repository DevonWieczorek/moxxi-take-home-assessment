'use client';

import { ReactNode, ChangeEventHandler } from 'react';

interface LabeledInputProps {
	name: string;
	type: "text" | "email" | "tel";
	id?: string;
	label?: string;
	required?: boolean;
	value?: string | number;
	onChange: ChangeEventHandler<HTMLInputElement>;
}

const LabeledInput = ({
	name = '',
	type = 'text',
	id,
	label,
	value,
	required = false,
	onChange = () => { },
}: LabeledInputProps): ReactNode => {
	const inputId = id ?? name;
	return (
		<span>
			<label htmlFor={inputId}>
				{label ?? name}
				{required && <span aria-label="required"> *</span>}
			</label>
			<input
				value={value}
				type={type}
				name={name}
				id={inputId}
				required={required}
				aria-required={required}
				onChange={onChange}
			/>
		</span>
	);
}

export default LabeledInput;

