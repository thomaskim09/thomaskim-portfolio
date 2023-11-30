"use client"
import { useEffect } from 'react';
import { useProfile } from '../utils/ProfileContext';

const BackgroundColorChanger = () => {
  const { selectedProfile } = useProfile();

  useEffect(() => {
    // Change background color based on the selected profile
    document.body.style.backgroundColor =
      selectedProfile === 'RD' ? '#021627' : '#271700';

    // Cleanup to reset background color when component unmounts
    return () => {
      document.body.style.backgroundColor = ''; // Reset background color
    };
  }, [selectedProfile]);

  // Render an empty fragment since no JSX is needed here
  return <></>;
};

export default BackgroundColorChanger;