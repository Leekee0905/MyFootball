import { useState, useEffect } from 'react';
import apiInstance from '../api/apiInstance';
import { useQuery } from '@tanstack/react-query';
import { SeasonTable, TableType } from '../types/table';
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

interface StandingDataType {
  crest: string;
  draw: number;
  form: string | null;
  goalDifference: number;
  goalsAgainst: number;
  goalsFor: number;
  id: number;
  lost: number;
  name: string;
  playedGames: number;
  points: number;
  position: number;
  shortName: string;
  tla: string;
  won: number;
}

const initialTableState: TableType = {
  currentMatchDay: 0,
  emblem: '',
  leagueid: 0,
  leagueName: '',
  season: '',
  standings: [],
};

const initialStandingTableData: StandingDataType[] = [
  {
    crest: '',
    draw: 0,
    form: null,
    goalDifference: 0,
    goalsAgainst: 0,
    goalsFor: 0,
    id: 0,
    lost: 0,
    name: '',
    playedGames: 0,
    points: 0,
    position: 0,
    shortName: '',
    tla: '',
    won: 0,
  },
];

const tableHeader = ['순위', '', '클럽', '경기수', '승', '무', '패', '승점'];

const HomeTable = () => {
  const [responseData, setResponseData] =
    useState<TableType>(initialTableState);
  const [standingsData, setStandingsData] = useState<StandingDataType[]>(
    initialStandingTableData,
  );
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['table'],
    queryFn: () => apiInstance.get('/football/epl-standings'),
    staleTime: Infinity,
    enabled: true,
  });

  const extractingTeamNames = (data: SeasonTable[]): StandingDataType[] => {
    const teamData = data.map((e: SeasonTable): StandingDataType => {
      const { team, ...other } = e;
      const { crest, id, name, shortName, tla } = team;
      return { ...other, crest, id, name, shortName, tla };
    });
    return teamData;
  };

  useEffect(() => {
    if (isSuccess) {
      setResponseData(data.data);
      extractingTeamNames(data.data.standings);
      setStandingsData(extractingTeamNames(data.data.standings));
    }
  }, [data]);

  return !isLoading ? (
    <Container>
      <Paper>
        <Typography>프리미어리그</Typography>
        <TableContainer sx={{ maxHeight: '100%' }}>
          <Table aria-label="home-table" size="small">
            <TableHead>
              <TableRow>
                {tableHeader.map((e, idx) => {
                  return <TableCell key={idx}>{e}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {standingsData.map((e) => {
                return (
                  <TableRow
                    key={e.position}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{e.position}</TableCell>
                    <TableCell>
                      <Box>
                        <img
                          src={e.crest}
                          style={{ maxWidth: '32px', maxHeight: '32px' }}
                        ></img>
                      </Box>
                    </TableCell>
                    <TableCell>{e.shortName}</TableCell>
                    <TableCell>{e.playedGames}</TableCell>
                    <TableCell>{e.won}</TableCell>
                    <TableCell>{e.draw}</TableCell>
                    <TableCell>{e.lost}</TableCell>
                    <TableCell>{e.points}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  ) : null;
};

export default HomeTable;
