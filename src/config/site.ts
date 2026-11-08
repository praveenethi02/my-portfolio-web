// Central place for site-wide text and links.
// On Day 3 the social links move to the database so they can be edited from /admin.

export type NavLink = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Praveen Ethipola",
  shortName: "Praveen",
  title: "Computer Engineering Undergraduate",
  description:
    "I build modern web applications and enjoy turning ideas into clean, working software.",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/skills" },
    { label: "Experience", href: "/experience" },
    { label: "Activity", href: "/activity" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
  socialLinks: {
    github: "https://github.com/praveenethi02",
    linkedin: "https://www.linkedin.com/in/praveen-ethipola-390b37345",
    // Leave empty to hide the Jira icon until there is a public link to share
    jira: "",
  },
};
