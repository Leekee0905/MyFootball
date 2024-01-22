import { Alert } from '@mui/material';

const Error429Alert = () => {
  return (
    <Alert severity="error">
      짧은 시간 내에 너무 많은 요청이 있습니다. 잠시 후에 다시 눌러주세요.
    </Alert>
  );
};

export default Error429Alert;
