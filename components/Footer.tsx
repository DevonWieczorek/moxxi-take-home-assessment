import Benefits from '@/components/Benefits';
import Logo from '@/components/Logo';
import styles from './Footer.module.css';
import { classList } from '@/lib/utils';

const Footer = () => (
	<footer className={styles.footer}>
		<div
			className={classList(['wrapper', styles.footerInner])}
		>
			<Benefits />
			<Logo />
			<div className={styles.footerLinks}>
				<a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
					Terms & Conditions
				</a>
				<a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
					Unsubscribe
				</a>
				<a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
					Privacy Policy
				</a>
				<a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
					Program Requirements
				</a>
				<a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
					Do Not Sell My Info
				</a>
				<a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
					Contact Us
				</a>
			</div>
			<div className="block">© Benefits Access Center, 2025</div>
		</div>
	</footer>
);

export default Footer;