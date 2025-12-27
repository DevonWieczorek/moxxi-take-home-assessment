'use client';

import { ReactNode, ChangeEventHandler } from 'react';

interface Option {
	label: string;
	value: string | number;
}

interface LabeledInputProps {
	name: string;
	id?: string;
	label?: string;
	options: Option[]
	onChange: ChangeEventHandler<HTMLSelectElement>;
}

const LabeledSelect = ({
	name = '',
	id,
	label,
	options = [{ value: '', label: '' }],
	onChange = () => { },
}: LabeledInputProps): ReactNode => {
	return (
		<span>
			<label htmlFor={id ?? name}>
				{label ?? name}
			</label>
			<select
				name={name}
				id={id ?? name}
				onChange={onChange}
			>
				<option value=""></option>
				{options.map(option => (
					<option key={option.value} value={option.value}>{option.label}</option>
				))}
			</select>
		</span>
	);
}

export default LabeledSelect;