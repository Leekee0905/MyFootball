import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { LoginData } from '../../types/login';
import { useRouter } from '../../hooks/useRouter';
import { Lock, Person } from '@mui/icons-material';
import apiInstance from '../../api/apiInstance';

const Login = () => {
  const theme = useTheme();
  const { routeTo } = useRouter();
  const { control, handleSubmit } = useForm<LoginData>({
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const handleLogin = async (data: LoginData) => {
    try {
      const response = await apiInstance.post('/auth/login', data);
      if (response.data.status === 'success') {
        routeTo('/');
      }
      console.log(response.data);
    } catch (error: any) {
      console.error('error', error);
      alert(`${error.response.data.message}`);
    }
  };
  const onSubmit = handleSubmit((data) => {
    handleLogin(data);
  });

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
          maxWidth: '600px',
          minHeight: '300px',
        }}
      >
        <form onSubmit={onSubmit}>
          <Box>
            <FormControl fullWidth sx={{ marginBottom: '24px' }}>
              <Controller
                name="id"
                control={control}
                rules={{
                  required: '아이디를 입력하세요.',
                  minLength: 1,
                }}
                render={({ field, fieldState }) => {
                  return (
                    <TextField
                      {...field}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        ),
                      }}
                      placeholder="아이디"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  );
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: '비밀번호를 입력하세요.',
                }}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <TextField
                      {...field}
                      variant="outlined"
                      type="password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock />
                          </InputAdornment>
                        ),
                      }}
                      placeholder="비밀번호"
                      error={!!error}
                      helperText={error?.message}
                    />
                  );
                }}
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
