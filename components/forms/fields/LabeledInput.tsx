'use client';

import { ReactNode, ChangeEventHandler } from 'react';

interface LabeledInputProps {
	name: string;
	type: "text" | "email";
	id?: string;
	label?: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
}

const LabeledInput = ({
	name = '',
	type = 'text',
	id,
	label,
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
				onChange={onChange}
			/>
		</span>
	);
}

export default LabeledInput;

