'use client';

import { ReactNode, ChangeEventHandler } from 'react';

interface LabeledInputProps {
	name: string;
	type: "text" | "email";
	id?: string;
	label?: string;
	required?: boolean;
	onChange: ChangeEventHandler<HTMLInputElement>;
}

const LabeledInput = ({
	name = '',
	type = 'text',
	id,
	label,
	required = false,
	onChange = () => { },
}: LabeledInputProps): ReactNode => {
	return (
		<span>
			<label htmlFor={id ?? name}>
				{label ?? name}
			</label>
			<input
				type={type}
				name={name}
				id={id ?? name}
				required={required}
				onChange={onChange}
			/>
		</span>
	);
}

export default LabeledInput;

