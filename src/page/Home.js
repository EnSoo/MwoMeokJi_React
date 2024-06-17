import { Link } from "react-router-dom"
import Navigation from "../components/Navigation"

//redux
import { useDispatch, useSelector } from "react-redux"
import { setUserAccount } from "../redux/userAccount"
import { useEffect, useState } from "react"

const Home = () => {

    //redux 저장소 불러오기
    const dispatch= useDispatch()

    // 로그인 성공 시 userAccount 정보 저장하는 부분
    const setUser = (user) => {
        dispatch( setUserAccount(user))
    }
    // 이 코드를 추가하여 setUser 함수를 전역으로 사용할 수 있게 합니다.
    useEffect(()=> {
        window.setUser = setUser;
    })
    
    return(
        <div>
            <Navigation/>
            <h2>Home Page</h2>
            <Link to='/map'>맵</Link><br></br>
            <Link to='/recipe'>레시피</Link>
        </div>
    )
}

export default Home