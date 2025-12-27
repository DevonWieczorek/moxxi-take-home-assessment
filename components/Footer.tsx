import Benefits from '@/components/Benefits';
import Logo from '@/components/Logo';
import styles from '@/styles/Footer.module.css';
import { classList } from '@/lib/utils';

const Footer = () => (
	<footer className={styles.footer}>
		<div
			className={classList(['wrapper', styles.footerInner])}
		>
			<Benefits />
			<Logo />
			<div className={styles.footerLinks}>
				<a href="https://www.google.com" target="_blank">
					Terms & Conditions
				</a>
				<a href="https://www.google.com" target="_blank">
					Unsubscribe
				</a>
				<a href="https://www.google.com" target="_blank">
					Privacy Policy
				</a>
				<a href="https://www.google.com" target="_blank">
					Program Requirements
				</a>
				<a href="https://www.google.com" target="_blank">
					Do Not Sell My Info
				</a>
				<a href="https://www.google.com" target="_blank">
					Contact Us
				</a>
			</div>
			<div className="block">© Benefits Access Center, 2025</div>
		</div>
	</footer>
);

export default Footer;