import { ReactNode, MouseEventHandler } from 'react';
import styles from "./Button.module.css";

interface ButtonProps {
	variant?: string;
	type?: "button" | "submit" | "reset" | undefined;
	className?: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	children: ReactNode;
	disabled?: boolean;
}

const Button = ({
	variant = '',
	type = 'button',
	className = '',
	onClick,
	children,
	disabled = false
}: ButtonProps): ReactNode => (
	<button type={type} className={`${styles.button} ${className}`} data-variant={variant} onClick={onClick} disabled={disabled}>
		{children}
	</button>
)

export default Button;