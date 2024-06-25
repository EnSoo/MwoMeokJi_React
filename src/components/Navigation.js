import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Navigation = () => {
    const navigate = useNavigate() 
    const location = useLocation();
    const [isAndroid, setIsAndroid] = useState(false);
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
    useEffect(() => {
      window.bnvRoute = bnvRoute;
      window.backPath= backPath
      window.setIsAndroid = (flag) => setIsAndroid(flag);
      window.isAndroid=isAndroid
    }, [isAndroid]);
}

export default Navigation