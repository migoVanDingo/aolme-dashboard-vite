import { faBriefcase, faDatabase, faGear, faPeopleGroup, faPlus, faServer, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons"

export const repoTabs = [
    {
      title: "Personal",
      type: "PERSONAL",
      action: "",
      icon: faUser,
    },
    {
      title: "Public",
      type: "PUBLIC",
      action: "",
      icon: faUserGroup,
    },
    {
      title: "New Repo",
      type: "NEW",
      action: "",
      icon: faPlus,
    },
  ]
  
  export const headerTabs = [
    {
      title: "Projects",
      id: "projects",
      callback: () => console.log("Projects"),
      icon: faDatabase,
      path: "/profile/projects",
    },
    {
      title: "Datastores",
      id: "datastores",
      callback: () => console.log("Datastores"),
      icon: faServer,
      path: "/profile/datastores",
    },
    {
      title: "Teams",
      id: "teams",
      callback: () => console.log("Teams"),
      icon: faPeopleGroup,
      path: "/profile/teams",
    },
    {
      title: "Resources",
      id: "resources",
      callback: () => console.log("Resources"),
      icon: faBriefcase,
      path: "/profile/resources",
    },
    {
      title: "Settings",
      id: "settings",
      callback: () => console.log("Settings"),
      icon: faGear,
      path: "/profile/settings",
    },
  ]