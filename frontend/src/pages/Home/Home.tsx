import { Grid } from '@mui/material';
import HomeTable from '../../components/FootballTable';

const Home = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <HomeTable />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
