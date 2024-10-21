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
    height: '4px',  // Use a subtle line for active tab
    backgroundColor: '#ffc03d',  // A professional accent color
  },
});

const StyledTab = styled((props) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(16),
  padding: '12px 20px',  // Adding more padding for clean space
  marginRight: theme.spacing(2),
  color: '#555',  // Neutral text color for unselected tabs
  '&.Mui-selected': {
    color: '#333',  // Slightly darker for selected tab
    backgroundColor: '#fff',  // White background to stand out
    borderBottom: '2px solid #ffc03d',  // Subtle underline to highlight selected tab
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(255, 192, 61, 0.2)',
  },
}));

export default function CustomizedTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Define content for each tab
  const renderTabContent = () => {
    switch (value) {
      case 0:
        return <PersonalInfoForm />;
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
      <Box sx={{ bgcolor: '#F7F8FA', padding: '16px 0' }}> {/* Light background for better contrast */}
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
          TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
          centered  // Center-align the tabs for a balanced layout
        >
          <StyledTab label="Personal Information" />
          <StyledTab label="Education Details" />
          <StyledTab label="Experience Details" />
          <StyledTab label="National ID" />
        </StyledTabs>
        <Box sx={{ padding: '24px', backgroundColor: '#fff', borderRadius: '8px', marginTop: '16px' }}>
          {renderTabContent()} {/* Render the content based on the selected tab */}
        </Box>
      </Box>
    </Box>
  );
}
