"use client"
import { useState, useEffect } from "react";
import { AppBar, Toolbar, Container, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useProfile } from "@/utils/ProfileContext";

const AppNavbar = () => {
  const { selectedProfile, setProfile } = useProfile();
  const [showFullText, setShowFullText] = useState(true);

  useEffect(() => {
    setShowFullText(true);

    const timer = setTimeout(() => {
      setShowFullText(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [selectedProfile]);


  const handleRDClick = () => {
    setProfile('RD');
  };

  const handleADClick = () => {
    setProfile('AD');
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
            <ToggleButtonGroup exclusive value={selectedProfile}>
              <ToggleButton
                value="RD"
                onClick={handleRDClick}
                sx={{
                  fontFamily: 'Cascadia Code',
                  fontWeight: selectedProfile === 'RD' ? 'bold' : 'normal',
                  color: '#fff !important',
                  background: 'linear-gradient(45deg, #673AB7 30%, #2196F3 90%) !important',
                  width: selectedProfile === 'RD' && showFullText ? '250px' : '120px',
                  transition: 'width 0.5s ease-in-out, font-weight 0.3s ease-in-out',
                  borderRadius: '50px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  boxShadow: selectedProfile === 'RD' ? '0px 0px 10px 2px rgba(33, 150, 243,0.7)' : '0px 0px 10px 2px rgba(33, 150, 243,0.5)',
                }}
              >
                {(selectedProfile === 'RD' && showFullText) ? 'Research & Develop' : 'R & D'}
              </ToggleButton>
              <ToggleButton
                value="AD"
                onClick={handleADClick}
                sx={{
                  fontFamily: 'CatCafe',
                  fontWeight: selectedProfile === 'AD' ? 'bold' : 'normal',
                  color: '#fff !important',
                  background: 'linear-gradient(45deg, #FF9800 30%, #FFEB3B 90%) !important',
                  width: selectedProfile === 'AD' && showFullText ? '150px' : '120px',
                  transition: 'width 0.5s ease-in-out, font-weight 0.3s ease-in-out',
                  borderRadius: '50px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  boxShadow: selectedProfile === 'AD' ? '0px 0px 10px 2px  rgba(255, 152, 0,0.7)' : '0px 0px 10px 2px  rgba(255, 152, 0,0.5)',
                }}
              >
                {(selectedProfile === 'AD' && showFullText) ? 'Art & Design' : 'A & D'}
              </ToggleButton>
            </ToggleButtonGroup>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default AppNavbar;