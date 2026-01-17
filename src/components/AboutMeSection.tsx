import { Grid, Typography, Box, Button } from "@mui/material";
import { useProfile } from "@/utils/ProfileContext";
import styled from "styled-components";
import { CSSTransition } from 'react-transition-group';
import Image from "next/image";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PDFIcon from "@mui/icons-material/PictureAsPdf";

const StyledContainer = styled(Box)`
  position: relative;
  width: 100%;
  min-height: 80vh; 
  padding-top: 10vh;
  padding-bottom: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled(Box)`
  @media (max-width: 960px) {
    text-align: center;
  }
`;

// A wrapper to create the 3D perspective for the tilt effect
const ImagePerspectiveWrapper = styled.div`
  perspective: 1000px;
`;

// This container will react to hover and apply the 3D tilt transform
const TiltImageContainer = styled.div<{ $profileType: string }>`
  width: 100%;
  max-width: 450px;
  height: auto;
  margin: auto;
  border-radius: 15px;
  transition: all 0.3s ease-out;
  transform-style: preserve-3d;
  position: relative;
  
  // The signature box-shadow effect from your original design
  box-shadow: ${({ $profileType }) =>
    $profileType === "RD"
      ? "0 0 40px -10px #2196F3, 0 0 40px -10px #673AB7"
      : "0 0 40px -10px #FF9800, 0 0 40px -10px #FFEB3B"};

  &:hover {
    transform: scale(1.05) rotateX(10deg) rotateY(-10deg);
    box-shadow: ${({ $profileType }) =>
    $profileType === "RD"
      ? "0 40px 50px -20px #2195f370, 0 40px 50px -20px #673ab770"
      : "0 40px 50px -20px #ff980070, 0 40px 50px -20px #ffeb3b70"};
  }

  // The Next.js Image component needs to be targeted to apply styles like border-radius
  img {
    border-radius: 15px;
    width: 100%;
    height: auto;
  }
`;


const ButtonContainer = styled(Box)`
  @media (max-width: 960px) {
    max-width: 500px;
    display: block;
    margin: auto;
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
`;

const AboutMeSection = () => {
  const { selectedProfile } = useProfile();

  return (
    <StyledContainer>
      <Grid container spacing={5} alignItems="center" justifyContent="center">

        {/* Image on the left */}
        <Grid item xs={12} md={6}>
          <ImagePerspectiveWrapper>
            <TiltImageContainer $profileType={selectedProfile} className="animate__animated animate__fadeIn">
              <Image
                src="/images/ProfileImage.jpg"
                alt="Thomas's Profile"
                width={450}
                height={450}
                priority
              />
            </TiltImageContainer>
          </ImagePerspectiveWrapper>
        </Grid>

        {/* Text on the Right */}
        <Grid item xs={12} md={6}>
          <ContentContainer>
            <div className="animate__animated animate__fadeInDown">
              <Typography variant="h4" gutterBottom fontWeight={600}>About Me</Typography>
            </div>

            <CSSTransition in={true} timeout={500} classNames="fade" key={selectedProfile}>
              <div className="animate__animated animate__fadeInUp">
                <Typography variant="body1" sx={{ lineHeight: 1.8, fontFamily: selectedProfile === 'RD' ? 'Cascadia Code' : 'CatCafe' }}>
                  {selectedProfile === 'RD' ?
                    "I am a skilled developer proficient in both front-end and back-end development. With experience in multimedia design and marketing, I offer a unique blend of technical expertise and creative vision. Excited to collaborate with you and deliver exceptional work." :
                    "I specialize in blending technical expertise with artistic vision, excelling in both front-end development and UI design. With a background in multimedia design and marketing, I bring a unique fusion of creativity and technical skill to every project. I'm eager to collaborate and deliver exceptional, visually appealing work."}
                </Typography>
              </div>
            </CSSTransition>

            <ButtonContainer sx={{ display: "flex", mt: 4 }} className="animate__animated animate__fadeInUp animate__delay-1s">
              {/* WhatsApp Me Button */}
              <Button
                variant="contained"
                startIcon={<WhatsAppIcon />}
                href="https://api.whatsapp.com/send?phone=60186625753"
                target="_blank" rel="noopener noreferrer"
                sx={{
                  bgcolor: "#25D366", color: "#FFFFFF", mr: 2, padding: "10px 25px", borderRadius: "10px",
                  "&:hover": { bgcolor: "#1A9247", transform: 'scale(1.05)' },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                WhatsApp Me
              </Button>

              {/* Resume Button */}
              <Button
                variant="contained"
                startIcon={<PDFIcon />}
                href="/files/v2026_Thomas_Kim_Resume.pdf"
                target="_blank" rel="noopener noreferrer"
                sx={{
                  bgcolor: "#FF5722", color: "#FFFFFF", padding: "10px 25px", borderRadius: "10px",
                  "&:hover": { bgcolor: "#D53300", transform: 'scale(1.05)' },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                Resume
              </Button>
            </ButtonContainer>
          </ContentContainer>
        </Grid>

      </Grid>
    </StyledContainer>
  );
}

export default AboutMeSection;