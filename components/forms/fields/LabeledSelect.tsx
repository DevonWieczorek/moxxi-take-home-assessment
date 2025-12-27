'use client';

import { ReactNode, ChangeEventHandler } from 'react';
import type { SelectOption } from '@/lib/forms/constants';

interface LabeledSelectProps {
	name: string;
	id?: string;
	label?: string;
	options: SelectOption[]
	required?: boolean;
	value?: string | number;
	onChange: ChangeEventHandler<HTMLSelectElement>;
}

const LabeledSelect = ({
	name = '',
	id,
	label,
	value,
	options = [{ value: '', label: '' }],
	required = false,
	onChange = () => { },
}: LabeledSelectProps): ReactNode => {
	return (
		<span>
			<label htmlFor={id ?? name}>
				{label ?? name}
			</label>
			<select
				value={value}
				name={name}
				id={id ?? name}
				required={required}
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

