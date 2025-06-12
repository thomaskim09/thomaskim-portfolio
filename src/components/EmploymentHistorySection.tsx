// src/components/EmploymentHistorySection.tsx
"use client";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { useProfile } from "@/utils/ProfileContext";
import styled from "styled-components";
import WorkIcon from '@mui/icons-material/Work';

const StyledContainer = styled(Box)`
  position: relative;
  width: 100%;
  padding-top: 5vh;
  padding-bottom: 5vh;
`;

const TimelineContainer = styled(Box)`
  position: relative;
  padding: 2rem 0;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background-color: #ccc;
    
    @media (max-width: 960px) {
      left: 10px;
    }
  }
`;

const TimelineItem = styled(Box) <{ $align: 'left' | 'right' }>`
  padding: 1rem 0;
  position: relative;
  width: 50%;
  ${({ $align }) =>
        $align === 'left' ? `
      left: 0;
      padding-right: 2rem;
    ` : `
      left: 50%;
      padding-left: 2rem;
    `}
  
  @media (max-width: 960px) {
    width: 100%;
    left: 0;
    padding-left: 2.5rem;
    padding-right: 1rem;
  }
`;

const TimelineDot = styled(Box) <{ $profileType: string, $align: 'left' | 'right' }>`
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ $profileType }) =>
        $profileType === 'RD'
            ? 'linear-gradient(45deg, #673AB7 30%, #2196F3 90%)'
            : 'linear-gradient(45deg, #FF9800 30%, #FFEB3B 90%)'};
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.$align === 'left' ? `right: -10px;` : `left: -10px;`)}

  @media (max-width: 960px) {
    left: 0;
  }
`;

const FlipCard = styled.div`
  background-color: transparent;
  width: 100%;
  min-height: 250px;
  perspective: 1000px;
`;

const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 250px;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;

  ${FlipCard}:hover & {
    transform: rotateY(180deg);
  }
`;

const CardSide = styled(Paper)`
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 250px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardFront = styled(CardSide)`
  background: linear-gradient(to right, #1f1e1e 0%, #4D4855 100%);
  color: white;
  padding: 1rem;
`;

const CardBack = styled(CardSide)`
  background: linear-gradient(to right, #4D4855 0%, #1f1e1e 100%);
  color: white;
  transform: rotateY(180deg);
  padding: 1.5rem;
  overflow-y: auto;
  justify-content: flex-start;
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

const EmploymentHistorySection = () => {
    const { selectedProfile } = useProfile();
    return (
        <StyledContainer>
            <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
                Employment History
            </Typography>
            <TimelineContainer>
                {employmentHistory.map((job, index) => (
                    <TimelineItem key={index} $align={index % 2 === 0 ? 'left' : 'right'}>
                        <TimelineDot $profileType={selectedProfile} $align={index % 2 === 0 ? 'left' : 'right'} />
                        <FlipCard>
                            <FlipCardInner>
                                <CardFront elevation={3}>
                                    <WorkIcon sx={{ fontSize: 40, mb: 1, color: selectedProfile === "RD" ? '#2196F3' : '#FF9800' }} />
                                    <Typography variant="h6" fontWeight={600}>
                                        {job.title}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }}>
                                        {job.company}
                                    </Typography>
                                    <Typography variant="subtitle2" color="white" sx={{ fontFamily: selectedProfile === 'RD' ? 'Cascadia Code' : 'CatCafe' }}>
                                        {job.date}
                                    </Typography>
                                </CardFront>
                                <CardBack elevation={3}>
                                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0, textAlign: 'left', width: '100%' }}>
                                        {job.description.map((desc, i) => (
                                            <li key={i} style={{ marginBottom: '8px' }}>
                                                <Typography variant="body2">
                                                    {desc}
                                                </Typography>
                                            </li>
                                        ))}
                                    </ul>
                                </CardBack>
                            </FlipCardInner>
                        </FlipCard>
                    </TimelineItem>
                ))}
            </TimelineContainer>
        </StyledContainer>
    );
};

export default EmploymentHistorySection;