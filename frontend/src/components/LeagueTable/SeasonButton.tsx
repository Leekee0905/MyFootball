import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material';

interface SeasonButtonsProps {
  year: number;
  setSeason: (season: string) => void;
}

const SeasonButton = ({ year, setSeason }: SeasonButtonsProps) => {
  const seasonList = Array.from(
    { length: year - 2019 },
    (_, index) => year - index,
  );

  return (
    <>
      <Box className="season_select_btn">
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
    </>
  );
};

export default SeasonButton;
