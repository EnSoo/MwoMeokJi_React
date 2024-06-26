import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setAndroidCheck } from "../redux/isAndroidReducer";

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();

    const isAndroid = useSelector(state => state.isAndroidReducer.isAndroid); // 최상위 레벨에서 호출

    const setIsAndroid = (isAndroid) => {
        dispatch(setAndroidCheck(isAndroid));
    }

    const bnvRoute = (route) => {
        navigate(route);
    }

    const backPath = () => {
        navigate(-1);
    }

    const setLocalStorage = (jsonString) => {
        if (jsonString === undefined) {
            localStorage.clear();
        } else {
            localStorage.setItem('userPreferences', jsonString);
        }
    }

    useEffect(() => {
        window.bnvRoute = bnvRoute;
        window.backPath = backPath;
        window.setIsAndroid = setIsAndroid;
        window.isAndroid = isAndroid; // 상태 값을 전역 객체에 설정
        window.setLocalStorage = setLocalStorage;
    }, [navigate, dispatch, isAndroid]);

    return null;
}

export default Navigation;
