import { Notice } from './../model/Notice';
export const dateFormatter = (results:Notice[]) =>{
    results = results.map((result)=>{
        const date = new Date(result.noticeOpeningDate);
        result.noticeOpeningDate = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear(); 
        return result;
    })
    return results
}