import { Link, useNavigate } from "react-router-dom"
import Navigation from "../components/Navigation"
import HomeLayout from "../components/HomeLayout"
import styled from 'styled-components'
import ai from "../components/img/AIRecommendm.png"
import changerecipe from "../utils/changerecipe"
import { setRecipes } from '../redux/recipeReducer'


//redux
import { useDispatch, useSelector } from "react-redux"
import { setUserAccount } from "../redux/userAccount"
import { useEffect, useState } from "react"
import RecipeList from "../components/RecipeList"
import { setWeather } from "../redux/weatherReducer"

const Home = () => {
    const [originaljson, setOriginaljson] = useState([])
   

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
    useEffect(()=> {// 추후에 사용자 id이용해서 요청하는 php로 수정해야함. 안그러면 자기 좋아요나 수정 삭제 버튼 값 안옴.
        window.setUser = setUser;
        fetch(`${process.env.PUBLIC_URL}/backend/recipe_list2.php`)
      .then(response => response.json())
      .then(data => {
        setOriginaljson(data);
        // 데이터를 changerecipe 함수로 변환
        const transformedData = changerecipe(data);
        console.log("변환된 데이터:", transformedData )
        // Redux 상태 업데이트
        dispatch(setRecipes(transformedData));
        console.log('Data fetched:', transformedData);
      })
      .catch(error => console.error('Error fetching data:', error));

      fetch(`${process.env.PUBLIC_URL}/backend/proxy.php`).then(response => response.json()).then(data => {
        console.log('날씨 데이터:', data);
        const filtered = filterWeatherData(data);
        console.log('날씨 데이터:', filtered);
        dispatch(setWeather(filtered))
      })
  }, []);
    const recipes= useSelector(state=>state.recipeReducer.recipes)
    const summerRecipes = recipes.filter(recipe => recipe.cold === true); 
    const favorateRecipes = originaljson.filter(recipe => recipe.favor !== null);
    const simpleRecipes = recipes.filter(recipe => recipe.times === "very short");

    const filterWeatherData = (data) => {
        return {
          weather: data.weather,
          temperature: {
            current: data.main.temp,
            feels_like: data.main.feels_like,
            min: data.main.temp_min,
            max: data.main.temp_max
          }
        };
      };


       
    return(
        <>
            <HomeLayout />
            <Image>
                <img src={ai} alt="로봇" onClick={()=>handleNavigate('/recipe_recommender')}></img>
            </Image>
            <Content>
                <Title>여름철 간편음식</Title>
                <RecipeList recipes={summerRecipes} />
                <Title>좋아하는 음식</Title>
                <RecipeList recipes={favorateRecipes} />
                <Title>간편 음식</Title>
                <RecipeList recipes={simpleRecipes}/>
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