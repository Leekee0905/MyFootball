import FootballTable from '../../components/LeagueTable/FootballTable';
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
  return <FootballTable isHome={false} tableHeader={tableHeader} />;
};

export default Table;
