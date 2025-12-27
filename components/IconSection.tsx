import Image from 'next/image';

const IconSection = () => (
	<div className="grid grid-cols-2 gap-2 max-w-[290px] mt-4 mx-auto">
		<Image
			src="/secure_and_private.svg"
			alt="Secure & Private"
			width={155}
			height={136}
		/>
		<Image
			src="/free_access.svg"
			alt="Free Access"
			width={155}
			height={136}
		/>
	</div>
);

export default IconSection;