import { Grid } from '@mui/material';
import HomeTable from '../../components/LeagueTable/FootballTable';
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
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ height: '100%', marginTop: 0, marginLeft: 0 }}
      >
        <Grid item xs={6} sm={6} md={6} lg={4} className="home_table_grid">
          <HomeTable tableHeader={tableHeader} isHome={true} />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={8}>
          test
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
