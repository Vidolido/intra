interface ErrorMsgProps {
	msg: string;
}

const ErrorMsg = ({ msg }: ErrorMsgProps) => {
	return (
		<span className='bg-red-100 text-red-700' role='alert'>
			{msg}
		</span>
	);
};

export default ErrorMsg;
