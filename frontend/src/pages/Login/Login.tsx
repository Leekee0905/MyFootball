import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  InputLabel,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { LoginData } from '../../types/login';
import { useRouter } from '../../hooks/useRouter';
import { useEffect } from 'react';

const MIN_PASSWORD_LENGTH = 13;

const Login = () => {
  const theme = useTheme();
  const { routeTo } = useRouter();
  const {
    getValues,
    setValue,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log('Form Data:', data);
  });
  const validatePassword = (password: string) => {
    // 비밀번호 유효성 검사 규칙을 적용
    if (password.length < MIN_PASSWORD_LENGTH) {
      return `비밀번호는 최소 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다.`;
    }

    // 다른 유효성 검사 규칙을 추가할 수 있습니다.

    return undefined;
  };
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <Container sx={{ marginY: '10%', textAlign: 'center' }}>
      <Typography
        variant="h3"
        sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}
      >
        MYFOOTBALL
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginX: 'auto',
          marginY: '24px',
          border: '1px solid rgba(0, 0, 0, 0.23)',
          borderRadius: '10px',
          maxWidth: '500px',
          minHeight: '250px',
        }}
      >
        <form onSubmit={onSubmit}>
          <Box>
            <FormControl fullWidth sx={{ marginBottom: '24px' }}>
              <Controller
                name="id"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    placeholder="아이디"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: true,
                  validate: (value) => validatePassword(value),
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    type="password"
                    placeholder="비밀번호"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: '100%', marginTop: '24px' }}
          >
            로그인
          </Button>
        </form>
      </Box>
      <ButtonGroup
        variant="text"
        aria-label="login signup button group"
        sx={{ justifyContent: 'space-between' }}
      >
        <Button sx={{ paddingX: '24px' }} onClick={() => routeTo('/signUp')}>
          회원가입
        </Button>
        <Button sx={{ paddingX: '24px' }}>아이디 찾기</Button>
        <Button sx={{ paddingX: '24px' }}>비밀번호 찾기</Button>
      </ButtonGroup>
    </Container>
  );
};

export default Login;
