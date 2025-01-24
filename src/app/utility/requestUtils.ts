export class RequestUtils {
    public static formatQueryParams(args: any) {
        let queryStr = "?"
        // for each arg field add to the query string
        for (let key in args) {
            if (args.hasOwnProperty(key)) {
                queryStr += key + "=" + args[key] + "&"
            }
        }

        // remove the last character
        queryStr = queryStr.slice(0, -1)
        console.log("queryStr:", queryStr)
        return queryStr
    }
}