import http from "./api";
import { AxiosGet } from "@/assets/type/index";

class AxiosApi {
    get(url:string,names?:AxiosGet[]): Promise<any>{
        let urls = url;
        if(names){
            names.forEach((na,i) => {
                urls += `${!i ? '?' : '&'}${na.key}=${na.value}`
            })
        }
        return http.get(urls)
    }

    post(url:string,req:object): Promise<any>{
        return http.post(url,req)
    }

}


export default new AxiosApi();