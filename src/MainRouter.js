import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './page/Home'
import KakaoMap from './page/KakaoMap'
import Recipe from './page/Recipe'
import RecipeDetail from './page/RecipeDetail'
import RecipeEdit from './components/RecipeEdit'
import AlertDialog from './components/AlertDialog'
import RecipeRecommender from './page/RecipeRecommender'
import {useEffect, useState} from 'react'

const MainRouter = () => {
    const [recipes, setRecipes] = useState() 
    useEffect(() => {
    
    fetch(`${process.env.PUBLIC_URL}/backend/recipe_list2.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: "admin" })
    }).then(response => response.json()).then(json =>setRecipes(json) ).catch(error => console.error('Error fetching recipes:', error))}, [])
    return(
        <div>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/alert' element={<AlertDialog/>}/>
                    <Route path='/recipe_recommender' element={<RecipeRecommender data={recipes}/>}/>
                    <Route path='/map' element={<KakaoMap/>}></Route>
                    <Route path='/recipe' element={<Recipe/>}></Route>
                    <Route path='/my_recipe' element={<Recipe/>}></Route>
                    <Route path='/recipe/modify/:id' element={<RecipeEdit/>}></Route>
                    <Route path='/recipe/add' element={<RecipeEdit/>}/>
                    <Route path='/recipe/detail/:id' element={<RecipeDetail/>}/>
                    <Route path='/detail/:id' element={<RecipeDetail/>}/>
                    
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default MainRouter

// 에딧트 화면 조건 걸고 해야함 이거 먼저 해결 add modity 조건 걸거임