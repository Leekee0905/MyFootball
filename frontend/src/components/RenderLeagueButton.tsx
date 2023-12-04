import LeagueButton from './LeagueTable/LeagueButton';

export const league: { [league: string]: string } = {
  프리미어리그: 'PL',
  분데스리가: 'BL1',
  라리가: 'PD',
  세리에: 'SA',
  리그앙: 'FL1',
};

interface renderLeagueButtonsType {
  isHome: boolean;
  currentTableLeagueName: string;
  onClick: (leagueName: string) => void;
}

export const renderLeagueButtons = ({
  isHome,
  currentTableLeagueName,
  onClick,
}: renderLeagueButtonsType) => {
  return Object.keys(league).map((leagueName, idx) => {
    const isLeagueActive = league[leagueName] === currentTableLeagueName;

    return (
      <LeagueButton
        key={idx}
        onClick={onClick}
        isActive={isLeagueActive}
        label={leagueName}
        isHome={isHome}
      />
    );
  });
};
