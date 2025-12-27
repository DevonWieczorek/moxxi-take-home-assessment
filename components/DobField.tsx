const DobField = ({ handleFieldChange }: { handleFieldChange: (field: string, value: string) => void }) => {
	const dobDays = Array.from({ length: 31 }, (_, i) => i + 1);

	const dobMonths = [
		{ value: 1, label: 'January' },
		{ value: 2, label: 'February' },
		{ value: 3, label: 'March' },
		{ value: 4, label: 'April' },
		{ value: 5, label: 'May' },
		{ value: 6, label: 'June' },
		{ value: 7, label: 'July' },
		{ value: 8, label: 'August' },
		{ value: 9, label: 'September' },
		{ value: 10, label: 'October' },
		{ value: 11, label: 'November' },
		{ value: 12, label: 'December' },
	];

	const dobYears = Array.from({ length: 101 }, (_, i) => i + 1925).reverse();

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
					{dobMonths.map(option => (
						<option key={option.value} value={option.value}>{option.label}</option>
					))}
				</select>
				<select
					name="dobDay"
					id="dobDay"
					onChange={(e) => handleFieldChange('dobDay', e?.target?.value)}
				>
					<option value=""></option>
					{dobDays.map(number => (
						<option key={number} value={number}>{number}</option>
					))}
				</select>
				<select
					name="dobYear"
					id="dobYear"
					onChange={(e) => handleFieldChange('dobYear', e?.target?.value)}
				>
					<option value=""></option>
					{dobYears.map(number => (
						<option key={number} value={number}>{number}</option>
					))}
				</select>
			</fieldset>
		</span>
	);
}

export default DobField;