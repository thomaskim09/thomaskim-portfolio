import { Box, Typography, Grid, Button, Stack } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useProfile } from "@/utils/ProfileContext";
import styled from "styled-components";

const StyledContainer = styled(Box)`
  position: relative;
  width: 100%;
  min-height: 80vh; 
  padding-top: 5vh;
  padding-bottom: 5vh;
`;

const ContactBackground = styled.div<{ $profileType: string }>`
  position: relative;
  width: 100%;
  height: auto;
  border-radius: 20px;
  overflow: hidden;
  padding: 5vh;
  position: relative;
  background-image: url("/images/contact-us.jpg");
  background-size: cover;
  background-position: center;
  color: white;
  font-size: 24px;
  font-weight: bold;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ $profileType }) =>
    $profileType === "RD"
      ? "linear-gradient(to right, #673AB7, #2196F3)"
      : "linear-gradient(to right, #853D1D  , #8B721F)"};
    border-radius: 20px;
    opacity: 0.7; /* Adjust opacity as needed */
    z-index: 1; /* Move the gradient behind the content */
  }

  /* Add styles for text content */
  & > * {
    position: relative; /* Ensure the text remains above the gradient */
    z-index: 1; /* Keep the text above the gradient */
  }
`;

const ContactMeSection = () => {
  const { selectedProfile } = useProfile();

  return (
    <StyledContainer>
      <ContactBackground $profileType={selectedProfile} >
        {/* Center-aligned title */}
        <Typography variant="h4" align="center" gutterBottom fontWeight={600}>Contact Me</Typography>

        {/* Body text */}
        <Typography variant="body1" align="center" gutterBottom sx={{ mb: 5, fontFamily: selectedProfile === 'RD' ? 'Cascadia Code' : 'CatCafe' }}>
          Let&apos;s Connect and Collaborate! I&apos;m Excited to Hear from You.
        </Typography>

        {/* Grid for contact details */}
        <Grid container spacing={3}>
          {/* Phone */}
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'center' } }}>
            <Stack direction="row" alignItems="center">
              <Button variant="outlined" href="tel:+60186625753" target="_blank" sx={{ color: 'white', margin: '0 20px', height: '50px', width: '50px', border: '2px solid white', borderRadius: '10%' }} ><PhoneIcon /></Button>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>Phone</Typography>
                <Typography variant="body2">+6018-6625 753</Typography>
              </Box>
            </Stack>
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'center' } }}>
            <Stack direction="row" alignItems="center">
              <Button variant="outlined" href="mailto:thomaskim.info@gmail.com" target="_blank" sx={{ color: 'white', margin: '0 20px', height: '50px', width: '50px', border: '2px solid white', borderRadius: '10%' }} ><EmailIcon /></Button>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>Email</Typography>
                <Typography variant="body2">thomaskim.info@gmail.com</Typography>
              </Box>
            </Stack>
          </Grid>

          {/* WhatsApp Me button */}
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginTop: "5vh" }}>
            <Button variant="contained" startIcon={<WhatsAppIcon />}
              href="https://api.whatsapp.com/send?phone=60186625753" target="_blank" rel="noopener noreferrer"
              sx={{
                bgcolor: "#25D366", color: "#FFFFFF", padding: "7px 25px", borderRadius: "10px",
                "&:hover": { bgcolor: "#1A9247", color: "#FFFFFF" }
              }}>
              WhatsApp Me
            </Button>
          </Grid>

          {/* Social media icons */}
          <Grid item xs={12}>
            <Stack direction="row" spacing={2} justifyContent="center" >
              <Button variant="outlined" href="https://www.linkedin.com/in/thomas-kim-82217b2a0/" target="_blank" sx={{ color: 'white', margin: '0 20px', height: '35px', width: '80px', border: '2px solid white', borderRadius: '10%' }} ><LinkedInIcon /></Button>
              <Button variant="outlined" href="https://www.facebook.com/thomask1m" target="_blank" sx={{ color: 'white', margin: '0 20px', height: '35px', width: '80px', border: '2px solid white', borderRadius: '10%' }} ><FacebookIcon /></Button>
            </Stack>
          </Grid>

          {/* Copyright */}
          <Grid item xs={12}>
            <Typography variant="body2" align="center">
              &copy; 2023 Thomas Kim. All Rights Reserved.
            </Typography>
          </Grid>
        </Grid>
      </ContactBackground >
    </StyledContainer >
  );
}

export default ContactMeSection;
