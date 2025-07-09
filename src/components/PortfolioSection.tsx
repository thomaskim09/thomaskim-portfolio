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

const StyledButton = styled(Button) <{ $profileType: string }>`
  width: 100%;
  height: auto;
  padding: "7px 25px";
  border-radius: "10px";
  background: ${({ $profileType }) => $profileType === 'RD'
    ? 'linear-gradient(45deg, #673AB7 30%, #2196F3 90%)'
    : 'linear-gradient(45deg, #FF9800 30%, #FFEB3B 90%)'};
  color: #ffffff;

  &:hover {
    background: ${({ $profileType }) => $profileType === 'RD'
    ? 'linear-gradient(45deg,#46287D 30%, #0A6EBD 90%)'
    : 'linear-gradient(45deg, #FF5722 30%, #EED500 90%)'};
    color: #ffffff;
  }
`
const projects = {
  RD: [
    {
      title: 'GeminiScrape',
      subtitle: 'Effortless Gemini Conversation Archiving',
      description: 'A simple desktop app to scrape and export public Gemini conversations into clean, human-readable text files. GeminiScrape automates the process, saving you time and ensuring your records are always organized.',
      longDescription: 'GeminiScrape is a cross-platform desktop application designed to make archiving public Gemini conversations fast and effortless. Built with Python and PySide6, it features a clean UI where you simply paste a Gemini share link, select your save directory, and let the app do the rest. Under the hood, GeminiScrape uses Selenium and BeautifulSoup to reliably extract each question and answer, compiling the entire conversation into a single, well-formatted `.txt` file.\n\nThe app provides real-time progress feedback and supports exporting to any directory of your choice. With its focus on simplicity and reliability, GeminiScrape is perfect for researchers, archivists, or anyone who wants to save and organize Gemini conversations for future reference. Packaging is easy with PyInstaller, making it available for Windows, macOS, and Linux.',
      thumbnail: '/images/GeminiScrape_00.jpg',
      imageUrls: ['/images/GeminiScrape_00.jpg', '/images/GeminiScrape_01.png', '/images/GeminiScrape_02.png']
    },
    {
      title: 'CodeCourier',
      subtitle: 'Effortless Project Packaging & Clean Code Delivery',
      description: 'A desktop utility that streamlines packaging your software projects for sharing or deployment. CodeCourier intelligently copies your project, automatically excluding files and folders based on .gitignore rules and your manual selections, ensuring a clean, clutter-free package every time.',
      longDescription: 'CodeCourier is a user-friendly desktop tool designed to simplify preparing software projects for sharing, uploading, or deployment. It intelligently scans .gitignore files throughout your project and allows you to manually exclude top-level files or folders, ensuring only the necessary files are included in your package.\n\nWith features like intelligent packaging, manual exclusions, session persistence, and a clean, progress-driven UI, CodeCourier makes it easy to create clean, portable copies of your code. The tool warns you before overwriting existing folders and remembers your last-used paths and settings for each project, saving you time and reducing errors.\n\nWhether you need to share your code with collaborators, upload it to an AI agent, or prepare it for deployment, CodeCourier ensures your packages are free from unnecessary files and clutter, making your workflow faster and more efficient.',
      thumbnail: '/images/CodeCourier_00.png',
      imageUrls: ['/images/CodeCourier_00.png', '/images/CodeCourier_01.png', '/images/CodeCourier_02.png']
    },
    {
      title: 'NodeFlow',
      subtitle: 'Qualitative Analysis Made Intuitive',
      description: 'A modern desktop application for qualitative researchers and students, NodeFlow streamlines the coding and organization of text-based data. Featuring hierarchical node management, participant tracking, and powerful export options, it brings clarity and efficiency to qualitative analysis.',
      longDescription: 'NodeFlow is a powerful desktop application designed for qualitative researchers and students to analyze text-based data, such as interview transcripts, with ease. Built with Python and PySide6, it offers a professional, project-based workflow that lets you create, manage, and organize research projects from start to finish.\n\nThe app features advanced hierarchical node coding, allowing you to create, reorder, and structure codes in a flexible multi-level tree, complete with automatic numbering. You can import documents in both .txt and .docx formats, assign them to specific participants, and code text segments using a dynamic, nested context menu.\n\nNodeFlow also provides comprehensive data export options, letting you save your coded data as structured JSON, formatted Word documents, or detailed Excel reports, all organized by your node hierarchy. With full CRUD management for participants and localization support via YAML files, NodeFlow streamlines the entire qualitative analysis process, making it accessible, efficient, and highly customizable for any research project.',
      thumbnail: '/images/NodeFlow_00.png',
      imageUrls: ['/images/NodeFlow_00.png', '/images/NodeFlow_01.png', '/images/NodeFlow_02.png', '/images/NodeFlow_03.png', '/images/NodeFlow_04.png', '/images/NodeFlow_05.png']
    },
    {
      title: 'WPS Office AI Add-in',
      subtitle: 'Intelligent Spreadsheet Automation & AI Integration',
      description: 'A custom WPS Office add-in designed to automate complex spreadsheet tasks, streamline data analysis, and integrate AI capabilities directly into your workflow, eliminating manual calculations and repetitive queries.',
      longDescription: 'This project is a powerful, customizable **WPS Office add-in** specifically developed to enhance productivity within spreadsheet environments. It\'s engineered to **automate intricate and repetitive tasks** that typically require manual calculation, extensive research, or constant interaction with AI agents. \n\nKey features include **custom functions** to perform advanced data analysis, surveys, and complex calculations at lightning speed. The add-in also boasts **seamless integration with AI capabilities**, allowing users to leverage intelligent insights and generate content directly within their spreadsheets without waiting for external responses. This dramatically **reduces manual effort and accelerates data processing**, transforming time-consuming operations into instant actions. While initially focused on spreadsheets, the architecture is designed for **extensibility across other WPS Office applications**, offering the potential for tailored add-ins for documents, presentations, and more.',
      thumbnail: '/images/wpstools_0.png',
      imageUrls: ['/images/wpstools_1.jpeg', '/images/wpstools_2.jpeg', '/images/wpstools_3.jpeg']
    },
    {
      title: 'Browser Automation Tools',
      subtitle: 'An IG Stamping Auto App',
      description: 'A desktop application built with Python and Tkinter to automate data entry for Insurance Guarantee (IG) documents on the STAMPS website, featuring data management, intelligent PDF processing, and end-to-end web automation using Selenium.',
      longDescription: 'This project is a desktop application developed using **Python and Tkinter** to fully automate the process of data entry for Insurance Guarantee (IG) documents on the STAMPS website. It includes a **persistent SQLite database** (`data.db`) for managing company and insurance provider information with full CRUD and live search capabilities.  \n\nThe application can **automatically extract key data** (Company Name, Address, Policy Number) from uploaded IG PDFs using regular expressions and intelligently populate UI forms. For web automation, it utilizes **Selenium** to perform end-to-end multi-step data population on the STAMPS website, allowing users to run modular phases independently. A unique feature is its ability to **programmatically generate new PDFs** with the official Adjudication Number and company ROC number stamped as a header before upload. It also includes robust browser management for a remote-controlled **Chrome** instance. The application is designed for **Windows** operating systems and requires Google Chrome to be installed.',
      thumbnail: '/images/IGStampingAuto_0.png',
      imageUrls: ['/images/IGStampingAuto_0.png', '/images/IGStampingAuto_1.png', '/images/IGStampingAuto_2.png', '/images/IGStampingAuto_3.png']
    },
    {
      title: 'LiuXueTao Marketplace',
      subtitle: 'Connecting Pre-owned Buyers & Sellers',
      description: 'A comprehensive web platform for users to buy and sell second-hand items easily and efficiently.',
      longDescription: 'This project involves developing a **full-stack web application** designed specifically for overseas students studying locally, facilitating the buying and selling of used goods within their community. Key features include **user authentication**, comprehensive **product listings with image uploads**, advanced **search and filter functionalities**, and a secure **in-app messaging system** for direct buyer-seller communication. \n\nThe platform aims to create a user-friendly, secure, and convenient marketplace that supports the circular economy among international students. The frontend is built using **Flutter with Dart**, providing a cross-platform and visually appealing user experience, while the robust backend API is powered by **Node.js**, ensuring efficient data handling and smooth operations.',
      thumbnail: '/images/liuxuetao_0.png',
      imageUrls: ['/images/liuxuetao_1.png', '/images/liuxuetao_2.png', '/images/liuxuetao_3.png', '/images/liuxuetao_4.png', '/images/liuxuetao_5.png']
    },
    {
      title: 'Vouchy',
      subtitle: 'A consumer-centric restaurant app (B2C)',
      description: 'Seamlessly manage vouchers, reservations, and food orders in one place. Elevate customer experience effortlessly.',
      longDescription: 'This self-initiated project served as a comprehensive exercise to master the intricacies of **full-stack engineering**. From planning to design and programming, I orchestrated the entire app development process, spanning front to back end. Employing the **MEAN stack**, the experience was both enjoyable and challenging. Initially centered around a voucher feature, I elevated the project by incorporating **table reservations** and **food ordering**, elevating its scope. \n\nEnsuring seamless communication between the backend API and UI, my commitment to quality extended to designing a flawless **user interface**. My goal was to enhance user experience significantly. Additionally, I handled everything from **logo design** to **name cards** and **database architecture** for the complete F&B system.',
      thumbnail: '/images/RDP1.png',
      imageUrls: ['/images/RDP1S1.png', '/images/RDP1S2.png', '/images/RDP1S3.png']
    },
    {
      title: 'Vouplan',
      subtitle: 'Restaurant management system',
      description: 'Effortlessly manage customer vouchers, reservations, and food orders, reducing operational costs.',
      longDescription: "Within the comprehensive F&B system, I specifically crafted the **restaurant owner's app**, prioritizing streamlined management. One of the most intricate aspects was optimizing the **food ordering functionality**, considering the varied preferences of patrons. This demanded intricate **database structuring** and **UI design** to ensure an intuitive interface for kitchen staff, catering to their specific needs while maintaining simplicity. \n\nThis project not only expanded my technical skills in frameworks but also honed my ability to interpret and integrate essential features aligned with the restaurant's operational requirements. It highlighted my proficiency in **database design**, **UI/UX development**, and effective communication with end-users. Through this journey, I've developed a knack for navigating complex challenges while ensuring a **user-centric approach**, ultimately enhancing the overall efficiency of restaurant operations.",
      thumbnail: '/images/RDP2.png',
      imageUrls: ['/images/RDP2S1.png', '/images/RDP2S2.png', '/images/RDP2S3.png']
    },
    {
      title: 'Excel Macro Tools',
      subtitle: 'Transform your spreadsheet experience',
      description: 'Customize properties, create named ranges, and import data effortlessly. Generate data dynamically, tailor to your needs. Elevate your Excel game',
      longDescription: "Within my 2-year tenure as a dedicated software engineer, I've crafted impactful **VBA and C# tools**, revolutionizing operations within Microsoft Office. Entrusted with enhancing efficiency and eradicating errors, I've completed over **100 coding tasks** and **90 research projects**, showcasing a primary expertise in **VBA**. \n\nIn parallel, I've spearheaded the development of a user-friendly Excel spreadsheet tool. This comprehensive solution empowers users with **customizable properties**, **named ranges**, seamless **data import**, and **on-the-fly data generation**. Designed with a user-centric approach, it streamlines Excel data management, ensuring efficiency in tailored spreadsheet needs, effortless external data integration, and dynamic data generation, catering comprehensively to Excel users' requirements.",
      thumbnail: '/images/RDP3.png',
      imageUrls: ['/images/RDP3S1.png', '/images/RDP3S2.png']
    },
    {
      title: 'Portfolio Website',
      subtitle: 'Yes, the website you are looking at!',
      description: 'I developed this website within 5 days while simultaneously mastering a new framework and programming language.',
      longDescription: "Venturing beyond my expertise in the MEAN stack, I embarked on a journey to explore the **MERN stack** while developing my portfolio website. What you're experiencing right now is the result of that exploration. The transition from **MEAN to MERN** was not just about adopting a new framework; it was about embracing **React's user-friendly nature**, integrating libraries that resonate like a harmonious melody within the website's architecture.\n\nThis journey not only expanded my technical skills but also highlighted my **adaptability** in swiftly transitioning between frameworks. The foundational knowledge I cultivated in the MEAN stack seamlessly translated into the MERN stack, enabling a smooth integration process. The joy of witnessing the React framework seamlessly blend into this website reaffirmed my passion for creating **intuitive and engaging digital experiences**. This project not only serves as my portfolio but also as a testament to my **versatility as a full stack developer**.",
      thumbnail: '/images/RDP4.png',
      imageUrls: ['/images/RDP4S1.png', '/images/RDP4S2.png']
    },
    {
      title: 'Member Card App',
      subtitle: 'Seamless Membership Management',
      description: 'Effortlessly manage memberships, rewards, and exclusive offers with our intuitive member card app. Simplify access, enhance loyalty, and unlock a world of perks.',
      longDescription: "Opting for a **hybrid app approach** not only streamlined the learning curve but also added considerable value for customers. In just **9 productive hours**, I conceptualized and developed a member card system. Having spearheaded a large-scale F&B system in the past, this project felt like second nature, enabling me to allocate extensive focus on coding intricacies, strengthening the system's **resilience and efficiency**. \n\nThis undertaking underscored my prowess in leveraging hybrid app development to swiftly deliver valuable solutions. My experience in overseeing complex F&B systems equipped me with a comprehensive understanding of user needs and system functionalities. This proficiency allowed me to allocate more time and effort towards **code optimization**, ensuring a robust and reliable member card system tailored to meet the demands of both users and the business.",
      thumbnail: '/images/RDP5.png',
      imageUrls: ['/images/RDP5S1.png', '/images/RDP5S2.png', '/images/RDP5S3.png', '/images/RDP5S4.png']
    },
    {
      title: 'Python Tools',
      subtitle: 'Streamline repetitive tasks',
      description: 'Python enables a myriad of tasks—database reading, web scraping, automatic screenshots, even calculators and translators. Unlock a world of possibilities with Python.',
      longDescription: "During my leisure hours, I immerse myself in content creation for my personal **YouTube channel**. While engaged in this pursuit, I noticed repetitive and mundane tasks that demanded my attention. This realization sparked the inception of small tools in my mind. As they say, **a good programmer is also a lazy programmer**—I began channeling my experiences into **Python**, gradually building a repository of portable tools tailored to my work. \n\nThe evolution of these Python tools has been nothing short of astounding. Implementing them **slashed my workload by a staggering 75%**, ensuring consistent and reliable outcomes without fail. This journey not only showcased the power of automation but also honed my programming skills. It highlighted my knack for identifying inefficiencies and devising efficient solutions, underscoring my ability to leverage **Python's versatility** in simplifying complex tasks and boosting productivity.",
      thumbnail: '/images/RDP6.png',
      imageUrls: ['/images/RDP6S1.png', '/images/RDP6S2.png']
    }
  ],
  AD: [
    {
      title: ' Logo Design',
      subtitle: 'Crafting Visual Identities that Speak',
      description: 'Dive into the art of logo design—a realm where visual storytelling meets brand essence. Immerse yourself in my journey of creating captivating logos that resonate with audiences and echo brand narratives.',
      longDescription: "Embark on a visual odyssey into the realm of **logo design**—where narratives are etched into imagery. I specialize in crafting **compelling logos** that transcend mere visuals; each design encapsulates brand essence, sparking connections with audiences. From **ideation to execution**, my journey unfolds through captivating visuals that mirror brand ethos and resonate profoundly. Witness my creative prowess—merging artistry and strategy to sculpt impactful visual identities. My skill set encompasses **intuitive brand interpretation**, **precise conceptualization**, and an acute understanding of **design psychology**. Experience the fusion of creativity and purpose, where every stroke embodies a brand's story.",
      thumbnail: '/images/ADP1.png',
      imageUrls: ['/images/ADP1S1.png', '/images/ADP1S2.png']
    },
    {
      title: 'Product Post Design',
      subtitle: 'Elevate Brand Stories Through Visuals',
      description: 'Delve into the art of crafting compelling product posts that captivate audiences and narrate brand journeys. Explore how each visual element intertwines with brand narratives to create engaging stories.',
      longDescription: "Discover the magic of creating **eye-catching product posts** that tell amazing brand stories. Dive into my world where each picture and word work together to make brands come alive. See how I put **visuals and stories together** to make posts that people love. I'm skilled in arranging pictures and words to make brands look great and tell their stories. Join me in exploring how **visuals make brands shine** in every post!",
      thumbnail: '/images/ADP2.png',
      imageUrls: ['/images/ADP2S1.png', '/images/ADP2S2.png', '/images/ADP2S3.png']
    },
    {
      title: 'T-Shirt Design',
      subtitle: 'Unleashing Artistry Through Wearables',
      description: ' Explore the realm of wearable artistry where every stitch and hue tells a unique story. Dive into my world of T-shirt design, where creativity meets comfort, delivering captivating narratives through fashion.',
      longDescription: "Enter the captivating world of **T-shirt design**—a canvas where creativity meets wearable art. With a passion for crafting visually engaging narratives through fashion, I embark on a journey into this vibrant realm. Exploring the fusion of **colors, shapes, and stories**, I'm driven by the thrill of transforming concepts into wearable expressions. While my experience may be budding, my **dedication and enthusiasm** shine through every design endeavor. Join me in discovering the magic of T-shirt design, where each stitch is a step towards weaving captivating tales on fabric!",
      thumbnail: '/images/ADP3.png',
      imageUrls: ['/images/ADP3S1.png', '/images/ADP3S2.png', '/images/ADP3S3.png', '/images/ADP3S4.png']
    },
    {
      title: 'Banner Design',
      subtitle: 'Crafting Visual Statements for Impact',
      description: 'Explore the artistry behind impactful banners that capture attention and convey messages succinctly. Delve into my expertise in creating visually compelling banners that elevate brand communication and resonate with audiences.',
      longDescription: "Discover the craft behind impactful banners—an art form that **commands attention** and communicates messages with precision. Immerse yourself in my world of banner design, where expertise meets creativity to **amplify brand communication**. While specializing in crafting visually striking banners for **Facebook ads, shop promotions, and menu designs**, I harness the power of design to engage audiences effectively. Every banner I create is a blend of **aesthetics and strategic messaging**, tailored to captivate and resonate with viewers. Join me in exploring the artistry of banners, where each design is meticulously crafted to make a **lasting impact**.",
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
              <Card
                key={index}
                style={{
                  height: '470px',
                  margin: '30px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  height="150" // This attribute is good, but let's ensure CSS also controls it.
                  image={project.thumbnail}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '150px', // Explicitly setting CSS height here
                    objectFit: 'cover',
                  }}
                  sx={{ borderBottom: "1px solid #ccc" }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        fontWeight: "bold",
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{
                        fontStyle: "italic",
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {project.subtitle}
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{
                        height: "100px",
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {project.description}
                    </Typography>
                  </Box>
                  <StyledButton
                    variant="contained"
                    startIcon={<EyeIcon />}
                    onClick={() => handleOpenModal(project)}
                    $profileType={selectedProfile}
                    sx={{
                      padding: "7px 25px",
                      borderRadius: "10px",
                      mt: 2,
                    }}
                  >
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