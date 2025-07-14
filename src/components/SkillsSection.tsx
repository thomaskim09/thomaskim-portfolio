import { Box, Typography } from '@mui/material';
import Image from "next/image";
import styled, { keyframes } from 'styled-components';
import { useProfile } from '@/utils/ProfileContext';

// Keyframes for the infinite scroll animation
const scrollAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

// Main container for the whole section
const StyledContainer = styled(Box)`
  width: 100%;
  padding: 10vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden; // Hide horizontal overflow
`;

// Wrapper for the scrolling ticker
const TickerWrapper = styled.div`
  width: 100%;
  padding: 2rem 0;
  background: rgba(255, 255, 255, 0.05);
  -webkit-mask-image: linear-gradient(to right, transparent, #fff 10%, #fff 90%, transparent);
  mask-image: linear-gradient(to right, transparent, #fff 10%, #fff 90%, transparent);
`;

// The scrolling track that contains the logos
const TickerTrack = styled.div`
  display: flex;
  width: fit-content;
  animation: ${scrollAnimation} 40s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

// Individual logo item
const SkillLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin: 0 20px;
  width: 150px;
  height: 120px;
  flex-shrink: 0;
  transition: all 0.3s ease;

  img {
    filter: grayscale(100%) opacity(0.7);
    transition: all 0.3s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
    img {
      filter: grayscale(0%) opacity(1);
    }
  }
`;

// --- Skill Data using your original images ---
interface LogoItem {
  imageUrl: string;
  alt: string;
}

const skills: { [key: string]: LogoItem[] } = {
  RD: [
    { imageUrl: '/images/RDS_1.png', alt: 'Next.js' },
    { imageUrl: '/images/RDS_3.png', alt: 'React.js' },
    { imageUrl: '/images/RDS_2.png', alt: 'Node.js' },
    { imageUrl: '/images/RDS_8.png', alt: 'Express.js' },
    { imageUrl: '/images/Java.png', alt: 'Java' },
    { imageUrl: '/images/RDS_5.png', alt: 'Flutter' },
    { imageUrl: '/images/RDS_6.png', alt: 'MongoDB' },
    { imageUrl: '/images/RDS_4.png', alt: 'MySQL' },
    { imageUrl: '/images/RDS_7.png', alt: 'VBA' },
    { imageUrl: '/images/RDS_9.png', alt: 'Docker' },
    { imageUrl: '/images/GithubAction.png', alt: 'GitHub Actions' },
    { imageUrl: '/images/Linux.png', alt: 'Linux' },
    { imageUrl: '/images/RDS_11.png', alt: 'HTML5' },
    { imageUrl: '/images/RDS_12.png', alt: 'CSS3' },
  ],
  AD: [
    { imageUrl: '/images/ADS_1.png', alt: 'Adobe Photoshop' },
    { imageUrl: '/images/ADS_5.png', alt: 'Adobe Illustrator' },
    { imageUrl: '/images/ADS_4.png', alt: 'Adobe Premiere Pro' },
    { imageUrl: '/images/ADS_6.png', alt: 'Adobe XD' },
    { imageUrl: '/images/ADS_2.png', alt: 'Figma' },
    { imageUrl: '/images/ADS_7.png', alt: 'UI/UX Design' },
    { imageUrl: '/images/ADS_3.png', alt: 'Brand Design' },
  ]
};

const SkillsSection: React.FC = () => {
  const { selectedProfile } = useProfile();
  const currentSkills = skills[selectedProfile];

  // Duplicate the logos to create a seamless loop
  const duplicatedSkills = [...currentSkills, ...currentSkills];

  return (
    <StyledContainer>
      <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
        Technologies & Tools
      </Typography>
      <Typography variant="body1" align="center" gutterBottom sx={{ mb: 4, px: 2, fontFamily: selectedProfile === 'RD' ? 'Cascadia Code' : 'CatCafe' }}>
        Here are some of the key technologies and creative tools I work with.
      </Typography>

      <TickerWrapper>
        <TickerTrack>
          {duplicatedSkills.map((item, index) => (
            <SkillLogo key={index}>
              <Image src={item.imageUrl} alt={item.alt} width={80} height={80} style={{ objectFit: 'contain' }} />
            </SkillLogo>
          ))}
        </TickerTrack>
      </TickerWrapper>
    </StyledContainer>
  );
};

export default SkillsSection;