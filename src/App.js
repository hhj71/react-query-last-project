import React, {Fragment} from "react";
import {CookiesProvider} from "react-cookie";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
import Home from "./components/main/Home";
import FoodList from "./components/food/FoodList";
import FoodFind from "./components/food/FoodFind";
import FoodDetail from "./components/food/FoodDetail";
import BoardDetail from "./components/board/BoardDetail";
import BoardInsert from "./components/board/BoardInsert";
import BoardList from "./components/board/BoardList";
import BoardDelete from "./components/board/BoardDelete";
import BoardUpdate from "./components/board/BoardUpdate";
import NewsFind from "./components/news/NewsFind";
function App() {
  return (
    <Fragment>
        <Router>
      <CookiesProvider>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path={"/food/list"} element={<FoodList/>}/>
            <Route path={"/food/find"} element={<FoodFind/>}/>
            <Route path={"/food/detail/:fno"} element={<FoodDetail/>}/>
            <Route path={"/board/list"} element={<BoardList/>}/>
            <Route path={"/board/insert"} element={<BoardInsert/>}/>
            <Route path={"/board/detail/:no"} element={<BoardDetail/>}/>
            <Route path={"/board/delete/:no"} element={<BoardDelete/>}/>
            <Route path={"/board/update/:no"} element={<BoardUpdate/>}/>
            <Route path={"/news/list"} element={<NewsFind/>}/>
        </Routes>
        <Footer/>
      </CookiesProvider>
        </Router>
    </Fragment>
  )
}

export default App;
