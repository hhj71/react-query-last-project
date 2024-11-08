import {Fragment,useRef,useState} from "react";
import {useQuery,useMutation} from "react-query";
import {useNavigate,Link,useParams} from "react-router-dom";
import apiClient from "../../http-commons"
/*
     Fragment : 임시 루트 태그 => tree형태 태그한개안에 전체가 첨부
                xml형식
                <Fragment>
                  <div></div>
                  <div></div>
                </Fragment>
     useRef : input / button => 태그를 제어 (focus,disable...)
     useState : 데이터변경시 => HTML에 적용
     useQuery : 서버와 연결
                => 서버 상태 확인
                   = 에러 / 정상 ==> isError
                   = 네트워크 지연 ==> isLoading
                   = 데이터값 읽기
                   = SELECT
     useMutation : 서버 연결
                => 데이터 변경 => DML (INSERT,UPDATE,DELETE)
     useNavigate : history => nav(-1) nav(1)
                              back()  forward()
     Link : <a>
     useParams : 다른 화면에서 데이터 전송 getParameter()
 */
/*
      function A()
      {
      }

      => A() (X)
      => <A/> ==> 함수 호출 ==> return값(XML)을 받아서 => render()
                                                       =========
                                                       XML => HTML으로 변환 => index.html에 추가
      function B(props)
      {
          => props.name
                   ==== 속성명
          => props.age
      }

      <B name="" age=""/>  => 변경할 수 없다 , 데이터값만 받을 수 있다

      function C()
      {
          const [name,setName]=useState('심청이')
          <D name={name}/> : 매개변수를 전송
           => child
      }
      function D(props)
      {
      }

      public void display()
      {
          int a=10;
          aaa(a)
      }
      public void aaa(int a)
      {
      }

      => 목록 ==> 상세보기
      => props => 매개변수 (속성을 이용) => 불변 => HTML에 적용
      => state => 서버에서 데이터를 받아서 저장하는 변수  ===> data(){}
          | 변경시마다 => HTML에 바로 적용한다
          | let (X) => useState() => 설정된 변수 => HTML에 적용
      let app=Vue.createApp({
         data(){
            return {
              변수 선언 ...
            }
         }
      })
      // class형 사라졌다 ===> function : state , 기능 ==> Hooks (17버전) => Redux
                                                         | useXxx
      class A extends Component{
         constructor()
         {
            state={
               변수 ==> HTML
            }
         }
      }
      // cdn => Javascrpt안에서 사용 <script src="">

      index.js
        <App/> => return에 정의한 HTML ---> HTML을 index.html로 전송
                                           <div id="root">
                                             return에 있는 HTML이 첨부 => 실행
                                           </div>

 */
function BoardDelete(){
    const {no} = useParams()
    // BoardDetail => 전송된 데이터 받기
    // <Link to={"/board/delete/"+no}>
    const nav= useNavigate(); // history
    const pwdRef = useRef(null);
    const [pwd, setPwd] = useState("");
    // 데이터를 서버로 전송 삭제 요청 => 비밀번호 확인
    // delete ==> 서버 @DeleteMapping
    const {isLoading,mutate:boardDelete}=useMutation(
        async ()=>{
            return await apiClient.delete(`/board/delete/${no}/${pwd}`)
        },
        {
            onSuccess:(res)=>{
                if(res.data.msg==='yes')
                {
                    window.location.href="/board/list"
                    // 프로그램 : java/c/c++/c# ==> ;
                    // kotlin / dart / python ==> ;을 사용하지 않는다
                }
                else
                {
                    alert("비밀번호가 틀립니다!!")
                    setPwd("")
                    pwdRef.current.focus()
                }
            }
        },
        {
            onError:(res)=>{
                console.log(res.response)
            }
        }
    )
    /*
          const booardDeleteOk=function(){
          }
     */
    // ==> 람다식 (함수 포인터)
    const boardDeleteOk=()=>{
        if(pwd.trim()==="")
        {
            pwdRef.current.focus()
            return
        }
        boardDelete()
    }
    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(../img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>삭제하기</h2>
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
                                    <td className={"text-center"}>
                                        비밀번호:<input type={"password"} className={"input-sm"} size={"15"}
                                                    onChange={(e) => setPwd(e.target.value)}
                                                    value={pwd}
                                                    ref={pwdRef}
                                    />
                                        <button className={"btn-sm btn-primary"} onClick={boardDeleteOk}>삭제</button>
                                        <button className={"btn-sm btn-primary"} onClick={() => nav(-1)}>취소</button>
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
export default BoardDelete;