import {Fragment,useState,useEffect} from "react";
import apiClient from '../../http-commons'
import {useQuery} from "react-query";
import {getAll} from "../util/cookie";
import {Link} from "react-router-dom";

/*
   1. react-query 사용
      ===========
       application의 데이터를 관리하거나 동기화를 사용하는 라이브러리
       => 상태 관리 (데이터가 변경이 되면 화면 처리까지 담당)
       => 최근 : 전체를 React , 예전에는 실시간으로 변경되는 파트,계속 반복되는 부분만
                React로 처리
       1)  간편한 데이터 관리 => 한번에 모든 데이터 받을 수 있다
       2) 실시간 업데이터 / 동기화
       3) 데이터 캐싱 => 불필요한 API요청을 줄일 수 있다
          react => 데이터 읽기 : home이동하면 다시 서버를 연결해서 데이터를 읽어 온다
          react-query : 데이터 읽기
                       ===========> 데이터가 변경이 없는 경우에는 서버를 연결하지 않고
                                    기존의 저장된 데이터를 사용
        4) 서버 상태 관리
           = 로딩중 (네트워크가 늦는 경우,에러 , 성공적인 데이터를 읽기)
        5) 간편한 설정


 */
function Home(){
    // 쿠키 처리 => 화면 완성
    const cookies=getAll()
    const key=Object.keys(cookies)
    const value=Object.values(cookies)
    const images=[]
    const keys=[]
    let j=0
    for(let i=key.length-1;i>=0;i--){
        if(key[i].startsWith('food_') && j<7)
        {
            images.push(value[i])
            keys.push(key[i])
            j++;
        }
    }
    // food-curpage [curpage]
    // axios.get("http://localhost/main")
    //            ----------------
    const {isLoading,isError,error,data}=useQuery(["main-data"],
        async () =>{
            return await apiClient.get('/main')
        }
    )
    if(isLoading)
        return <h1 className={"text-center"}>데이터 로딩중입니다</h1>
    if(isError)
        return <h1 className={"text-center"}>{error}</h1>
    console.log(data && data)

    // data.data => Map
    return (
        <Fragment>
            <section className="categories_area clearfix" id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="single_catagory wow fadeInUp" data-wow-delay=".3s">
                                <img src="/img/catagory-img/1.jpg" alt=""/>
                                <div className="catagory-title">
                                    <a href="#">
                                        <h5>맛집</h5>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="single_catagory wow fadeInUp" data-wow-delay=".6s">
                                <img src="/img/catagory-img/2.jpg" alt=""/>
                                <div className="catagory-title">
                                    <a href="#">
                                        <h5>레시피</h5>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="single_catagory wow fadeInUp" data-wow-delay=".9s">
                                <img src="/img/catagory-img/3.jpg" alt=""/>
                                <div className="catagory-title">
                                    <a href="#">
                                        <h5>스토어</h5>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="blog_area section_padding_0_80">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-8">
                            <div className="row">

                                <div className="col-12">
                                    <div className="single-post wow fadeInUp" data-wow-delay=".2s">

                                        <div className="post-thumb">
                                            <img src={data.data.oneData && 'http://www.menupan.com' + data.data.oneData.poster}
                                                 style={{"width": "800px", "height": "330px"}}/>
                                        </div>

                                        <div className="post-content">
                                            <div className="post-meta d-flex">
                                                <div className="post-author-date-area d-flex">

                                                    <div className="post-author">
                                                        <a href="#">{data.data.oneData && data.data.oneData.type}</a>
                                                    </div>

                                                    <div className="post-date">
                                                        <a href="#"><span
                                                            style={{"color": "orange"}}>{data.data.oneData && data.data.oneData.score}</span></a>
                                                    </div>
                                                </div>

                                                <div className="post-comment-share-area d-flex">

                                                    <div className="post-favourite">
                                                        <a href="#"><i className="fa fa-heart-o"
                                                                       aria-hidden="true"></i> {data.data && data.data.oneData.jjimcount}</a>
                                                    </div>

                                                    <div className="post-comments">
                                                        <a href="#"><i className="fa fa-comment-o"
                                                                       aria-hidden="true"></i> {data.data && data.data.oneData.hit}</a>
                                                    </div>

                                                    <div className="post-share">
                                                        <a href="#"><i className="fa fa-share-alt"
                                                                       aria-hidden="true"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <a href="#">
                                                <h2 className="post-headline">{data.data && data.data.oneData.name}</h2>
                                            </a>
                                            <p>{data.data && data.data.oneData.content}</p>
                                            <a href="#" className="read-more">Continue Reading..</a>
                                        </div>
                                    </div>
                                </div>
                                {/*html1*/
                                    data.data.twoData && data.data.twoData.map((food) =>
                                        <div className="col-12 col-md-6">
                                            <div className="single-post wow fadeInUp" data-wow-delay=".6s">

                                                <div className="post-thumb">
                                                    <img src={'http://menupan.com' + food.poster}
                                                         style={{"width": '350px', "height": '200px'}}/>
                                                </div>

                                                <div className="post-content">
                                                    <div className="post-meta d-flex">
                                                        <div className="post-author-date-area d-flex">

                                                            <div className="post-author">
                                                                <a href="#">{food.type}</a>
                                                            </div>

                                                            <div className="post-date">
                                                                <a href="#"><span
                                                                    style={{"color": "orange"}}>{food.score}</span></a>
                                                            </div>
                                                        </div>

                                                        <div className="post-comment-share-area d-flex">

                                                            <div className="post-favourite">
                                                                <a href="#"><i className="fa fa-heart-o"
                                                                               aria-hidden="true"></i> {food.jjimcount}</a>
                                                            </div>

                                                            <div className="post-comments">
                                                                <a href="#"><i className="fa fa-comment-o"
                                                                               aria-hidden="true"></i> {food.hit}</a>
                                                            </div>

                                                            <div className="post-share">
                                                                <a href="#"><i className="fa fa-share-alt"
                                                                               aria-hidden="true"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <a href="#">
                                                        <h4 className="post-headline">{food.name}</h4>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    data.data.threeData && data.data.threeData.map((food) =>
                                        <div className="col-12">
                                            <div className="list-blog single-post d-sm-flex wow fadeInUpBig"
                                                 data-wow-delay=".2s">

                                                <div className="post-thumb">
                                                    <img src={'http://menupan.com' + food.poster}
                                                         style={{"width": "350px", "height": "220px"}}/>
                                                </div>

                                                <div className="post-content">
                                                    <div className="post-meta d-flex">
                                                        <div className="post-author-date-area d-flex">

                                                            <div className="post-author">
                                                                <a href="#">{food.type}</a>
                                                            </div>

                                                            <div className="post-date">
                                                                <a href="#">
                                                                    <span style={{"color": "orange"}}>{food.score}</span>
                                                                </a>

                                                            </div>
                                                        </div>

                                                        <div className="post-comment-share-area d-flex">

                                                            <div className="post-favourite">
                                                                <a href="#"><i className="fa fa-heart-o"
                                                                               aria-hidden="true"></i> {food.jjimcount}</a>
                                                            </div>

                                                            <div className="post-comments">
                                                                <a href="#"><i className="fa fa-comment-o"
                                                                               aria-hidden="true"></i> {food.hit}</a>
                                                            </div>

                                                            <div className="post-share">
                                                                <a href="#"><i className="fa fa-share-alt"
                                                                               aria-hidden="true"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <a href="#">
                                                        <h4 className="post-headline">{food.name}</h4>
                                                    </a>
                                                    <p>{food.theme}</p>
                                                    <a href="#" className="read-more">Continue Reading..</a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>


                        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                            <div className="blog-sidebar mt-5 mt-lg-0">

                                <div className="single-widget-area about-me-widget text-center">
                                    <div className="widget-title">
                                        <h6>오늘의 쉐프</h6>
                                    </div>
                                    <div className="about-me-widget-thumb">
                                        {/*<img src={chefData.poster} alt=""/>*/}
                                    </div>
                                    <h4 className="font-shadow-into-light">{/*chefData.chef*/}</h4>

                                </div>

                                <div className="single-widget-area popular-post-widget">
                                    <div className="widget-title text-center">
                                        <h6>인기 레시피</h6>
                                    </div>
                                    {data.data.rList && data.data.rList.map((recipe) =>
                                        <div className="single-populer-post d-flex">
                                            <img src={recipe.poster} style={{"width": "180px", "height": "150px"}}
                                                 alt=""/>
                                            <div className="post-content">
                                                <a href="#">
                                                    <h6>{recipe.title}</h6>
                                                </a>
                                                <p>{recipe.chef}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>


                                <div className="single-widget-area add-widget text-center">
                                    <div className="add-widget-area">
                                        <img src="/img/sidebar-img/6.jpg" alt=""/>
                                        <div className="add-text">
                                            <div className="yummy-table">
                                                <div className="yummy-table-cell">
                                                    <iframe
                                                        src={"http://youtube.com/embed/XC3kex1KhdA\u0026pp=YAHIAQHwAQG6AwIYAugFAaIGFQFr6YMI8tboe7cieVDK1aUTMsX9ipAHAg%3D%3D"}></iframe>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="single-widget-area newsletter-widget">
                                    <div className="widget-title text-center">
                                        <h6>최근 방문 맛집</h6>
                                    </div>
                                    {/* 쿠키 출력 위치 */}
                                    {
                                        images && images.map((poster, index) =>
                                            <Link to={"/food/detail/" + keys[index].replace("food_", "")}>
                                                <img src={'http://menupan.com' + poster}
                                                     style={{"width": "250px", "height": "130px", "marginTop": "8px"}}
                                                     alt=""/>
                                            </Link>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Home;
