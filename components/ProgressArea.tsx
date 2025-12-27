import Image from "next/image";
import ProgressContext from "@/lib/contexts/ProgressContext";
const { ProgressProvider, useProgress } = ProgressContext;

const ProgressArea = () => {
	const { step, totalSteps } = useProgress();



	return (
		<ProgressProvider>
			<div className="grid grid-cols-1 gap-2 pb-4">
				<h1 className="header-1">
					Find Your Unclaimed Money
				</h1>
				<Image
					src="/promo_cash_v2.png"
					alt="Pile of cash"
					width={297}
					height={113.335}
					className="mx-auto"
				/>
				<p className="header-2 max-w-[466px] mx-auto">
					Get your free, made-for-you guide to unclaimed money, savings, and cash opportunities.
				</p>
			</div>
		</ProgressProvider>
	);
};

export default ProgressArea;