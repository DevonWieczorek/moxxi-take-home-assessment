import Image from 'next/image';

const CashImage = ({ className = "" }) => (
	<Image
		src="/promo_cash_v2.png"
		alt="Pile of cash"
		width={297}
		height={113.335}
		className={className}
	/>
);

export default CashImage;