import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, CircularProgress, Box, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import styled from 'styled-components';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  imageUrls: string[];
}

interface ProjectModalProps {
  open: boolean;
  onClose: () => void;
  project: Project | null;
}

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 15px;
    background-color: #1a1a1a;
    color: white;
    max-width: 900px;
    width: 100%;
  }
`;

const StyledCarousel = styled(Carousel)`
  .react-multi-carousel-dot--active button {
    background: #fff;
  }
  .react-multi-carousel-dot button {
    border-color: #fff;
  }
`;

const ProjectModal: React.FC<ProjectModalProps> = ({ open, onClose, project }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (open) {
      setLoading(true);
      timeout = setTimeout(() => {
        setLoading(false);
      }, 800);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [open, project]);

  const renderDescription = (description: string) => {
    const boldedText = description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return <Typography sx={{ mt: 3, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: boldedText.replace(/\n/g, '<br />') }} />;
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      TransitionComponent={Fade}
      transitionDuration={500}
    >
      <DialogTitle sx={{ p: 3, borderBottom: '1px solid #333' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
              {project?.title}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#bbb' }}>
              {project?.subtitle}
            </Typography>
          </Box>
          <IconButton aria-label="close" onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Box position="relative" minHeight={{ xs: 'auto', md: '500px' }}>
          {loading && (
            <Box
              position="absolute"
              top={0} left={0} width="100%" height="100%"
              display="flex" alignItems="center" justifyContent="center"
              bgcolor="rgba(26, 26, 26, 0.9)"
              zIndex={10}
              sx={{ borderRadius: '15px' }}
            >
              <CircularProgress color="inherit" />
            </Box>
          )}
          <Fade in={!loading} timeout={400}>
            <Box>
              <StyledCarousel
                arrows={!loading}
                responsive={{ desktop: { breakpoint: { max: 3000, min: 0 }, items: 1 } }}
                showDots={true}
                infinite={true}
              >
                {project?.imageUrls.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    width={1000}
                    height={600}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '60vh',
                      objectFit: 'contain',
                      borderRadius: '10px',
                    }}
                  />
                ))}
              </StyledCarousel>
              {project?.longDescription && renderDescription(project.longDescription)}
            </Box>
          </Fade>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
};

export default ProjectModal;