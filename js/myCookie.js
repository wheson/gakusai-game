function setCookie(key,val){
    var tmp = key+"="+encodeURIComponent(val)+";";
    tmp += "expires=Fri, 31-Dec-2030 23:59:59;";
    document.cookie = tmp;
}
function getCookie(key){
    var tmp = document.cookie+";";
    var tmp1 = tmp.indexOf(key,0);
    if(tmp1 != -1){
        tmp = tmp.substring(tmp1,tmp.length);
        start = tmp.indexOf("=",0);
        end = tmp.indexOf(";",start);
        return(decodeURIComponent(tmp.substring(start+1,end)));
    }
    return("");
}
