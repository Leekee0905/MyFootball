import { Box, Typography } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
}

const CustomScheduleTabPanel = (props: TabPanelProps) => {
  const { children, value, ...other } = props;
  console.log(value);
  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${value}`}
      aria-labelledby={`simple-tab-${value}`}
      {...other}
    >
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    </div>
  );
};

export default CustomScheduleTabPanel;
