'use client';

import { DOB_MONTHS, DOB_DAYS, DOB_YEARS } from '@/lib/forms/constants';

interface DobFieldProps {
	handleFieldChange: (field: string, value: string) => void;
}

const DobField = ({ handleFieldChange }: DobFieldProps) => {
	return (
		<span>
			<label htmlFor="dob">
				Date of Birth
			</label>
			<fieldset id="dob" className="grid grid-cols-3 gap-2">
				<select
					name="dobMonth"
					id="dobMonth"
					onChange={(e) => handleFieldChange('dobMonth', e?.target?.value)}
				>
					<option value=""></option>
					{DOB_MONTHS.map(option => (
						<option key={option.value} value={option.value}>{option.label}</option>
					))}
				</select>
				<select
					name="dobDay"
					id="dobDay"
					onChange={(e) => handleFieldChange('dobDay', e?.target?.value)}
				>
					<option value=""></option>
					{DOB_DAYS.map(number => (
						<option key={number} value={number}>{number}</option>
					))}
				</select>
				<select
					name="dobYear"
					id="dobYear"
					onChange={(e) => handleFieldChange('dobYear', e?.target?.value)}
				>
					<option value=""></option>
					{DOB_YEARS.map(number => (
						<option key={number} value={number}>{number}</option>
					))}
				</select>
			</fieldset>
		</span>
	);
}

export default DobField;

