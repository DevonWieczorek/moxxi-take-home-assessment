import UserContext from "@/lib/contexts/UserContext";

const { useUser } = UserContext;

const ErrorContent = () => {
	const { error } = useUser();
	if (error) {
		return (<div className="error"></div>);
	}
	return null;
}

export default ErrorContent;