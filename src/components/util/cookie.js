import {Cookies} from "react-cookie";

const cookies = new Cookies();
// ... 기존의 데이터 +
/*
     let arr=[1,2,3,4,5]
     let arr2=[...arr,6,7,8]
              ===== Redux
 */
// 쿠키 저장
// Cookie cookie=new Cookie(키,값) => 문자열만 저장이 가능
export const setCookie = (name, value,options) => {
    return cookies.set(name, value, {...options});
}
// 쿠키 한개 읽기
// Cookie[] cookies=request.getCookies()
// Cookie cookie=cookies[0].setName("aaa")
export const getCookie = (name) => {
    return cookies.get(name);
}
// 쿠키 전체 읽기
// Cookie[] cookies=request.getCookies()
export const getAll=()=>{
    return cookies.getAll()
}