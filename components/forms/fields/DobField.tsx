'use client';

import { DOB_MONTHS, DOB_DAYS, DOB_YEARS } from '@/lib/forms/constants';

interface DobFieldProps {
	handleFieldChange: (field: string, value: string) => void;
	required?: boolean;
	dobMonth?: number;
	dobDay?: number;
	dobYear?: number;
}

const DobField = ({
	handleFieldChange,
	required = false,
	dobDay,
	dobMonth,
	dobYear
}: DobFieldProps) => {
	return (
		<span>
			<label htmlFor="dob">
				Date of Birth
			</label>
			<fieldset id="dob" className="grid grid-cols-3 gap-2">
				<select
					value={dobMonth}
					name="dobMonth"
					id="dobMonth"
					required={required}
					onChange={(e) => handleFieldChange('dobMonth', e?.target?.value)}
				>
					<option value=""></option>
					{DOB_MONTHS.map(option => (
						<option key={option.value} value={option.value}>{option.label}</option>
					))}
				</select>
				<select
					value={dobDay}
					name="dobDay"
					id="dobDay"
					required={required}
					onChange={(e) => handleFieldChange('dobDay', e?.target?.value)}
				>
					<option value=""></option>
					{DOB_DAYS.map(number => (
						<option key={number} value={number}>{number}</option>
					))}
				</select>
				<select
					value={dobYear}
					name="dobYear"
					id="dobYear"
					required={required}
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

