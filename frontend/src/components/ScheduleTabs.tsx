import { Tab, Tabs, Box, Typography } from '@mui/material';
import { useState } from 'react';

interface TeamType {
  id: number;
  crest: string;
  team: string;
}

interface ScheduleTabs {
  elements: Array<string | TeamType>;
  today?: number;
  setSelectedTeamId?: (id: number) => void;
}

const ScheduleTabs = ({ elements, today, setSelectedTeamId }: ScheduleTabs) => {
  const [value, setValue] = useState<number>(
    today !== undefined ? (today < 8 ? today + 4 : today - 8) : 0,
  );

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (setSelectedTeamId && typeof setSelectedTeamId === 'function') {
      setSelectedTeamId(Number(elements[value]));
    }
  };
  return (
    <Box className="monthtabs" sx={{ maxWidth: '1150px' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        allowScrollButtonsMobile
        scrollButtons="auto"
      >
        {elements.map((e: TeamType | string, index: number) => {
          return (
            <Tab
              label={
                typeof e === 'string' ? (
                  e
                ) : (
                  <Box>
                    <img
                      src={e.crest}
                      alt={e.team}
                      width={'40px'}
                      height={'40px'}
                    />
                    <Typography>{e.team}</Typography>
                  </Box>
                )
              }
              key={index}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default ScheduleTabs;
