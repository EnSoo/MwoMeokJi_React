import { Link, useNavigate } from "react-router-dom"
import Navigation from "../components/Navigation"
import HomeLayout from "../components/HomeLayout"
import styled from 'styled-components'
import ai from "../components/img/AIRecommendm.png"

//redux
import { useDispatch, useSelector } from "react-redux"
import { setUserAccount } from "../redux/userAccount"
import { useEffect, useState } from "react"
import RecipeList from "../components/RecipeList"

const Home = () => {

    const navigate = useNavigate()
    const handleNavigate = (path) => {
        navigate(path)
    }

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
    const recipes=[{no:1, title:"가츠돈", ingredients:"돼지고기", recipe:"돼지고기를 튀긴다", imgurl:"가츠돈.jpg",times:"3",favor:"좋아요"},{no:1, title:"가츠돈", ingredients:"돼지고기", recipe:"돼지고기를 튀긴다", imgurl:"가츠돈.jpg",times:"3",favor:"좋아요"},{no:1, title:"가츠돈", ingredients:"돼지고기", recipe:"돼지고기를 튀긴다", imgurl:"가츠돈.jpg",times:"3",favor:"좋아요"},{no:1, title:"가츠돈", ingredients:"돼지고기", recipe:"돼지고기를 튀긴다", imgurl:"가츠돈.jpg",times:"3",favor:"좋아요"}]
    const res=[{no:1, title:"가츠돈", ingredients:"돼지고기", recipe:"돼지고기를 튀긴다", imgurl:"가츠돈.jpg",times:"3",favor:"좋아요"}, 
        {no:1, title:"가츠돈", ingredients:"돼지고기", recipe:"돼지고기를 튀긴다", imgurl:"가츠돈.jpg",times:"3",favor:"좋아요"},
        {no:1, title:"가츠돈", ingredients:"돼지고기", recipe:"돼지고기를 튀긴다", imgurl:"가츠돈.jpg",times:"3",favor:"좋아요"}, 
        {no:1, title:"가츠돈", ingredients:"돼지고기", recipe:"돼지고기를 튀긴다", imgurl:"가츠돈.jpg",times:"3",favor:"좋아요"}] 
    const r=[{no:1, title:"가츠돈", ingredients:"돼지고기", recipe:"돼지고기를 튀긴다", imgurl:"가츠돈.jpg",times:"3",favor:"좋아요"}, 
        {no:1, title:"가츠돈", ingredients:"돼지고기", recipe:"돼지고기를 튀긴다", imgurl:"가츠돈.jpg",times:"3",favor:"좋아요"},
        {no:1, title:"가츠돈", ingredients:"돼지고기", recipe:"돼지고기를 튀긴다", imgurl:"가츠돈.jpg",times:"3",favor:"좋아요"}, 
        {no:1, title:"가츠돈", ingredients:"돼지고기", recipe:"돼지고기를 튀긴다", imgurl:"가츠돈.jpg",times:"3",favor:"좋아요"}] 


       
    return(
        <>
            <HomeLayout />
            <Image>
                <img src={ai} alt="로봇" onClick={()=>handleNavigate('/recipe_recommender')}></img>
            </Image>
            <Content>
                <Title>여름철 간편음식</Title>
                <RecipeList recipes={recipes} />
                <Title>좋아하는 음식</Title>
                <RecipeList recipes={res} />
                <Title>간편 음식</Title>
                <RecipeList recipes={r}/>
                <Navigation />
                <h2>Home Page</h2>
                <Link to='/map'>맵</Link><br />
                <Link to='/recipe'>레시피</Link>
                <Link to='/alert'>다이얼로그</Link>
            </Content>
        </>
    )
}

export default Home

const Image = styled.div`
    width: 100%;
    height: 100px;
    padding-top: 250px;
    display: flex;
    justify-content: center;
    align-items : center;
    cursor: none;
    img {
        max-width: 100%;
        height: auto;
    }
    @media (max-width: 768px) {
        padding-top: 200px;
    
}   
`

const Title = styled.h1`
    padding-top: 40px;
    margin: 30px; /* 원하는 마진 값을 설정 */
    
`

const Content = styled.div`
    padding-top: 120px; /* HomeLayout 높이만큼 패딩을 추가하여 내용이 겹치지 않도록 함 */

    @media (max-width: 768px) {
        padding-top: 40px;
    }
`;