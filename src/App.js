import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import SignUp from "./pages/sign-up/SignUp";
import Login from "./pages/login/Login";
import PrivateRoute from "./routes/PrivateRoute";
import AddBoard from "./pages/add-board/AddBoard";
import BoardList from "./pages/board-list/BoardList";
import MyBoardList from "./pages/myboard-list/MyBoardList";
import Board from "./pages/board/Board";
import EditBoard from "./pages/edit-board/EditBoard";

const App = () => {
  const location = useLocation();
  const token = useSelector((state) => state.Auth.token);
  console.log(token);

  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* 인증이 필요한 컴포넌트는 아래처럼 PrivateRoute 컴포넌트 사용!*/}
        <Route
          path="/add-board"
          element={<PrivateRoute path="/add-board" component={AddBoard} />}
        />
        <Route path="/board-list" element={<BoardList />} />
        <Route
          path="/myboard-list"
          element={
            // 쿼리 파라미터가 존재하므로 전체 url을 PrivateRoute에 넘겨준다
            <PrivateRoute
              path={`${location.pathname}`}
              component={MyBoardList}
            />
          }
        />
        <Route path="/board/:board_id" element={<Board />} />
        <Route
          path="/edit-board/:board_id"
          element={
            // URI 파라미터가 존재하므로 전체 url을 PrivateRoute에 넘겨준다
            <PrivateRoute path={`${location.pathname}`} component={EditBoard} />
          }
        />
      </Routes>
    </React.Fragment>
  );
};
export default App;
