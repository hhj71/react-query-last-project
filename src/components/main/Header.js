import { Fragment,useState,useRef } from "react"
import {Link} from "react-router-dom"
import {useQuery} from "react-query";
import apiClient from "../../http-commons"
/*
   로그인 => React / SpringBoot => port가 틀리다 매칭이 안된다 (서버에 session,cookie 저장이 안된다)
            1. React => 서버로 전송 (id,pwd)
            2. 서버에 존재여부 확인
               => session에 저장할 데이터를 가지고 온다
               => localStorage에 저장 (자바스크립트 세션)
               => sessionStorage => setItem("key","value")
               => clear()
 */
function Header(){
    // 로그인 관련
    // 서버와 연결후 로그인 여부 확인 => sessionScope.id!=null
    const [login,setLogin] = useState(false)
    const [id, setId] = useState('')
    const [pwd, setPwd] = useState('')
    const idRef=useRef(null)
    const pwdRef = useRef(null)
    // return 안에서는 제어문 사용할 수 없다
    // {}  if / for은 사용이 안된다
    // window.sessionStorage.getItem("name") => session값을 읽어올때 사용
    // 서버 연결
    const {isLoading,isError,error,data,refetch:loginOk}=useQuery(['login-ok'],
        async ()=>{
            return await apiClient.get(`/member/login/${id}/${pwd}`)
        },
        {
            // {data = res}
            onSuccess:(res)=>{
                if(res.data.msg==='NOID')
                {
                    // 다시 입력
                    alert("아이디가 존재하지 않습니다")
                    setId('')
                    setPwd('')
                    idRef.current.focus()
                }
                else if(res.data.msg==="NOPWD")
                {
                    // 다시 입력
                    alert("비밀번호가 틀립니다")
                    setPwd('')
                    pwdRef.current.focus()
                }
                else if(res.data.msg==="OK")
                {
                    //  session에 저장
                    window.sessionStorage.setItem('id',res.data.id)
                    window.sessionStorage.setItem('name',res.data.name)
                    window.sessionStorage.setItem('sex',res.data.sex)
                    setLogin(true)
                }
            }
        },
        {
            // {error = res}
            onError:(err)=>{
                console.log(err.response)
            }
        }
    )
    const memberLogin=()=>{
        if(id.trim()==="")
        {
            idRef.current.focus() // $('#id').focus()
            // this.$refs.id.focus()
            // vue , react => 자바스크립트 기반
            return
        }
        else if(pwd.trim()==="")
        {
            pwdRef.current.focus()
            return
        }

        loginOk()
    }
    const memberLogout=()=>{
        window.sessionStorage.clear() // session.invalidate()
        setId('')
        setPwd('')
        setLogin(false)
        /*
            1. session에 저장  window.sessionStorage.setItem(키,값)
                              session.setAttribute(키,값)
            2. session 값 읽기 window.sessionStorage.getItem(키)
                              session.getAttribute(키)
            3. session 삭제 window.sessionStorage.clear()
                              session.invalidate()
         */
    }
    return (
        <Fragment>
            <div className="top_header_area">
                <div className="container">
                    <div className="row">
                        <div className="col-5 col-sm-6">

                            <div className="top_social_bar">
                                <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-skype" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-dribbble" aria-hidden="true"></i></a>
                            </div>
                        </div>

                        <div className="col-7 col-sm-6">
                            <div className="signup-search-area d-flex align-items-center justify-content-end">
                                <div className="login_register_area d-flex">
                                    {
                                        !login &&
                                        <div className="login">
                                            ID:<input type={"text"} size={"10"} className={"input-sm"}
                                                      value={id}
                                                      ref={idRef}
                                                      onChange={(e)=>setId(e.target.value)}
                                        />
                                            &nbsp;
                                            PW:<input type={"password"} size={"10"} className={"input-sm"}
                                                      value={pwd}
                                                      ref={pwdRef}
                                                      onChange={(e)=>setPwd(e.target.value)}
                                        />
                                            {/* v-model이 없다 , onChange사용 */}
                                            &nbsp;
                                            <button className={"btn-sm btn-outline-danger"}
                                                    onClick={memberLogin}
                                            >로그인</button>
                                        </div>
                                    }
                                    {
                                        login &&
                                        <div className="login">
                                            {window.sessionStorage.getItem("name")}님 로그인 중입니다&nbsp;
                                            <button className={"btn-sm btn-outline-primary"}
                                                    onClick={memberLogout}
                                            >로그아웃</button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <header className="header_area">
                <div className="container">
                    <div className="row">

                        <div className="col-12">
                            <div className="logo_area text-center">
                                <Link to={"/"} className="yummy-logo">React-Query</Link>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <nav className="navbar navbar-expand-lg">
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#yummyfood-nav" aria-controls="yummyfood-nav" aria-expanded="false"
                                        aria-label="Toggle navigation"><i className="fa fa-bars"
                                                                          aria-hidden="true"></i> Menu
                                </button>

                                <div className="collapse navbar-collapse justify-content-center" id="yummyfood-nav">
                                    <ul className="navbar-nav" id="yummy-nav">
                                        <li className="nav-item active">
                                            <Link className="nav-link" to={"/"}>Home <span
                                                className="sr-only">(current)</span></Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="yummyDropdown"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">맛집</a>
                                            <div className="dropdown-menu" aria-labelledby="yummyDropdown">
                                                <Link className="dropdown-item" to={"/food/list"}>맛집 목록</Link>
                                                <Link className="dropdown-item" to={"/food/find"}>맛집 검색</Link>
                                                <Link className="dropdown-item" to={"/food/recommand"}>맛집 추천</Link>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="yummyDropdown"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">서울여행</a>
                                            <div className="dropdown-menu" aria-labelledby="yummyDropdown">
                                                <a className="dropdown-item" href={"/seoul/location"}>명소</a>
                                                <a className="dropdown-item" href={"/seoul/nature"}>자연</a>
                                                <a className="dropdown-item" href={"/seoul/shop"}>쇼핑</a>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href={"/board/list"}>스토어</a>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/board/list"}>커뮤니티</Link>
                                        </li>

                                        <li className="nav-item">
                                            <a className="nav-link" href={"/news/list"}>뉴스검색</a>
                                        </li>

                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </Fragment>

    )
}

export default Header