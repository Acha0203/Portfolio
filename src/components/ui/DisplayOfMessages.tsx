interface Props {
  message: string;
  isError: boolean;
}

const DisplayOfMessages = ({ message, isError }: Props) => {
  return (
    <p
      className={`mb-3 text-sm ${isError ? 'text-red-400' : 'text-green-400'}`}
      role={isError ? 'alert' : 'status'}
    >
      {message}
    </p>
  );
};

export default DisplayOfMessages;
