class Routes {
  static ROOT = "/";
  static PROFILE = "/profile";
  static PROFILE_PROJECTS = "/profile/projects";
  static PROFILE_DATASTORES = "/profile/datastores";
  static PROFILE_TEAMS = "/profile/teams";
  static PROFILE_RESOURCES = "/profile/resources";
  static PROFILE_SETTINGS = "/profile/settings";
  static PROFILE_PROJECTS_CREATE = "/profile/projects/create";
  static PROFILE_DATASTORE_CREATE = "/profile/datastores/create";
  static PROJECT_VIEW = "/project/:projectName";
  static PROJECT_FILES = "/project/:projectName/files";
  static PROJECT_DATASETS = "/project/:projectName/datasets";
  static PROJECT_PIPELINES = "/project/:projectName/pipelines";
  static PROJECT_RESULTS = "/project/:projectName/results";
  static PROJECT_DISCUSSION = "/project/:projectName/discussion";
  static PROJECT_SETTINGS = "/project/:projectName/settings";
  static SIGNUP = "/signup";
  static SETTINGS = "/settings";
  static REPOSITORY = "/repository/:repoName";
  static ORGANIZATION_CREATE = "/organization/create";
  static ORGANIZATION = "/organization/:orgName";
  static ORG_DATASET = "/organization/:orgName/datasets";
  static ORG_DATASET_VIEW = "/organization/:orgName/datasets/:datasetName";
  static ORG_DATASET_CREATE_SUBSET = "/organization/:orgName/datasets/:datasetName/subset";
  static ORG_DATASTORE_DASHBOARD = "/organization/:orgName/datastore/dashboard";
  static ORG_DATASTORE_VIEW = "/organization/:orgName/datastore/:datastoreName";
  static ORG_DATASTORE_VIEW_LIST = "/organization/:orgName/datastore/:datastoreName";
  static ORG_DATASTORE_SUBSET_DETAILS = "/organization/:orgName/datastore/:datastoreName/subset/:subsetId";
  static ORG_USERS = "/organization/:orgName/users";
  static ORG_REPOS = "/organization/:orgName/repositories";
  static ORG_MODULES = "/organization/:orgName/modules";
  static ORG_SETTINGS = "/organization/:orgName/settings";
  static LOGIN = "/login";
}

export default Routes;
