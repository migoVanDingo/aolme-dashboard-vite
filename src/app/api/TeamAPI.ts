import Constant from "../utility/constant";
import { Requests } from "./Requests";

export default class TeamAPI {
    public static createTeam(payload: any) {
        return Requests.doPost(payload, "/api/team", Constant.TEAM_SERVICE_PORT);
    }

    public static getTeamList(args: any) {
        let queryStr = "?";
        // for each arg field add to the query string
        for (let key in args) {
            if (args.hasOwnProperty(key)) {
                queryStr += key + "=" + args[key] + "&";
            }
        }

        // remove the last character
        queryStr = queryStr.slice(0, -1);

        return Requests.doGet("/api/team/all" + queryStr, Constant.TEAM_SERVICE_PORT);
    }

    public static getTeam(args: any){
        let queryStr = "?"
        // for each arg field add to the query string
        for (let key in args){
            if(args.hasOwnProperty(key)){
                queryStr += key + "=" + args[key] + "&"
            }
        }

        // remove the last character
        queryStr = queryStr.slice(0, -1)

        return Requests.doGet('/api/team' + queryStr, Constant.TEAM_SERVICE_PORT)
    }
}