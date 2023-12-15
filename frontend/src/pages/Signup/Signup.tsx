import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { SignupType } from '../../types/signup';
import { Email, Lock, Person } from '@mui/icons-material';

const Signup = () => {
  const theme = useTheme();
  const { control, handleSubmit } = useForm<SignupType>({
    defaultValues: {
      id: '',
      password: '',
      passwordCheck: '',
      name: '',
      birthday: '',
      email: '',
      emailCheck: '',
      nickName: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <Container sx={{ marginY: '24px' }}>
      <Box
        sx={{
          width: '450px',
          heigth: '200px',
          marginX: 'auto',
          marginY: '15%',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            marginBottom: '24px',
          }}
        >
          회원가입
        </Typography>
        <form onSubmit={onSubmit}>
          <FormControl fullWidth sx={{ marginBottom: '24px' }}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: '이름을 입력하세요.',
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
                    placeholder="이름"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                );
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: '24px' }}>
            <Controller
              name="nickName"
              control={control}
              rules={{
                required: '닉네임을 입력하세요.',
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
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button>중복확인</Button>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="닉네임"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                );
              }}
            />
          </FormControl>
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
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button>중복확인</Button>
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
          <FormControl fullWidth sx={{ marginBottom: '24px' }}>
            <Controller
              name="password"
              control={control}
              rules={{
                required: '비밀번호를 입력하세요.',
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
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                    type="password"
                    placeholder="비밀번호"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                );
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: '24px' }}>
            <Controller
              name="passwordCheck"
              control={control}
              rules={{
                required: '비밀번호를 다시 입력하세요.',
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
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                    type="password"
                    placeholder="비밀번호 확인"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                );
              }}
            />
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: '24px' }}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: '이메일을 입력하세요.',
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
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                    type="email"
                    placeholder="이메일"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                );
              }}
            />
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: '24px' }}>
            <Controller
              name="emailCheck"
              control={control}
              rules={{
                required: '인증번호를 입력하세요.',
                minLength: 1,
              }}
              render={({ field, fieldState }) => {
                return (
                  <TextField
                    {...field}
                    variant="outlined"
                    placeholder="인증번호"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                );
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: '24px' }}>
            <Controller
              name="birthday"
              control={control}
              rules={{
                required: '생년월일 8자리를 입력하세요.',
                minLength: 8,
              }}
              render={({ field, fieldState }) => {
                return (
                  <TextField
                    {...field}
                    variant="outlined"
                    placeholder="생년월일"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                );
              }}
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: '100%', marginTop: '24px' }}
          >
            회원가입
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
