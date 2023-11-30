"use client"
import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent } from '@mui/material';
import EyeIcon from "@mui/icons-material/RemoveRedEye";
import ProjectModal from '@/components/ProjectModal';
import { useProfile } from '@/utils/ProfileContext';
import styled from 'styled-components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  imageUrls: string[];
}

const StyledContainer = styled(Box)`
  position: relative;
  width: 100%;
  min-height: 80vh; 
  padding-top: 5vh;
  padding-bottom: 5vh;
`;

const StyledButton = styled(Button) <{ profileType: string }>`
  width: 100%;
  height: auto;
  padding: "7px 25px";
  border-radius: "10px";
  background: ${({ profileType }) => profileType === 'RD'
    ? 'linear-gradient(45deg, #673AB7 30%, #2196F3 90%)'
    : 'linear-gradient(45deg, #FF9800 30%, #FFEB3B 90%)'};
  color: #ffffff;

  &:hover {
    background: ${({ profileType }) => profileType === 'RD'
    ? 'linear-gradient(45deg,#46287D 30%, #0A6EBD 90%)'
    : 'linear-gradient(45deg, #FF5722 30%, #EED500 90%)'};
    color: #ffffff;
  }
`
const projects = {
  RD: [
    {
      title: 'Vouchy',
      subtitle: 'A consumer-centric restaurant app (B2C)',
      description: 'Seamlessly manage vouchers, reservations, and food orders in one place. Elevate customer experience effortlessly.',
      longDescription: 'This self-initiated project served as a comprehensive exercise to master the intricacies of full-stack engineering. From planning to design and programming, I orchestrated the entire app development process, spanning front to back end. Employing the MEAN stack, the experience was both enjoyable and challenging. Initially centered around a voucher feature, I elevated the project by incorporating table reservations and food ordering, elevating its scope. \nEnsuring seamless communication between the backend API and UI, my commitment to quality extended to designing a flawless user interface. My goal was to enhance user experience significantly. Additionally, I handled everything from logo design to name cards and database architecture for the complete F&B system.',
      thumbnail: '/images/RDP1.png',
      imageUrls: ['/images/RDP1S1.png', '/images/RDP1S2.png', '/images/RDP1S3.png']
    },
    {
      title: 'Vouplan',
      subtitle: 'Restaurant management system',
      description: 'Effortlessly manage customer vouchers, reservations, and food orders, reducing operational costs.',
      longDescription: "Within the comprehensive F&B system, I specifically crafted the restaurant owner's app, prioritizing streamlined management. One of the most intricate aspects was optimizing the food ordering functionality, considering the varied preferences of patrons. This demanded intricate database structuring and UI design to ensure an intuitive interface for kitchen staff, catering to their specific needs while maintaining simplicity. \nThis project not only expanded my technical skills in frameworks but also honed my ability to interpret and integrate essential features aligned with the restaurant's operational requirements. It highlighted my proficiency in database design, UI/UX development, and effective communication with end-users. Through this journey, I've developed a knack for navigating complex challenges while ensuring a user-centric approach, ultimately enhancing the overall efficiency of restaurant operations.",
      thumbnail: '/images/RDP2.png',
      imageUrls: ['/images/RDP2S1.png', '/images/RDP2S2.png', '/images/RDP2S3.png']
    },
    {
      title: 'Excel Macro Tools',
      subtitle: 'Transform your spreadsheet experience',
      description: 'Customize properties, create named ranges, and import data effortlessly. Generate data dynamically, tailor to your needs. Elevate your Excel game',
      longDescription: "Within my 2-year tenure as a dedicated software engineer, I've crafted impactful VBA and C# tools, revolutionizing operations within Microsoft Office. Entrusted with enhancing efficiency and eradicating errors, I've completed over 100 coding tasks and 90 research projects, showcasing a primary expertise in VBA. \nIn parallel, I've spearheaded the development of a user-friendly Excel spreadsheet tool. This comprehensive solution empowers users with customizable properties, named ranges, seamless data import, and on-the-fly data generation. Designed with a user-centric approach, it streamlines Excel data management, ensuring efficiency in tailored spreadsheet needs, effortless external data integration, and dynamic data generation, catering comprehensively to Excel users' requirements.",
      thumbnail: '/images/RDP3.png',
      imageUrls: ['/images/RDP3S1.png', '/images/RDP3S2.png']
    },
    {
      title: 'Portfolio Website',
      subtitle: 'Yes, the website you are looking at!',
      description: 'I developed this website within 5 days while simultaneously mastering a new framework and programming language.',
      longDescription: "Venturing beyond my expertise in the MEAN stack, I embarked on a journey to explore the MERN stack while developing my portfolio website. What you're experiencing right now is the result of that exploration. The transition from MEAN to MERN was not just about adopting a new framework; it was about embracing React's user-friendly nature, integrating libraries that resonate like a harmonious melody within the website's architecture.\nThis journey not only expanded my technical skills but also highlighted my adaptability in swiftly transitioning between frameworks. The foundational knowledge I cultivated in the MEAN stack seamlessly translated into the MERN stack, enabling a smooth integration process. The joy of witnessing the React framework seamlessly blend into this website reaffirmed my passion for creating intuitive and engaging digital experiences. This project not only serves as my portfolio but also as a testament to my versatility as a full stack developer.",
      thumbnail: '/images/RDP4.png',
      imageUrls: ['/images/RDP4S1.png', '/images/RDP4S2.png']
    },
    {
      title: 'Member Card App',
      subtitle: 'Seamless Membership Management',
      description: 'Effortlessly manage memberships, rewards, and exclusive offers with our intuitive member card app. Simplify access, enhance loyalty, and unlock a world of perks.',
      longDescription: "Opting for a hybrid app approach not only streamlined the learning curve but also added considerable value for customers. In just 9 productive hours, I conceptualized and developed a member card system. Having spearheaded a large-scale F&B system in the past, this project felt like second nature, enabling me to allocate extensive focus on coding intricacies, strengthening the system's resilience and efficiency. \nThis undertaking underscored my prowess in leveraging hybrid app development to swiftly deliver valuable solutions. My experience in overseeing complex F&B systems equipped me with a comprehensive understanding of user needs and system functionalities. This proficiency allowed me to allocate more time and effort towards code optimization, ensuring a robust and reliable member card system tailored to meet the demands of both users and the business.",
      thumbnail: '/images/RDP5.png',
      imageUrls: ['/images/RDP5S1.png', '/images/RDP5S2.png', '/images/RDP5S3.png', '/images/RDP5S4.png']
    },
    {
      title: 'Python Tools',
      subtitle: 'Streamline repetitive tasks',
      description: 'Python enables a myriad of tasks—database reading, web scraping, automatic screenshots, even calculators and translators. Unlock a world of possibilities with Python.',
      longDescription: "During my leisure hours, I immerse myself in content creation for my personal YouTube channel. While engaged in this pursuit, I noticed repetitive and mundane tasks that demanded my attention. This realization sparked the inception of small tools in my mind. As they say, a good programmer is also a lazy programmer—I began channeling my experiences into Python, gradually building a repository of portable tools tailored to my work. \nThe evolution of these Python tools has been nothing short of astounding. Implementing them slashed my workload by a staggering 75%, ensuring consistent and reliable outcomes without fail. This journey not only showcased the power of automation but also honed my programming skills. It highlighted my knack for identifying inefficiencies and devising efficient solutions, underscoring my ability to leverage Python's versatility in simplifying complex tasks and boosting productivity.",
      thumbnail: '/images/RDP6.png',
      imageUrls: ['/images/RDP6S1.png', '/images/RDP6S2.png']
    }
  ],
  AD: [
    {
      title: ' Logo Design',
      subtitle: 'Crafting Visual Identities that Speak',
      description: 'Dive into the art of logo design—a realm where visual storytelling meets brand essence. Immerse yourself in my journey of creating captivating logos that resonate with audiences and echo brand narratives.',
      longDescription: "Embark on a visual odyssey into the realm of logo design—where narratives are etched into imagery. I specialize in crafting compelling logos that transcend mere visuals; each design encapsulates brand essence, sparking connections with audiences. From ideation to execution, my journey unfolds through captivating visuals that mirror brand ethos and resonate profoundly. Witness my creative prowess—merging artistry and strategy to sculpt impactful visual identities. My skill set encompasses intuitive brand interpretation, precise conceptualization, and an acute understanding of design psychology. Experience the fusion of creativity and purpose, where every stroke embodies a brand's story.",
      thumbnail: '/images/ADP1.png',
      imageUrls: ['/images/ADP1S1.png', '/images/ADP1S2.png']
    },
    {
      title: 'Product Post Design',
      subtitle: 'Elevate Brand Stories Through Visuals',
      description: 'Delve into the art of crafting compelling product posts that captivate audiences and narrate brand journeys. Explore how each visual element intertwines with brand narratives to create engaging stories.',
      longDescription: "Discover the magic of creating eye-catching product posts that tell amazing brand stories. Dive into my world where each picture and word work together to make brands come alive. See how I put visuals and stories together to make posts that people love. I'm skilled in arranging pictures and words to make brands look great and tell their stories. Join me in exploring how visuals make brands shine in every post!",
      thumbnail: '/images/ADP2.png',
      imageUrls: ['/images/ADP2S1.png', '/images/ADP2S2.png', '/images/ADP2S3.png']
    },
    {
      title: 'T-Shirt Design',
      subtitle: 'Unleashing Artistry Through Wearables',
      description: ' Explore the realm of wearable artistry where every stitch and hue tells a unique story. Dive into my world of T-shirt design, where creativity meets comfort, delivering captivating narratives through fashion.',
      longDescription: "Enter the captivating world of T-shirt design—a canvas where creativity meets wearable art. With a passion for crafting visually engaging narratives through fashion, I embark on a journey into this vibrant realm. Exploring the fusion of colors, shapes, and stories, I'm driven by the thrill of transforming concepts into wearable expressions. While my experience may be budding, my dedication and enthusiasm shine through every design endeavor. Join me in discovering the magic of T-shirt design, where each stitch is a step towards weaving captivating tales on fabric!",
      thumbnail: '/images/ADP3.png',
      imageUrls: ['/images/ADP3S1.png', '/images/ADP3S2.png', '/images/ADP3S3.png', '/images/ADP3S4.png']
    },
    {
      title: 'Banner Design',
      subtitle: 'Crafting Visual Statements for Impact',
      description: 'Explore the artistry behind impactful banners that capture attention and convey messages succinctly. Delve into my expertise in creating visually compelling banners that elevate brand communication and resonate with audiences.',
      longDescription: "Discover the craft behind impactful banners—an art form that commands attention and communicates messages with precision. Immerse yourself in my world of banner design, where expertise meets creativity to amplify brand communication. While specializing in crafting visually striking banners for Facebook ads, shop promotions, and menu designs, I harness the power of design to engage audiences effectively. Every banner I create is a blend of aesthetics and strategic messaging, tailored to captivate and resonate with viewers. Join me in exploring the artistry of banners, where each design is meticulously crafted to make a lasting impact.",
      thumbnail: '/images/ADP4.png',
      imageUrls: ['/images/ADP4S1.png']
    }]
};

const PortfolioSection = () => {
  const { selectedProfile } = useProfile();
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const carouselRef = useRef<any>(null);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Scroll to the first item (start) when selectedProfile changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current?.goToSlide(0);
    }
  }, [selectedProfile]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <StyledContainer>
        <Box sx={{ p: 3 }}>
          {/* Center-aligned title */}
          <Typography variant="h4" align="center" gutterBottom fontWeight={600}>Portfolio</Typography>

          <Typography variant="body1" align="center" gutterBottom sx={{ mb: 1, fontFamily: selectedProfile === 'RD' ? 'Cascadia Code' : 'CatCafe' }}>
            Discover My Portfolio Highlights and Best Work
          </Typography>

          <Carousel ref={carouselRef} responsive={responsive} showDots>
            {projects[selectedProfile].map((project, index) => (
              <Card key={index} style={{ height: 'auto', maxHeight: '87vh', margin: '30px 10px' }}>
                <CardMedia component="img" height="150" image={project.thumbnail} alt={project.title} sx={{ borderBottom: "1px solid #ccc" }} />
                <CardContent >
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                    {project.title}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom sx={{ italic: "true" }}>
                    {project.subtitle}
                  </Typography>
                  <Typography variant="body2" gutterBottom sx={{ height: "100px" }}>
                    {project.description}
                  </Typography>
                  <StyledButton variant="contained" startIcon={<EyeIcon />}
                    onClick={() => handleOpenModal(project)}
                    profileType={selectedProfile} sx={{ padding: "7px 25px", borderRadius: "10px" }}>
                    Know More
                  </StyledButton>
                  <ProjectModal open={openModal} onClose={handleCloseModal} project={selectedProject} />
                </CardContent>
              </Card>
            ))}
          </Carousel>
        </Box>
      </StyledContainer >
    </>
  );
}

export default PortfolioSection;
