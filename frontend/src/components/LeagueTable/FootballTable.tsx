import React, { useState, useEffect, useMemo, useCallback } from 'react';
import apiInstance from '../../api/apiInstance';
import { useQuery } from '@tanstack/react-query';
import { SeasonTable } from '../../types/table';
import {
  Box,
  Button,
  Container,
  Divider,
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
import { useRouter } from '../../hooks/useRouter';
import LoadingCircular from '../LoadingCircular';
import SeasonButton from './SeasonButton';
import { league, renderLeagueButtons } from '../RenderLeagueButton';
interface StandingDataType {
  crest: string;
  draw: number;
  form: string;
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

interface TableProps {
  tableHeader: Array<string>;
  isHome: boolean;
}

const initialStandingTableData: StandingDataType[] = [
  {
    crest: '',
    draw: 0,
    form: '',
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

const resultColor: { [result: string]: string } = {
  W: '#00db74',
  L: '#e0005e',
  D: '#c3b3c5',
};
const currentDate = new Date();
const year =
  currentDate.getMonth() < 7
    ? currentDate.getFullYear() - 1
    : currentDate.getFullYear();

const FootballTable = React.memo(({ tableHeader, isHome }: TableProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isXlScreen = useMediaQuery(theme.breakpoints.up('xl'));
  const { routeTo } = useRouter();
  const [standingsData, setStandingsData] = useState<StandingDataType[]>(
    initialStandingTableData,
  );
  const [emblem, setEmblem] = useState<string>('');

  const [season, setSeason] = useState<string>(year.toString());

  const [currentTableLeagueName, setCurrentTableLeagueName] =
    useState<string>('PL');
  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ['table', currentTableLeagueName, season],
    queryFn: () =>
      apiInstance.get(`/table/${currentTableLeagueName}/standings`, {
        params: {
          season: season,
        },
      }),
    staleTime: Infinity,
    enabled: true,
  });

  const preLoadImage = (url: string) => {
    const img = new Image();
    img.src = url;
  };

  const winDrawLoseColorConverter = useMemo(
    () => (result: string, key: number) => {
      return (
        <Box
          key={key}
          sx={{
            borderRadius: '100%',
            backgroundColor: resultColor[result],
            width: '30px',
            height: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '12px',
            overflow: 'hidden',
          }}
        >
          <Typography
            sx={{
              color: theme.palette.secondary.main,
              textAlign: 'center',
              lineHeight: '1',
            }}
          >
            {result}
          </Typography>
        </Box>
      );
    },
    [resultColor, theme.palette.secondary.main],
  );

  const extractingTeamNames = (data: SeasonTable[]): StandingDataType[] => {
    const teamData = data.map((e: SeasonTable): StandingDataType => {
      const { team, ...other } = e;
      const { crest, id, name, shortName, tla } = team;
      preLoadImage(crest);
      return { ...other, crest, id, name, shortName, tla };
    });
    return teamData;
  };

  const handleTableHeaderLeaugeClick = useCallback((leagueName: string) => {
    const currentLeague = league[leagueName];
    setCurrentTableLeagueName(currentLeague);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      preLoadImage(data.data.emblem);
      setEmblem(data.data.emblem);
      isHome
        ? setStandingsData(
            extractingTeamNames(data.data.standings.slice(0, 12)),
          )
        : setStandingsData(extractingTeamNames(data.data.standings));
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [season]);

  return (
    <Container
      sx={{
        maxWidth: '2560px',
        width: isXlScreen && !isHome ? '1440px' : null,
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
          variant="h5"
          sx={{
            paddingLeft: '12px',
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Typography
            sx={{
              fontWeight: 'inherit',
              fontSize: 'inherit',
              marginRight: '12px',
            }}
          >
            {isHome ? null : `${season} - ${Number(season) + 1}시즌`}
          </Typography>
          해외축구 순위표
        </Typography>
        {isHome ? (
          <Button onClick={() => routeTo('/table')}>
            <Typography sx={{ fontWeight: 'bold' }}>더보기 {'>'}</Typography>
          </Button>
        ) : null}
        {isHome ? null : <SeasonButton year={year} setSeason={setSeason} />}
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
          ? renderLeagueButtons({
              isHome,
              currentTableLeagueName,
              onClick: handleTableHeaderLeaugeClick,
            }).slice(0, 2)
          : renderLeagueButtons({
              isHome,
              currentTableLeagueName,
              onClick: handleTableHeaderLeaugeClick,
            })}
      </Box>
      {isHome ? null : isLoading ? (
        <Box
          sx={{
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LoadingCircular />
        </Box>
      ) : (
        <>
          <Divider />
          <Box sx={{ textAlign: 'center', padding: '1px' }}>
            <img src={emblem} alt="Emblem" />
          </Box>
        </>
      )}
      <Divider />
      <TableContainer className="home_table_container" sx={{ width: '100%' }}>
        <Table
          aria-label="home-table"
          size={isHome ? 'small' : 'medium'}
          sx={{ width: '100%' }}
        >
          <TableHead sx={{ backgroundColor: '#fbfafa' }}>
            <TableRow>
              {tableHeader.map((headerName, idx) => {
                return (
                  <TableCell
                    sx={{
                      textAlign: 'center',
                      padding: '1px',
                      fontWeight: 'bold',
                      color: theme.palette.primary.main,
                    }}
                    key={idx}
                  >
                    {headerName}
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
                    key={e.shortName}
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      {e.position}
                    </TableCell>
                    <TableCell sx={{ width: isHome ? '48px' : '76px' }}>
                      <Box sx={{ textAlign: 'center', padding: '1px' }}>
                        <img
                          src={e.crest}
                          style={{ maxWidth: '64px', maxHeight: '100%' }}
                          width={isHome ? '32px' : '64px'}
                          height={isHome ? '32px' : '64px'}
                          alt={e.shortName}
                          decoding="async"
                          loading="lazy"
                        ></img>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        maxWidth: isHome ? '100px' : '200px',
                        width: isHome ? null : '200px',
                      }}
                    >
                      <Typography
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 'bold',
                        }}
                      >
                        {isHome ? e.tla : e.name}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', padding: '1px' }}>
                      {e.playedGames}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', padding: '1px' }}>
                      {e.won}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', padding: '1px' }}>
                      {e.draw}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', padding: '1px' }}>
                      {e.lost}
                    </TableCell>
                    {!isHome ? (
                      <>
                        <TableCell sx={{ textAlign: 'center', padding: '1px' }}>
                          {e.goalsFor}
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center', padding: '1px' }}>
                          {e.goalsAgainst}
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center', padding: '1px' }}>
                          {e.goalDifference}
                        </TableCell>
                      </>
                    ) : null}
                    <TableCell sx={{ textAlign: 'center', padding: '1px' }}>
                      <Typography
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 'bold',
                        }}
                      >
                        {e.points}
                      </Typography>
                    </TableCell>
                    {!isHome ? (
                      <TableCell
                        sx={{
                          textAlign: 'center',
                          padding: '1px',
                          maxWidth: '300px',
                          width: '300px',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            textAlign: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {e.form
                            .split(',')
                            .map((e, idx) => winDrawLoseColorConverter(e, idx))}
                        </Box>
                      </TableCell>
                    ) : null}
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
    </Container>
  );
});

export default FootballTable;
