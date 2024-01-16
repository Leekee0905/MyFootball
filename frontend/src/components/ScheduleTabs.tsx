import { Tab, Tabs, Box, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';

interface TeamType {
  id: number;
  crest: string;
  team: string;
}

interface ScheduleTabs {
  elements: Array<TeamType | string>;
  today?: number;
  setSelectedId?: (id: number) => void;
}

const ScheduleTabs = React.memo(
  ({ elements, today, setSelectedId }: ScheduleTabs) => {
    //8월 시작 => 인덱스 0부터 시작
    const [value, setValue] = useState<number>(
      today !== undefined ? (today < 8 ? today + 4 : today - 8) : 0,
    );

    const handleChange = (e: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
      if (setSelectedId && typeof setSelectedId === 'function') {
        const selectedElement = elements[newValue];
        if (typeof selectedElement !== 'string') {
          setSelectedId(Number(selectedElement.id));
        } else {
          setSelectedId(Number(selectedElement.slice(0, -1)));
        }
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
  },
);

export default ScheduleTabs;
