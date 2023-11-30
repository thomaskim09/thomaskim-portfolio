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
`;

const ContentContainer = styled(Box)`
  @media (max-width: 960px) {
    text-align: center;
  }
`;

const ImageContainer = styled(Image) <{ profileType: string }>`
  width: 500px;
  height: auto;
  max-width: 500px;
  max-height: 500px;
  display: block;
  @media (max-width: 960px) {
    width: 250px;
    height: 250px;
    margin: auto;
  }
  transition: box-shadow 0.5s ease-in-out; /* Add transition effect */
  box-shadow: ${({ profileType }) =>
    profileType === "RD"
      ? "-50px -50px 0 -40px #673AB7, 50px 50px 0 -40px #2196F3"
      : "-50px -50px 0 -40px #FF9800, 50px 50px 0 -40px #FFEB3B"};
`

const ButtonContainer = styled(Box)`
  @media (max-width: 960px) {
    max-width: 500px;
    max-height: 500px;
    display: block;
    margin: auto;
    margin-top: 20px;
  }
`

const AboutMeSection = () => {
  const { selectedProfile } = useProfile();

  return (
    <>
      <StyledContainer>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3} alignItems="center">
            {/* Image on the right */}
            <Grid item xs={12} md={6} >
              <div className="animate__animated animate__fadeIn">
                <ImageContainer src="/images/Profile Image.jpg" alt="Thomas's Profile" width={500} height={500}
                  priority profileType={selectedProfile} />
              </div>
            </Grid>
            {/* Text on the Right */}
            <Grid item xs={12} md={6}>
              <ContentContainer>
                <Typography variant="h4" gutterBottom fontWeight={600}>About Me</Typography>
                <CSSTransition in={true} timeout={500} classNames="fade" key={selectedProfile}>
                  <div className="animate__animated animate__fadeIn">
                    <Typography variant="body1" >
                      {selectedProfile === 'RD' ?
                        "I am a skilled developer proficient in both front-end and back-end development. With experience in multimedia design and marketing, I offer a unique blend of technical expertise and creative vision. Excited to collaborate with you and deliver exceptional work." :
                        "I specialize in blending technical expertise with artistic vision, excelling in both front-end development and UI design. With a background in multimedia design and marketing, I bring a unique fusion of creativity and technical skill to every project. I'm eager to collaborate and deliver exceptional, visually appealing work."}
                    </Typography>
                  </div>
                </CSSTransition>

                <ButtonContainer sx={{ display: "flex", justifyContent: "flex-center", mt: 2 }}>
                  {/* WhatsApp Me Button */}
                  <Button variant="contained" startIcon={<WhatsAppIcon />}
                    href="https://api.whatsapp.com/send?phone=60186625753" target="_blank" rel="noopener noreferrer"
                    sx={{
                      bgcolor: "#25D366", color: "#FFFFFF", mr: 2, padding: "7px 25px", borderRadius: "10px",
                      "&:hover": { bgcolor: "#1A9247", color: "#FFFFFF" }
                    }}>
                    WhatsApp Me
                  </Button>

                  {/* Resume Button */}
                  <Button variant="contained" startIcon={<PDFIcon />} href="/files/v2023 Thomas_Kim_Resume.pdf"
                    target="_blank" rel="noopener noreferrer" sx={{
                      bgcolor: "#FF5722", color: "#FFFFFF", mr: 2, padding: "7px 25px", borderRadius: "10px",
                      "&:hover": { bgcolor: "#D53300", color: "#FFFFFF" }
                    }}>
                    Resume
                  </Button>
                </ButtonContainer>
              </ContentContainer>
            </Grid>
          </Grid>
        </Box>
      </StyledContainer>
    </>

  );
}

export default AboutMeSection; 
