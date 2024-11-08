import {Fragment,useState,useRef,useEffect} from "react";
import {useParams,useNavigate,Link} from "react-router-dom";
import apiClient from "../../http-commons"
import {useQuery,useMutation} from "react-query";
// axios

function BoardUpdate(){
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [pwd, setPwd] = useState("");
    const nameRef = useRef(null);
    const subjectRef = useRef(null);
    const contentRef = useRef(null);
    const pwdRef = useRef(null);
    const nav=useNavigate()
    const {no}=useParams()
    // 데이터 한번 읽기 => useQuery
    // ['board-update',no] => no가 변경되면 axios를 수행
    // 데이터 캐싱 => staleTime:5*60*1000 => 같은 키인 경우에는 서버를 연결하지 않고
    // 메모리에 저장된 데이터를 출력 ==> refetch => 재수행 (서버연결)
    const {isLoading,isError,error,data}=useQuery(['board-update',no],
        async ()=>{
            return await apiClient.get(`/board/update/${no}`)
        },
        {
            onSuccess:(res)=>{
                // v-model="name"
                // vo=res.data
                setName(res.data.name)
                setSubject(res.data.subject)
                setContent(res.data.content)
            }
        },
        {
            onError:(err)=>{
                console.log(err.response)
            }
        }
    )
    // react => 화면 출력 (View) => CRUD  (게시판)
    // 페이징 / CHILD
    // react문법 => 라이브러리 => 자바스크립트 문법
    // 자바스크립트 : Cookie / Session
    // 수정 버튼 => 수정 요청 => useMutation
    const boardUpdate=()=>{
        if(name.trim()==="")
        {
            nameRef.current.focus()
            return
        }
        else if(subject.trim()==="")
        {
            subjectRef.current.focus()
            return
        }
        else if(content.trim()==="")
        {
            contentRef.current.focus()
            return
        }
        else if(pwd.trim()==="")
        {
            pwdRef.current.focus()
            return
        }

        boardUpdateOk()
    }
    const {mutate:boardUpdateOk}=useMutation(
        async () =>{
            return await apiClient.put(`/board/update_ok/${no}`,{
                name:name,
                subject:subject,
                content:content,
                pwd:pwd
            })
        },
        {
            onSuccess:(res)=>{
                if(res.data.msg==='yes') // 비밀번호가 맞는 경우
                {
                    // detail로 이동
                    window.location.href="/board/detail/"+no
                }
                else // 비밀번호가 틀린 경우
                {
                    alert("비밀번호가 틀립니다!!")
                    setPwd("")
                    pwdRef.current.focus()
                }
            }
        },
        {
            onError:(err)=>{
                console.log(err)
            }
        }
    )
    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(../img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>수정하기</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="breadcumb-nav">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">

                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <section className="archive-area section_padding_80" id="listApp">
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            {/*화면 출력*/}
                            <table className={"table"}>
                                <tbody>
                                <tr>
                                    <th className={"text-center"} width={"15%"}>이름</th>
                                    <td width={"85%"}>
                                        <input type={"text"} size={"20"} className={"input-sm"}
                                               ref={nameRef}
                                               onChange={(e) => setName(e.target.value)}
                                               value={name}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th className={"text-center"} width={"15%"}>제목</th>
                                    <td width={"85%"}>
                                        <input type={"text"} size={"60"} className={"input-sm"}
                                               ref={subjectRef}
                                               onChange={(e) => setSubject(e.target.value)}
                                               value={subject}

                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th className={"text-center"} width={"15%"}>내용</th>
                                    <td width={"85%"}>
                                        <textarea rows={"10"} cols={"62"}
                                                  ref={contentRef}
                                                  onChange={(e) => setContent(e.target.value)}
                                                  value={content}
                                        ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <th className={"text-center"} width={"15%"}>비밀번호</th>
                                    <td width={"85%"}>
                                        <input type={"password"} size={"10"} className={"input-sm"}
                                               ref={pwdRef}
                                               onChange={(e) => setPwd(e.target.value)}
                                               value={pwd}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={"2"} className={"text-center"}>
                                        <button className={"btn-sm btn-primary"} onClick={boardUpdate}>수정</button>
                                        <button className={"btn-sm btn-primary"} onClick={()=>nav(-1)}>취소</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
export default BoardUpdate