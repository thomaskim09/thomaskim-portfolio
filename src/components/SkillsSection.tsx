import { Box, Typography } from '@mui/material';
import Image from "next/image";
import styled from 'styled-components';
import { useProfile } from '@/utils/ProfileContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// --- Styled Components ---
const StyledContainer = styled(Box)`
  width: 100%;
  padding: 10vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const SwiperWrapper = styled.div`
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  
  .swiper-pagination-bullet-active {
    background-color: ${({ theme }) => (theme.selectedProfile === 'RD' ? '#2196F3' : '#FF9800')};
  }
`;

const SkillLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  width: 150px;
  height: 120px;
  transition: all 0.3s ease;
  margin: 0 auto;

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

// --- Skill Data ---
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

  return (
    <StyledContainer>
      <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
        Technologies & Tools
      </Typography>
      <Typography variant="body1" align="center" gutterBottom sx={{ mb: 1, px: 2, fontFamily: selectedProfile === 'RD' ? 'Cascadia Code' : 'CatCafe' }}>
        Here are some of the key technologies and creative tools I work with.
      </Typography>

      <SwiperWrapper theme={{ selectedProfile }}>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
        >
          {currentSkills.map((item, index) => (
            <SwiperSlide key={index}>
              <SkillLogo>
                <Image src={item.imageUrl} alt={item.alt} width={80} height={80} style={{ objectFit: 'contain' }} />
              </SkillLogo>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperWrapper>
    </StyledContainer>
  );
};

export default SkillsSection;