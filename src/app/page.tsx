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
import EmploymentHistorySection from "@/components/EmploymentHistorySection";
import LoadingComponent from '@/components/Loading';
import BackgroundColorChanger from '@/components/BackgroundColor';
import { ProfileProvider } from '@/utils/ProfileContext';
import ScrollAnimation from '@/components/ScrollAnimation';

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans, sans-serif'
  },
});

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => clearTimeout(timeout);
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
              <ScrollAnimation animationName="fadeIn">
                <LandingSection />
              </ScrollAnimation>
              <ScrollAnimation animationName="fadeInUp">
                <AboutMeSection />
              </ScrollAnimation>
              <ScrollAnimation animationName="fadeInUp">
                <PortfolioSection />
              </ScrollAnimation>
              <ScrollAnimation animationName="fadeInUp">
                <SkillsSection />
              </ScrollAnimation>
              <ScrollAnimation animationName="fadeInUp">
                <EmploymentHistorySection />
              </ScrollAnimation>
              <ScrollAnimation animationName="fadeInUp">
                <ContactMeSection />
              </ScrollAnimation>
            </Container>
          </ThemeProvider>
        )}
      </ProfileProvider>
    </>
  );
}

export default Home;