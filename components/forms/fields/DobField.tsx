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
			<fieldset>
				<legend>Date of Birth{required && <span aria-label="required"> *</span>}</legend>
				<div className="grid grid-cols-3 gap-2" role="group">
					<label htmlFor="dobMonth" className="sr-only">
						Month
					</label>
					<select
						value={dobMonth}
						name="dobMonth"
						id="dobMonth"
						required={required}
						aria-required={required}
						aria-label="Month"
						onChange={(e) => handleFieldChange('dobMonth', e?.target?.value)}
					>
						<option value="">Month</option>
						{DOB_MONTHS.map(option => (
							<option key={option.value} value={option.value}>{option.label}</option>
						))}
					</select>
					<label htmlFor="dobDay" className="sr-only">
						Day
					</label>
					<select
						value={dobDay}
						name="dobDay"
						id="dobDay"
						required={required}
						aria-required={required}
						aria-label="Day"
						onChange={(e) => handleFieldChange('dobDay', e?.target?.value)}
					>
						<option value="">Day</option>
						{DOB_DAYS.map(number => (
							<option key={number} value={number}>{number}</option>
						))}
					</select>
					<label htmlFor="dobYear" className="sr-only">
						Year
					</label>
					<select
						value={dobYear}
						name="dobYear"
						id="dobYear"
						required={required}
						aria-required={required}
						aria-label="Year"
						onChange={(e) => handleFieldChange('dobYear', e?.target?.value)}
					>
						<option value="">Year</option>
						{DOB_YEARS.map(number => (
							<option key={number} value={number}>{number}</option>
						))}
					</select>
				</div>
			</fieldset>
		</span>
	);
}

export default DobField;

