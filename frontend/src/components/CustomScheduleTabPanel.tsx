import { Box } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
}

const CustomScheduleTabPanel = (props: TabPanelProps) => {
  const { children, value, ...other } = props;
  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${value}`}
      aria-labelledby={`simple-tab-${value}`}
      {...other}
    >
      <Box sx={{ p: 3 }}>{children}</Box>
    </div>
  );
};

export default CustomScheduleTabPanel;
