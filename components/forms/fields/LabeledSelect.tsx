'use client';

import { ReactNode, ChangeEventHandler } from 'react';
import type { SelectOption } from '@/lib/forms/constants';

interface LabeledSelectProps {
	name: string;
	id?: string;
	label?: string;
	options: SelectOption[]
	onChange: ChangeEventHandler<HTMLSelectElement>;
}

const LabeledSelect = ({
	name = '',
	id,
	label,
	options = [{ value: '', label: '' }],
	onChange = () => { },
}: LabeledSelectProps): ReactNode => {
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

