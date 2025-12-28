import Image from "next/image";
import styles from "./Benefits.module.css";

const items = [
	'Discover your benefits guide, created uniquely for you.',
	'Learn about benefit programs you didn’t even know existed.',
	'See real benefits you can claim today.',
];

const Benefit = ({ text = '' }: { text: string | undefined }) => {
	return (
		<div key={text} className={styles.card}>
			<div className={styles.iconBox}>
				<Image
					className={styles.check}
					src="/check.svg"
					alt="checkmark"
					width={30}
					height={24.81}
				/>
			</div>
			<p className={styles.text}>{text}</p>
		</div>
	);
}

const Benefits = () => (
	<div className={styles.wrapper}>
		{items.map(text => (
			<Benefit key={text} text={text} />
		))}
	</div>
);

export default Benefits;