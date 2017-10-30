function setCookie(key,val){
    tmp = key+"="+escape(val)+";";
    tmp += "expires=Fri, 31-Dec-2030 23:59:59;";
    document.cookie = tmp;
}
function getCookie(key){
    tmp = document.cookie+";";
    tmp1 = tmp.indexOf(key,0);
    if(tmp1 != -1){
        tmp = tmp.substring(tmp1,tmp.length);
        start = tmp.indexOf("=",0);
        end = tmp.indexOf(";",start);
        return(unescape(tmp.substring(start+1,end)));
    }
    return("");
}