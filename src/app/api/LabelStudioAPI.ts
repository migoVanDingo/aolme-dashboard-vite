import { ILabelSubset } from "../utility/interface/dataset"
import { Requests } from "./Requests"

export interface ICreateLabelStudioProject {
  name: string
  description: string
  owner: string
  created_by: string
  repo_id?: string
  subset_id?: string
  dataset_id?: string
  entity_id?: string
}

export class LabelStudioAPI {
  public static async initializeLabelStudioProject(
    payload: ICreateLabelStudioProject
  ) {
    return await Requests.doPost(payload, "/api/label_studio/project")
  }

  public static async getLabelStudioProjectByRepoId(repoId: string) {
    return await Requests.doGet("/api/label_studio/repo/" + repoId)
  }

  public static async getLabelStudioProjectBySubsetId(subsetId: string) {
    return await Requests.doGet("/api/label_studio/subset/" + subsetId)
  }

  public static async syncLabelStudioFiles(
    payload: ILabelSubset,
    fileSetId: string = ""
  ) {
    let path = ""
    if (fileSetId !== "") {
      path =
        "/api/dataset/subset/sync-label-studio-files?file_set_id=" + fileSetId
    } else {
      path = "/api/dataset/subset/sync-label-studio-files"
    }
    return await Requests.doPost(payload, path)
  }

  public static async syncImportStorage(importId: string, payload: any) {
    return await Requests.doPost(
      payload,
      "/api/label_studio/sync_import_storage/" + importId
    )
  }
}
