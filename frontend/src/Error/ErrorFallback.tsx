import { FallbackProps } from 'react-error-boundary';

const ErrorFallback = (props: FallbackProps) => {
  const { error, resetErrorBoundary } = props;
  return (
    <div>
      <p>Something went wrong!</p>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Reset page</button>
    </div>
  );
};

export default ErrorFallback;
