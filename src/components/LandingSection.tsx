"use client"
import { useEffect, useState } from "react";
import { Grid, Typography, Box, Button, useTheme } from "@mui/material";
import { CSSTransition } from 'react-transition-group';
import VideoBackground from "@/components/VideoBackground";
import { useProfile } from "@/utils/ProfileContext";
import styled from 'styled-components';
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import 'animate.css/animate.min.css';

const StyledContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: 100vh; 
  background-size: cover;
  background-position: center;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const CenterAlignedContent = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const jobTitles = {
  RD: ['LLM API Integrater', 'Software Engineer', 'Full Stack Developer', 'Mobile App Developer', 'Office Plugin Developer', 'Web Developer', "DevOps", "Backend Developer", "Frontend Developer"],
  AD: ['Graphic Designer', 'UI/UX Designer', 'Video Editor', 'Web Designer', 'Video Content Creator'],
};

const LandingSection: React.FC = () => {
  const { selectedProfile } = useProfile();
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [videoKey, setVideoKey] = useState(0); // Key to trigger re-render
  const theme = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJobIndex((prevIndex) =>
        prevIndex === jobTitles[selectedProfile].length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedProfile]);

  // Update the key to trigger re-render when selectedProfile changes
  useEffect(() => {
    setVideoKey((prevKey) => prevKey + 1);
  }, [selectedProfile]);

  return (
    <>
      {selectedProfile === 'RD' ? (
        <VideoBackground videoSource='/videos/landing-RD.m4v' key={videoKey} />
      ) : (
        <VideoBackground videoSource='/videos/landing-AD.m4v' />
      )}
      <StyledContainer >
        <CenterAlignedContent container >
          {/* Text on the left */}
          <Grid item>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: selectedProfile === 'RD' ? 'Cascadia Code' : 'CatCafe', [theme.breakpoints.down('sm')]: { fontSize: '1.5rem' } }}>Hi, I am Thomas, your</Typography>
            <CSSTransition in={true} timeout={500} classNames="fade" key={jobTitles[selectedProfile][currentJobIndex]}>
              <div className="animate__animated animate__fadeIn">
                <Typography variant="h2" gutterBottom sx={{
                  fontWeight: "bold", [theme.breakpoints.down('sm')]: { fontSize: '2.5rem' }
                }}>{jobTitles[selectedProfile][currentJobIndex]}</Typography>
              </div>
            </CSSTransition>
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 4, fontFamily: selectedProfile === 'RD' ? 'Cascadia Code' : 'CatCafe', [theme.breakpoints.down('sm')]: { fontSize: '1.5rem' } }}>Let&apos;s turn your ideas into reality.</Typography>

            {/* Other text content goes here */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant="contained" startIcon={<WhatsAppIcon />}
                href="https://api.whatsapp.com/send?phone=60186625753" target="_blank" rel="noopener noreferrer"
                sx={{
                  bgcolor: "#25D366", color: "#FFFFFF", mr: 2, padding: "7px 25px", borderRadius: "10px",
                  "&:hover": { bgcolor: "#1A9247", color: "#FFFFFF" }
                }}>
                WhatsApp Me
              </Button>
            </Box>
          </Grid>
        </CenterAlignedContent>
      </StyledContainer>
    </>
  );
};

export default LandingSection;
