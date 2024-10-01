import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PersonalInfoForm from '../components/Tab/personal-information';

// Define styled components for Tabs and Tab
const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {

    width: '100%',
    backgroundColor: '#fff',
  },
});

// Correctly define the styled Tab component without TypeScript typings
const StyledTab = styled((props) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: 'rgba(255, 255, 255, 0.7)',
  '&.Mui-selected': {
    color: '#fff',
    backgroundColor:'#ffc03d'
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

// Main component
export default function CustomizedTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Define content for each tab
  const renderTabContent = () => {
    switch (value) {
      case 0:
        return<PersonalInfoForm/>;
      case 1:
        return <div>Education Details Content</div>;
      case 2:
        return <div>Experience Details Content</div>;
      case 3:
        return <div>National ID Content</div>;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ bgcolor: '#fff' }}>
        {/* Additional content can go here if needed */}
      </Box>
      <Box sx={{ bgcolor: '#C9D0DD' }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
          TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
        >
          <StyledTab label="Personal Information" />
          <StyledTab label="Education Details" />
          <StyledTab label="Experience Details" />
          <StyledTab label="National ID" />
        </StyledTabs>
        <Box sx={{ p: 3 }}>
          {renderTabContent()} {/* Render the content based on the selected tab */}
        </Box>
      </Box>
    </Box>
  );
}
