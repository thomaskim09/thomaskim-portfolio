"use client"
import React, { useEffect, useState } from 'react';
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppNavBar from "@/components/AppBar";
import LandingSection from "@/components/LandingSection";
import AboutMeSection from "@/components/AboutMeSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactMeSection from "@/components/ContactMeSection";
import SkillsSection from "@/components/SkillsSection";
import LoadingComponent from '@/components/Loading';
import BackgroundColorChanger from '@/components/BackgroundColor';
import { ProfileProvider } from '@/utils/ProfileContext';

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans, sans-serif'
  },
});

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating content loading with a timeout
    const timeout = setTimeout(() => {
      setLoading(false); // Set loading to false after content is loaded
    }, 0);

    return () => clearTimeout(timeout); // Cleanup timer on unmount (optional)
  }, []);

  return (
    <>
      <ProfileProvider >
        {loading ? (
          <LoadingComponent />
        ) : (
          <ThemeProvider theme={theme}>
            <BackgroundColorChanger />
            <AppNavBar />
            <Container maxWidth="lg">
              <LandingSection />
              <AboutMeSection />
              <PortfolioSection />
              <SkillsSection />
              <ContactMeSection />
            </Container>
          </ThemeProvider>
        )}
      </ProfileProvider>
    </>
  );
}

export default Home;