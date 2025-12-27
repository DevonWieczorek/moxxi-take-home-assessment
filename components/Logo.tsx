import Image from "next/image";

const Logo = ({
	className = "mx-auto",
	alt = "Benefits Access Center",
	width = 227.46,
	height = 31.81
}) => (
	<Image
		className={className}
		src="/logo.svg"
		alt={alt}
		width={width}
		height={height}
		priority
	/>
);

export default Logo;