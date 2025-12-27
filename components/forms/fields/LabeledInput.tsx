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
	return (
		<span>
			<label htmlFor={id ?? name}>
				{label ?? name}
			</label>
			<input
				value={value}
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

