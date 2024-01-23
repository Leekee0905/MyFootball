// LeagueButton.tsx
import { Button, Typography, useTheme } from '@mui/material';

interface LeagueButtonProps {
  isActive: boolean;
  onClick: (label: string) => void;
  label: string;
  isHome: boolean;
}

const LeagueButton = ({
  isActive,
  onClick,
  label,
  isHome,
}: LeagueButtonProps) => {
  const theme = useTheme();
  return (
    <Button
      onClick={() => onClick(label)}
      sx={{
        backgroundColor: isActive ? theme.palette.primary.main : 'inherit',
        ':hover': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.secondary.main,
        },
      }}
    >
      <Typography
        variant={isHome ? 'body2' : 'h6'}
        sx={{
          color: isActive ? theme.palette.secondary.main : 'inherit',
          fontWeight: isHome ? null : 'bold',
        }}
      >
        {label}
      </Typography>
    </Button>
  );
};

export default LeagueButton;
