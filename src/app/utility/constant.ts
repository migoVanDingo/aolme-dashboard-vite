export default class Constant {

    public static readonly DAO_SERVICE_PORT = "5010"
    public static readonly DATA_PROCESSING_SERVICE_PORT = "5011"
    public static readonly DATASTORE_SERVICE_PORT = "5012"
    public static readonly PROJECT_SERVICE_PORT = "5013"
    public static readonly USER_SERVICE_PORT = "5014"
    public static readonly TEAM_SERVICE_PORT = "5015"
    public static readonly LABEL_STUDIO_INTEGRATION_SERVICE_PORT = "5016"

    public static readonly service = {

        datastore_manager: {
            file_handler: {
                FILE_UPLOAD: "/api/datastore/file/upload",
                GET_FILE_LIST: "/api/datastore/file/list",
                DOWNLOAD: "/api/datastore/file/download",
                MOVE: "/api/datastore/file/move",
                DELETE: "/api/datastore/file/delete",
                COPY: "/api/datastore/file/copy",
            }
        }
    }
}