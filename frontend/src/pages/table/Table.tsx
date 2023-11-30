import { useState } from 'react';
import FootballTable from '../../components/LeagueTable/FootballTable';
import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
const tableHeader: Array<string> = [
  '순위',
  '',
  '클럽',
  '경기수',
  '승',
  '무',
  '패',
  '득점',
  '실점',
  '득실차',
  '승점',
  '최근 5경기',
];
const Table = () => {
  const year = new Date().getFullYear();
  const [season, setSeason] = useState<string>(year.toString());
  const seasonList = Array.from(
    { length: year - 2019 },
    (_, index) => year - index,
  );
  console.log(season);
  return (
    <>
      <Box
        className="season_select_btn"
        sx={{ justifyContent: 'center', textAlign: 'center' }}
      >
        <FormControl>
          <Select
            defaultValue={seasonList[0]}
            onChange={(event) => setSeason(event.target.value as string)}
          >
            {seasonList.map((seasons) => {
              return (
                <MenuItem key={seasons} value={seasons}>
                  <Typography>{`${seasons} - ${seasons + 1} `}</Typography>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <FootballTable isHome={false} tableHeader={tableHeader} season={season} />
    </>
  );
};

export default Table;
