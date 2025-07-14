import { Box, Typography, Grid, Link, Stack, IconButton } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useProfile } from "@/utils/ProfileContext";
import styled, { keyframes } from "styled-components";

// -- Keyframes for Animations --
const orbit = keyframes`
  0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
`;

const orbitReverse = keyframes`
  0% { transform: rotate(0deg) translateX(60px) rotate(0deg); }
  100% { transform: rotate(-360deg) translateX(60px) rotate(360deg); }
`;

// -- Styled Components --
const StyledContainer = styled(Box)`
  width: 100%;
  min-height: 80vh; 
  padding: 10vh 0;
  display: flex;
  align-items: center;
`;

const ContactInfoWrapper = styled(Box)`
  padding-right: 2rem;
  @media (max-width: 900px) {
    padding-right: 0;
    text-align: center;
  }
`;

const AnimatedVisualsContainer = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 400px;

  @media (max-width: 900px) {
    min-height: 300px;
    margin-top: 40px;
  }
`;

const OrbitingCircle = styled.div<{ $size: string; $color1: string; $color2: string; $duration: string; $reverse?: boolean }>`
  position: absolute;
  border-radius: 50%;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border: 3px dotted ${({ $color1 }) => $color1};
  box-shadow: 0 0 20px ${({ $color1 }) => $color1}, inset 0 0 20px ${({ $color2 }) => $color2};
  animation: ${({ $reverse }) => ($reverse ? orbitReverse : orbit)} ${({ $duration }) => $duration} linear infinite;
`;

const ContactStack = styled(Stack)`
  margin-top: 2rem;
  @media (max-width: 900px) {
    align-items: center;
  }
`;

const ContactItem = styled(Stack)`
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
  a {
    color: #e0e0e0;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SocialsStack = styled(Stack)`
  margin-top: 2.5rem;
  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const SocialButton = ({
  href,
  target,
  children,
  profileType,
}: {
  href: string;
  target?: string;
  children: React.ReactNode;
  profileType: 'RD' | 'AD';
}) => {
  const color = profileType === 'RD' ? '#2196F3' : '#FF9800';
  return (
    <IconButton
      component="a"
      href={href}
      target={target}
      sx={{
        color: '#ccc',
        border: '2px solid #555',
        transition: 'all 0.3s ease',
        '&:hover': {
          color: 'white',
          borderColor: color,
          transform: 'translateY(-5px)',
          boxShadow: `0 5px 15px ${color}33`,
        },
      }}
    >
      {children}
    </IconButton>
  );
};

const ContactMeSection = () => {
  const { selectedProfile } = useProfile();
  const rdColors = { color1: '#2196F3', color2: '#673AB7' };
  const adColors = { color1: '#FF9800', color2: '#FFEB3B' };
  const currentColors = selectedProfile === 'RD' ? rdColors : adColors;

  return (
    <StyledContainer>
      <Grid container alignItems="center" spacing={4}>

        {/* Left Side: Contact Information */}
        <Grid item xs={12} md={6}>
          <ContactInfoWrapper>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Get in Touch
            </Typography>
            <Typography variant="h6" color="#ccc">
              Have a project in mind or just want to say hello? I&apos;d love to hear from you.
            </Typography>

            <ContactStack spacing={3}>
              <ContactItem direction="row" spacing={2} alignItems="center">
                <PhoneIcon sx={{ color: currentColors.color1 }} />
                <Link href="tel:+60186625753" target="_blank">
                  <Typography>+6018-6625 753</Typography>
                </Link>
              </ContactItem>
              <ContactItem direction="row" spacing={2} alignItems="center">
                <EmailIcon sx={{ color: currentColors.color1 }} />
                <Link href="mailto:thomaskim.info@gmail.com" target="_blank">
                  <Typography>thomaskim.info@gmail.com</Typography>
                </Link>
              </ContactItem>
              <ContactItem direction="row" spacing={2} alignItems="center">
                <LocationOnIcon sx={{ color: currentColors.color1 }} />
                <Typography>Johor Bahru, Malaysia</Typography>
              </ContactItem>
            </ContactStack>

            <SocialsStack direction="row" spacing={2}>
              <SocialButton href="https://api.whatsapp.com/send?phone=60186625753" target="_blank" profileType={selectedProfile}>
                <WhatsAppIcon />
              </SocialButton>
              <SocialButton href="https://www.linkedin.com/in/thomas-kim-82217b2a0/" target="_blank" profileType={selectedProfile}>
                <LinkedInIcon />
              </SocialButton>
              <SocialButton href="https://www.facebook.com/thomask1m" target="_blank" profileType={selectedProfile}>
                <FacebookIcon />
              </SocialButton>
            </SocialsStack>
          </ContactInfoWrapper>
        </Grid>

        {/* Right Side: Animated Visual */}
        <Grid item xs={12} md={6}>
          <AnimatedVisualsContainer>
            <OrbitingCircle $size="300px" $duration="20s" $color1={currentColors.color1} $color2={currentColors.color2} />
            <OrbitingCircle $size="200px" $duration="25s" $color1={currentColors.color1} $color2={currentColors.color2} $reverse />
            <OrbitingCircle $size="100px" $duration="15s" $color1={currentColors.color1} $color2={currentColors.color2} />
          </AnimatedVisualsContainer>
        </Grid>

        {/* Copyright Footer */}
        <Grid item xs={12}>
          <Typography variant="body2" align="center" sx={{ color: '#888', mt: 8 }}>
            &copy; {new Date().getFullYear()} Thomas Kim. All Rights Reserved.
          </Typography>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

export default ContactMeSection;