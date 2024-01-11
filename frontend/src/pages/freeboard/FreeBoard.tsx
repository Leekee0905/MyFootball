import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { FreeBoardSearchType } from '../../types/freeboard';
import { useRouter } from '../../hooks/useRouter';
import { Search } from '@mui/icons-material';
const testText = [
  { title: '제목', writer: '글쓴이', time: '16:33', view: 1 },
  { title: '제목', writer: '글쓴이', time: '16:33', view: 1 },
  { title: '제목', writer: '글쓴이', time: '16:33', view: 1 },
  { title: '제목', writer: '글쓴이', time: '16:33', view: 1 },
];
const FreeBoard = ({ isHome }: { isHome?: boolean }) => {
  const { routeTo } = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { control, handleSubmit } = useForm<FreeBoardSearchType>({
    defaultValues: {
      search: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <Container
      sx={{
        marginY: '32px',
        maxHeight: '50%',
      }}
    >
      <Box
        className="table_header"
        sx={{
          minHeight: '64px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: isSmallScreen ? '16px' : '24px',
        }}
      >
        <Typography
          variant={isHome ? 'h5' : 'h3'}
          sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}
        >
          자유게시판
        </Typography>
      </Box>

      <Box
        className="freeboard_header"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box>
          <form onSubmit={onSubmit}>
            <FormControl fullWidth sx={{ marginBottom: '24px' }}>
              <Controller
                name="search"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <TextField
                      {...field}
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button>
                              <Search />
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                      placeholder="검색"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  );
                }}
              />
            </FormControl>
          </form>
        </Box>
        <Button
          sx={{
            height: '50px',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            ':hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.secondary.main,
            },
          }}
          onClick={() => routeTo('/write')}
        >
          쓰기
        </Button>
      </Box>
      <Box className="boardTable">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: '650px' }}>
            <TableHead>
              <TableRow>
                <TableCell>제목</TableCell>
                <TableCell>글쓴이</TableCell>
                <TableCell>시간</TableCell>
                <TableCell>조회수</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testText.map((e, idx) => (
                <TableRow key={idx}>
                  <TableCell>{e.title}</TableCell>
                  <TableCell>{e.writer}</TableCell>
                  <TableCell>{e.time}</TableCell>
                  <TableCell>{e.view}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box
        className="pagination"
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Pagination count={15} siblingCount={3} boundaryCount={1} />
      </Box>
    </Container>
  );
};

export default FreeBoard;
