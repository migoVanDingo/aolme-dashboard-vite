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
      title: "Repositories",
      callback: () => console.log("Repositories"),
      icon: faDatabase,
    },
    {
      title: "Datasets",
      callback: () => console.log("Resources"),
      icon: faServer,
    },
    {
      title: "Organizations",
      callback: () => console.log("Organizations"),
      icon: faPeopleGroup,
    },
    {
      title: "Resources",
      callback: () => console.log("Resources"),
      icon: faBriefcase,
    },
    {
      title: "Settings",
      callback: () => console.log("Settings"),
      icon: faGear,
    },
  ]