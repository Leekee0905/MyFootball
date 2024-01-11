import { Box, Grid, useTheme } from '@mui/material';
import FootballTable from '../../components/LeagueTable/FootballTable';
import Schedule from '../schedule/Schedule';
import FreeBoard from '../freeboard/FreeBoard';

const tableHeader: Array<string> = [
  '순위',
  '',
  '클럽',
  '경기수',
  '승',
  '무',
  '패',
  '승점',
];
const Home = () => {
  const theme = useTheme();
  return (
    <>
      <Grid container spacing={1} sx={{ height: '100%', marginY: '32px' }}>
        <Grid item xs={6} sm={4} md={4} lg={4} className="home_table_grid">
          <Box
            sx={{
              border: `1px solid ${theme.palette.primary.main}`,
              height: '100%',
              overflow: 'auto',
            }}
          >
            <FootballTable tableHeader={tableHeader} isHome={true} />
          </Box>
        </Grid>
        <Grid item xs={6} sm={8} md={8} lg={8} sx={{ overflow: 'auto' }}>
          <Box
            sx={{
              overflow: 'auto',
              height: '400px',
              border: `1px solid ${theme.palette.primary.main}`,
            }}
          >
            <Schedule isHome={true} />
          </Box>
          <Box
            sx={{
              overflow: 'auto',
              height: '400px',
              border: `1px solid ${theme.palette.primary.main}`,
            }}
          >
            <FreeBoard isHome={true} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
