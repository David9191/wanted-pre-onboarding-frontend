import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const OccurError = () => {
  const error = useRouteError();
  let errorMessage: string = '';

  if (isRouteErrorResponse(error)) {
    errorMessage = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = '알 수 없는 에러!';
  }

  return (
    <div>
      <h1>앗 이런!</h1>
      <p>죄송합니다, 예기치 못한 에러가 발생했습니다!</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
};

export default OccurError;
