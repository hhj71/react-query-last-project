import {Fragment,useState,useEffect} from "react";
import {Link,useParams} from "react-router-dom";
import {useQuery} from "react-query";
import apiClient from "../../http-commons"
function BoardDetail(){
    const {no} = useParams()
    const {isLoading,isError,error,data}=useQuery(['board-detail',no],
         async ()=>{
             return await apiClient.get(`/board/detail/${no}`)
         }
    )
    if(isLoading)
        return <h1 className={"text-center"}>서버에서 데이터 전송 지연...</h1>
    if(isError)
        return <h1 className={"text-center"}>{error}</h1>

    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(../img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>상세보기</h2>
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
                                    <th style={{"width": "20%"}} className={"text-center"}>번호</th>
                                    <td style={{"width": "30%"}} className={"text-center"}>{data.data.no}</td>
                                    <th style={{"width": "20%"}} className={"text-center"}>작성일</th>
                                    <td style={{"width": "30%"}} className={"text-center"}>{data.data.regdate}</td>
                                </tr>
                                <tr>
                                    <th style={{"width": "20%"}} className={"text-center"}>이름</th>
                                    <td style={{"width": "30%"}} className={"text-center"}>{data.data.name}</td>
                                    <th style={{"width": "20%"}} className={"text-center"}>조회수</th>
                                    <td style={{"width": "30%"}} className={"text-center"}>{data.data.hit}</td>
                                </tr>
                                <tr>
                                    <th style={{"width": "20%"}} className={"text-center"}>제목</th>
                                    <td style={{"width": "30%"}} colSpan={"3"}>{data.data.subject}</td>
                                </tr>
                                <tr>
                                    <td colSpan={"4"} className={"text-left"} valign={"top"} height={"200"}>
                                        <pre style={{"whiteSpace":"pre-wrap","backgroundColor":"white","border":"none"}}>{data.data.content}</pre>
                                    </td>
                                </tr>
                                <tr>
                                    <td  colSpan={"4"} className={"text-right"}>
                                        <Link to={"/board/update/"+no} className={"btn btn-xs btn-primary"}>수정</Link>
                                        <Link to={"/board/delete/"+no} className={"btn btn-xs btn-danger"}>삭제</Link>
                                        <Link to={"/board/list"} className={"btn btn-xs btn-success"}>목록</Link>
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

export default BoardDetail;