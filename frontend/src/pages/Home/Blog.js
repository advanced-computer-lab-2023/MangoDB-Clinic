import * as React from "react";
import { Link } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import post1 from "./blog-post.1.md";
import post2 from "./blog-post.1.md";
import post3 from "./blog-post.1.md";
const Icon = `${process.env.PUBLIC_URL}/icons/pharmacyLogo2.svg`;
const ClinicHome1 = `${process.env.PUBLIC_URL}/icons/clinicHome1.jpg`;
const ClinicHome2 = `${process.env.PUBLIC_URL}/icons/clinicHome2.jpg`;
const ClinicHome3 = `${process.env.PUBLIC_URL}/icons/clinicHome3.jpg`;
const sections = [];

const mainFeaturedPost = {
  title: "Welcome to MangoDB Virtual Clinic",
  description:
    "A comprehensive virtual healthcare platform that seamlessly connects patients, doctors, and administrators. Experience a healthcare ecosystem built on accessibility, efficiency, and security, enhancing every interaction within the system.",
  image: ClinicHome1,
  imageText: "MangoDB Virtual Clinic",
  linkText: (
    <Link to="./register" sx={{ color: "#fff" }}>
      Join now!
    </Link>
  ),
};

const featuredPosts = [
  {
    title: "No more waiting!",
    date: "",
    description:
      "Book all your appointments with the finest doctors all with a click of the button without spending hours to get your turn",
    description:
      "Empower doctors with tools to efficiently manage prescriptions, appointments, and patient interactions.",
    image: ClinicHome2,
  },
  {
    title: "Available 24/7",
    description:
      "Whether you're not feeling well or you simply dont know how to apply a prescribed medine , our doctors are available 24/7 to help you!",
    image: ClinicHome3,
    imageLabel: "Doctor Services",
  },
];

const posts = [
  "MangoDB Virtual Clinic is your gateway to a revolutionary healthcare experience. Built on principles of accessibility, efficiency, and security, our platform aims to simplify healthcare interactions. Whether you're a patient, doctor, or administrator, our user-friendly interface ensures seamless navigation and high accessibility.",
  "",
  "",
];
const sidebar = {
  title: "About",
  description:
    "Join us on the journey towards a more streamlined and effective healthcare experience. MangoDB Virtual Clinic is committed to bridging the gap between patients, doctors, and administrators through cutting-edge technology and a user-centric approach.",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" },
  ],
  social: [
    {
      name: "GitHub",
      icon: GitHubIcon,
      url: "https://github.com/advanced-computer-lab-2023/MangoDB-Clinic", // replace with your GitHub profile URL
    },
  ],
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Blog" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="Who are we?" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer title="El7a2ny" />
    </ThemeProvider>
  );
}
