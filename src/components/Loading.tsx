import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black; /* You can adjust the background color */
`

const LoadingComponent = () => {
  return (
    <Container>
      <CircularProgress color="primary" size={60} />
      <Typography variant="h6" sx={{ marginTop: '20px' }}>
        Loading...
      </Typography>
    </Container>
  );
};

export default LoadingComponent;
