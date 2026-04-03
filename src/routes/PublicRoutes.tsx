import AboutPage from "@/pages/Public/About/About";
import ContactPage from "@/pages/Public/Contact/Contact";
import Portfolio from "@/pages/Public/Portfolio/Portfolio";
import ProjectsPage from "@/pages/Public/Project/Project";
import ProjectDetails from "@/pages/Public/Project/ProjectDetails";
import SkillsPage from "@/pages/Public/Skill/Skill";
import { Code, Home, MessageSquare, User } from "lucide-react";

export const publicRoutes = [
  {
    label: "Portfolio",
    index: true,
    path: "/",
    element: <Portfolio />,
    icon: <Home />,
  },
  {
    label: "About",
    path: "/about",
    element: <AboutPage />,
    icon: <User />,
  },
  {
    label: "Skills",
    path: "/skills",
    element: <SkillsPage />,
    icon: <Code />,
  },
  {
    label: "Contact",
    path: "/contact",
    element: <ContactPage />,
    icon: <MessageSquare />,
  },
  {
    label: "Projects",
    path: "/projects",
    element: <ProjectsPage />,
    icon: <Code />,
  },
  {
    label: "ProjectDetails",
    path: "/project/:id",
    element: <ProjectDetails />,
  },
];
