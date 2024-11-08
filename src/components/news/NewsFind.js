import {Fragment,useState,useRef} from "react";
import {useQuery} from "react-query";
import {useNavigate,Link} from "react-router-dom";
import apiClient from "../../http-commons"

function NewsFind(){
    const [fd,setFd] = useState("맛집");
    const fdRef = useRef(null);
    const {isLoading,isError,error,data,refetch:find}=useQuery(['news-list'],
        async ()=>{
           return apiClient.get(`/news/list/${fd}`)
        },
        {
            onSuccess:(res)=>{
                console.log(res.data)
            }
        },
        {
            onError:(err)=>{
                console.log(err.response)
            }
        }
    )
    if(isLoading)
        return <h1 className={"text-center"}>서버에서 데이터 전송 지연...</h1>
    if(isError)
        return <h1 className={"text-center"}>{error}</h1>
    const findOk=()=>{
        find()
    }

    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(../img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>뉴스 검색</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="breadcumb-nav">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div style={{"height":"20px"}}></div>
                            <input type={"text"} size={"20px"} className={"input-sm"} ref={fdRef} value={fd}
                             onChange={(e)=>setFd(e.target.value)}
                            />&nbsp;
                            <button className={"btn-sm btn-danger"} onClick={findOk}>검색</button>
                        </div>
                    </div>
                </div>
            </div>
            <section className="archive-area section_padding_80" id="listApp">
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            <table className={"table"}>
                                <tbody>
                                <tr>
                                    <td>
                                        {
                                            data.data.list && data.data.list.map((news) =>
                                                <table className={"table"}>
                                                    <tbody>
                                                    <tr>
                                                        <Link to={news.link}>
                                                        <td><b style={{"color": "orange"}}
                                                               dangerouslySetInnerHTML={{__html: news.title}}></b>
                                                        </td>
                                                        </Link>
                                                    </tr>
                                                    <tr>
                                                        <td dangerouslySetInnerHTML={{__html: news.desc}}></td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            )
                                        }
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
export default NewsFind