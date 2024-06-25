import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setAndroidCheck } from "../redux/isAndroidReducer";
const Navigation = () => {
    const navigate = useNavigate() 
    const location = useLocation();

    //redux 저장소 불러오기
    const dispatch= useDispatch()

    // 로그인 성공 시 userAccount 정보 저장하는 부분
    const setIsAndroid = (isAndroid) => {
      dispatch( setAndroidCheck(isAndroid))
    }

    // 안드로이드 bottomnavigationView 클릭 시 동작 하는 부분
    const bnvRoute = (route) => {
      //navigate 생성
      navigate(route)
    }
    // 안드로이드에서 뒤로가기 버튼 누를 시 마지막 단계 : 리액트 웹뷰 페이지 뒤로가기 동작
    const backPath = () => {
      navigate(-1)
    }
    // 이 코드를 추가하여 bnvRoute 함수를 전역으로 사용할 수 있게 합니다.
    window.bnvRoute = bnvRoute;
    window.backPath= backPath
    window.setIsAndroid = setIsAndroid;
    window.isAndroid=useSelector(state => state.isAndroidReducer.isAndroid);
}

export default Navigation