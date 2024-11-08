import {Fragment,useState,useEffect,useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useMutation} from "react-query";
import apiClient from "../../http-commons"
/*
    useQuery : 단일 URL을 사용해서 데이터를 읽어 오는 경우에 사용
    useMutation : 특정 데이터를 처리 => DML (INSERT,UPDATE,DELETE)
        POST / PUT / DELETE
 */

/*
     Fragment :  임시 루트 태그
     useState : 데이터가 변경이 되면 => HTML에 적용하는 변수
     useEffect : 서버와 연결 => 1번만 수행 , 재호출
       [] => 1번 수행
       [변수] => 재호출 => 변수값이 변경이 된 경우
     useRef : 태그 제어 => focus() => this.$refs.name.focus()
              nameRef.current.focus()
     axios : 서버와 연결
        | fetch  ===> 비동기/동기
     async axios : 비동기 => 여러개를 수행할때 따라 수행
     sync axios  : 동기  => 전체 데이터 읽으면 다음 수행
     Navigate : history => 이전 페이지 이동
 */
function BoardInsert() {
    const nav = useNavigate();
    const nameRef = useRef(null);
    const subjectRef = useRef(null);
    const contentRef = useRef(null);
    const pwdRef = useRef(null);
    // 변수
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [pwd, setPwd] = useState("");
    const [result, setResult] = useState("");
    // 서버로부터 데이터 전송
    const {isLoading,mutate:insert}=useMutation(
        async ()=>{
            return await apiClient.post(`/board/insert`,{
                name:name,
                subject:subject,
                content:content,
                pwd:pwd
            })
        },
        {
            onSuccess:(res)=>{
                if(res.data.msg==="yes")
                {
                    window.location.href="/board/list";
                }
            }
        },
        {
            onError:(err)=>{
                console.log(err)
            }
        }
    )
    const boardInsert=()=>{
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
        insert()
    }
    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(../img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>글쓰기</h2>
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
                                        <button className={"btn-sm btn-primary"} onClick={boardInsert}>글쓰기</button>
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

export default BoardInsert