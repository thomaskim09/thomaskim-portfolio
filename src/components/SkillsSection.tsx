import { useEffect, useRef } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Image from "next/image";
import styled from 'styled-components';
import { useProfile } from '@/utils/ProfileContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// Example content
interface LogoItem {
  imageUrl: string;
  alt: string;
}

const StyledContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: 85vh; 
  padding-top: 10vh;
  padding-bottom: 10vh;
  margin-bottom: 5vh;
`;

const items: { [key: string]: LogoItem[][] } = {
  RD: [
    [
      { imageUrl: '/images/RDS_1.png', alt: 'Logo 1' },
      { imageUrl: '/images/RDS_3.png', alt: 'Logo 2' },
    ],
    [
      { imageUrl: '/images/RDS_2.png', alt: 'Logo 3' },
      { imageUrl: '/images/RDS_8.png', alt: 'Logo 4' },
    ],
    [
      { imageUrl: '/images/RDS_5.png', alt: 'Logo 5' },
      { imageUrl: '/images/RDS_6.png', alt: 'Logo 6' },
    ],
    [
      { imageUrl: '/images/RDS_4.png', alt: 'Logo 7' },
      { imageUrl: '/images/RDS_7.png', alt: 'Logo 8' },
    ],
    [
      { imageUrl: '/images/RDS_9.png', alt: 'Logo 9' },
      { imageUrl: '/images/RDS_10.png', alt: 'Logo 10' },
    ],
    [
      { imageUrl: '/images/RDS_11.png', alt: 'Logo 11' }
      { imageUrl: '/images/RDS_12.png', alt: 'Logo 12' }
    ]
  ],
  AD: [
    [
      { imageUrl: '/images/ADS_1.png', alt: 'Logo 1' },
      { imageUrl: '/images/ADS_5.png', alt: 'Logo 2' },
    ],
    [
      { imageUrl: '/images/ADS_4.png', alt: 'Logo 3' },
      { imageUrl: '/images/ADS_6.png', alt: 'Logo 4' },
    ],
    [
      { imageUrl: '/images/ADS_2.png', alt: 'Logo 5' },
      { imageUrl: '/images/ADS_7.png', alt: 'Logo 6' },
    ],
    [
      { imageUrl: '/images/ADS_3.png', alt: 'Logo 7' },
    ]
  ]
};

const SkillsComponent: React.FC = () => {
  const { selectedProfile } = useProfile();
  const carouselRef = useRef<any>(null);

  // Scroll to the first item (start) when selectedProfile changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current?.goToSlide(0);
    }
  }, [selectedProfile]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <>
      <StyledContainer>
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" align="center" gutterBottom fontWeight={600}>Skills</Typography>

          <Typography variant="body1" align="center" gutterBottom sx={{ mb: 1, fontFamily: selectedProfile === 'RD' ? 'Cascadia Code' : 'CatCafe' }}>
            Overview of My Skills, Expertise, and Abilities
          </Typography>

          <Carousel ref={carouselRef} responsive={responsive} ssr showDots containerClass="carousel-container" >
            {items[selectedProfile].map((itemRow, rowIndex) => (
              <div key={rowIndex}>
                {itemRow.map((item, colIndex) => (
                  <Paper key={colIndex} elevation={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px 10px', padding: '15px', background: 'linear-gradient(to right, #1f1e1e 0%, #4D4855 100%)' }}>
                    <Image src={item.imageUrl} alt={item.alt} width={100} height={100} />
                  </Paper>
                ))}
              </div>
            ))}
          </Carousel>
        </Box>
      </StyledContainer>
    </>
  );
};

export default SkillsComponent;
