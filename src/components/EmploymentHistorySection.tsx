// src/components/EmploymentHistorySection.tsx
"use client";
import React from 'react';
import { Box, Typography, Paper } from "@mui/material";
import { useProfile } from "@/utils/ProfileContext";
import styled from "styled-components";
import WorkIcon from '@mui/icons-material/Work';

const StyledContainer = styled(Box)`
  position: relative;
  width: 100%;
  padding-top: 10vh;
  padding-bottom: 10vh;
`;

const TimelineContainer = styled(Box)`
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 0;
  
  &::after {
    content: '';
    position: absolute;
    width: 3px;
    background: ${({ theme }) => theme.selectedProfile === 'RD'
    ? 'linear-gradient(to bottom, #673AB7, #2196F3)'
    : 'linear-gradient(to bottom, #FF9800, #FFEB3B)'};
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -1.5px;
    border-radius: 3px;
    
    @media (max-width: 960px) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled.div<{ $align: 'left' | 'right' }>`
  padding: 10px 40px;
  position: relative;
  width: 50%;
  box-sizing: border-box;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  ${({ $align }) =>
    $align === 'left' ? 'left: 0;' : 'left: 50%;'}
  
  // The connecting line from the dot to the card
  &::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 2px;
    top: 30px;
    background-color: #555;
    z-index: -1;
     ${({ $align }) => ($align === 'left' ? 'right: -25px;' : 'left: -25px;')}
  }

  @media (max-width: 960px) {
    width: 100%;
    left: 0 !important;
    padding-left: 70px;
    padding-right: 15px;

    &::after {
      left: -25px;
    }
  }
`;

const TimelineDot = styled(Box) <{ $profileType: string }>`
  content: '';
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ $profileType }) =>
    $profileType === 'RD'
      ? 'linear-gradient(45deg, #673AB7 30%, #2196F3 90%)'
      : 'linear-gradient(45deg, #FF9800 30%, #FFEB3B 90%)'};
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  border: 4px solid ${({ $profileType }) => ($profileType === 'RD' ? '#021627' : '#271700')};

  @media (max-width: 960px) {
    left: 30px;
  }
`;

const JobCard = styled(Paper)`
  padding: 25px;
  border-radius: 12px;
  background: linear-gradient(to right, #2c2c2c, #1a1a1a);
  border: 1px solid #444;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  }
`;

const employmentHistory = [
  {
    title: "Full Stack Developer | DevOps",
    company: "Else Studio, Remote",
    date: "NOVEMBER 2023 - PRESENT",
    description: [
      "Managed multiple Flutter projects, working extensively with Java Quarkus for backend development and REST API integration.",
      "Led deployment and DevOps tasks, utilizing GitHub Actions, Docker, and VPS management with SSH access to configure environments efficiently.",
      "Developed front-end solutions in Flutter for both web and Android platforms.",
      "Additionally, contributed to team management, assisted with tech lead responsibilities, and coordinated QA arrangements to ensure high software quality.",
    ],
  },
  {
    title: "Software Engineer",
    company: "AMC Group",
    date: "SEPTEMBER 2021 - OCTOBER 2023",
    description: [
      "Dedicated software engineer with 2 years experience creating impactful VBA and C# tools to enhance operations and functionality within Microsoft Office.",
      "Entrusted with problem-solving through coding to improve efficiency, reduce repetition, and mitigate errors.",
      "Successfully completed over 100 coding tasks and 90 research projects. Primary expertise in VBA.",
    ],
  },
  {
    title: "Full Stack Developer | Video Content Creator",
    company: "Freelancer",
    date: "NOVEMBER 2019 - SEPTEMBER 2021",
    description: [
      "Designed and developed 3 apps and 1 website, creating a comprehensive restaurant system with Voucher, Table Reservation, and Food Ordering features.",
      "My involvement spanned front-end, back-end, database design, and logo creation.",
      "Additionally, produced over 270 videos, cultivating YouTube to 12k subscribers and Bilibili to 24k followers.",
      "I have a gentle male voice honed for emotional voiceovers.",
    ],
  },
  {
    title: "Multimedia Designer",
    company: "AMC Group",
    date: "SEPTEMBER 2018 - SEPTEMBER 2019",
    description: [
      "Served as multimedia designer focused on UI and logo design.",
      "Role demanded meticulous attention to detail and high-quality standards which I consistently delivered.",
      "Honed skills crafting seamless, user-friendly UI design flow to enhance user experience.",
      "Also undertook extensive video editing and website design projects, further broadening creative and technical abilities.",
    ],
  },
];

// Custom hook to handle intersection observer
const useIntersectionObserver = (options: IntersectionObserverInit) => {
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, options);

    const elements = document.querySelectorAll('.timeline-item-hidden');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [options]);
};

const EmploymentHistorySection = () => {
  const { selectedProfile } = useProfile();

  // Trigger animations when items are 10% in view
  useIntersectionObserver({ root: null, rootMargin: '0px', threshold: 0.1 });

  return (
    <StyledContainer>
      <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
        Employment History
      </Typography>
      <TimelineContainer theme={{ selectedProfile }}>
        {employmentHistory.map((job, index) => (
          <TimelineItem
            key={index}
            $align={index % 2 === 0 ? 'left' : 'right'}
            className="timeline-item-hidden"
          >
            <TimelineDot $profileType={selectedProfile} />
            <JobCard elevation={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <WorkIcon sx={{ fontSize: 32, mr: 1.5, color: selectedProfile === "RD" ? '#2196F3' : '#FF9800' }} />
                <Box>
                  <Typography variant="h6" fontWeight={600} lineHeight={1.2} sx={{ color: '#fff' }}>
                    {job.title}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontStyle: 'italic', color: '#ccc' }}>
                    {job.company}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="subtitle2" sx={{ fontFamily: selectedProfile === 'RD' ? 'Cascadia Code' : 'CatCafe', color: '#aaa', mb: 2 }}>
                {job.date}
              </Typography>

              <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0, textAlign: 'left', width: '100%' }}>
                {job.description.map((desc, i) => (
                  <li key={i} style={{ marginBottom: '10px' }}>
                    <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                      {desc}
                    </Typography>
                  </li>
                ))}
              </ul>
            </JobCard>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </StyledContainer>
  );
};

export default EmploymentHistorySection;