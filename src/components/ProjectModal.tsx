import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, CircularProgress, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';

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

const ProjectModal: React.FC<ProjectModalProps> = ({ open, onClose, project }) => {
  const [loading, setLoading] = useState(true);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 1200);

      setTimeoutId(timeout);
    } else {
      setLoading(true);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          {project?.title}
        </Typography>
        <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: "10px", top: "10px", }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box position="relative" minHeight="500px">
          {loading && (
            <Box position="absolute" top="0" left="0" width="100%" height="65%" display="flex"
              alignItems="center" justifyContent="center" bgcolor="rgba(255, 255, 255, 1)"
              zIndex={1}>
              <CircularProgress />
            </Box>
          )}
          <Carousel arrows={!loading} responsive={{ desktop: { breakpoint: { max: 3000, min: 0 }, items: 1 } }}>
            {project?.imageUrls.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Image ${index}`}
                width={1000}
                height={1000}
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxHeight: '65vh',
                  objectFit: 'contain',
                  margin: '0 auto',
                  display: 'block',
                }}
              />
            ))}
          </Carousel>
          {project?.longDescription.split('\n').map((line, index) => (
            <Typography key={index} sx={{ mt: 2 }}>{line}</Typography>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
