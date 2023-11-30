"use client"
import { AppBar, Toolbar, Container, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useProfile } from "@/utils/ProfileContext";

const AppNavbar = () => {
  const { selectedProfile, setProfile } = useProfile();

  const handleRDClick = () => {
    setProfile('RD'); // Set RD profile
  };

  const handleADClick = () => {
    setProfile('AD'); // Set AD profile
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
            <ToggleButtonGroup exclusive>
              <ToggleButton
                value="RD"
                onClick={handleRDClick}
                sx={{
                  background: 'linear-gradient(45deg, #673AB7 30%, #2196F3 90%) !important',
                  color: selectedProfile === 'RD' ? '#fff' : 'inherit',
                  width: selectedProfile === 'RD' ? '250px' : '120px', // Adjust widths as needed
                  transition: 'width 0.3s ease-in-out',                // Smooth width transition
                  borderRadius: '50px',
                  whiteSpace: 'nowrap',                                // Prevent text from wrapping
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',                            // Show ellipsis if the text overflows
                  boxShadow: selectedProfile === 'RD' ? '0px 0px 10px 2px rgba(33, 150, 243,0.7)' : '0px 0px 10px 2px rgba(33, 150, 243,0.5)',
                }}
              >
                {selectedProfile === 'RD' ? 'Research & Develop' : 'R & D'}
              </ToggleButton>
              <ToggleButton
                value="AD"
                onClick={handleADClick}
                sx={{
                  background: 'linear-gradient(45deg, #FF9800 30%, #FFEB3B 90%) !important',
                  color: selectedProfile === 'AD' ? '#fff' : 'inherit',
                  width: selectedProfile === 'AD' ? '150px' : '120px', // Adjust widths as needed
                  transition: 'width 0.3s ease-in-out',                // Smooth width transition
                  borderRadius: '50px',
                  whiteSpace: 'nowrap',                                // Prevent text from wrapping
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',                            // Show ellipsis if the text overflows
                  boxShadow: selectedProfile === 'AD' ? '0px 0px 10px 2px  rgba(255, 152, 0,0.7)' : '0px 0px 10px 2px  rgba(255, 152, 0,0.5)',
                }}
              >
                {selectedProfile === 'AD' ? 'Art & Design' : 'A & D'}
              </ToggleButton>
            </ToggleButtonGroup>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default AppNavbar;
