import { useState, useEffect } from 'react';
import apiInstance from '../api/apiInstance';
import { useQuery } from '@tanstack/react-query';
import { SeasonTable } from '../types/table';
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRouter } from '../hooks/useRouter';
import LoadingCircular from './LoadingCircular';

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

const league: { [league: string]: string } = {
  프리미어리그: 'PL',
  분데스리가: 'BL1',
  라리가: 'PD',
  세리에: 'SA',
  리그앙: 'FL1',
};

interface TableProps {
  tableHeader: Array<string>;
  isHome: boolean;
}

const FootballTable = ({ tableHeader, isHome }: TableProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { routeTo } = useRouter();
  const [standingsData, setStandingsData] = useState<StandingDataType[]>(
    initialStandingTableData,
  );
  const [currentTableLeagueName, setCurrentTableLeaugueName] =
    useState<string>('PL');
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['table', currentTableLeagueName],
    queryFn: () =>
      apiInstance.get(`/football/${currentTableLeagueName}/standings`),
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

  const handleTableHeaderLeaugeClick = (e: React.MouseEvent<HTMLElement>) => {
    const currentLeague = league[e.currentTarget.innerText];
    console.log(league[e.currentTarget.innerText]);
    setCurrentTableLeaugueName(currentLeague);
  };

  useEffect(() => {
    if (isSuccess) {
      extractingTeamNames(data.data.standings);

      isHome
        ? setStandingsData(
            extractingTeamNames(data.data.standings.slice(0, 10)),
          )
        : setStandingsData(extractingTeamNames(data.data.standings));
    }
  }, [data]);

  const renderLeagueButtons = () => {
    return Object.keys(league).map((leagueName, idx) => {
      const isLeagueActive = league[leagueName] === currentTableLeagueName;

      return (
        <Button
          key={idx}
          onClick={handleTableHeaderLeaugeClick}
          sx={{
            backgroundColor: isLeagueActive
              ? theme.palette.primary.main
              : 'inherit',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: isLeagueActive ? theme.palette.secondary.main : 'inherit',
            }}
          >
            {leagueName}
          </Typography>
        </Button>
      );
    });
  };

  return (
    <Container
      sx={{
        marginY: '32px',
      }}
    >
      <Paper
        sx={{
          border: isHome ? `1px solid ${theme.palette.primary.main}` : '0',
          boxShadow: 0,
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
          <Typography variant="h5" sx={{ paddingLeft: '12px' }}>
            해외축구 순위표
          </Typography>
          {isHome ? (
            <Button onClick={() => routeTo('/table')}>더보기 {'>'}</Button>
          ) : null}
        </Box>

        <Divider />
        <Box
          className="table_header_league"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingX: isHome ? '32px' : '128px',
          }}
        >
          {isSmallScreen
            ? renderLeagueButtons().slice(0, 2)
            : renderLeagueButtons()}
        </Box>

        <Divider />
        <TableContainer className="home_table_container">
          <Table aria-label="home-table" size="small">
            <TableHead>
              <TableRow>
                {tableHeader.map((e, idx) => {
                  return (
                    <TableCell sx={{ textAlign: 'center' }} key={idx}>
                      {e}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading ? (
                standingsData.map((e) => {
                  return (
                    <TableRow
                      key={e.position}
                      sx={{
                        '&:last-child td, &:last-child th': {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell sx={{ textAlign: 'center' }}>
                        {e.position}
                      </TableCell>
                      <TableCell>
                        <Box>
                          <img
                            src={e.crest}
                            style={{ maxWidth: '32px', maxHeight: '100%' }}
                            width="32px"
                            height="32px"
                            alt={e.shortName}
                            decoding="async"
                            loading="lazy"
                          ></img>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {e.shortName}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {e.playedGames}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {e.won}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {e.draw}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {e.lost}
                      </TableCell>
                      {!isHome ? (
                        <>
                          <TableCell sx={{ textAlign: 'center' }}>
                            {e.goalsFor}
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            {e.goalsAgainst}
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            {e.goalDifference}
                          </TableCell>
                        </>
                      ) : null}
                      <TableCell sx={{ textAlign: 'center' }}>
                        {e.points}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={tableHeader.length}
                    sx={{ textAlign: 'center', height: '480px' }}
                  >
                    <LoadingCircular />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default FootballTable;
