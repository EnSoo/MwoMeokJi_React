import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './page/Home'
import KakaoMap from './page/KakaoMap'
import Recipe from './page/Recipe'
import RecipeModify from './page/RecipeModify'
import RecipeAdd from './page/RecipeAdd'

const MainRouter = () => {
    return(
        <div>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/map' element={<KakaoMap/>}></Route>
                    <Route path='/recipe' element={<Recipe/>}></Route>
                    <Route path='/recipe/modify/:id' element={<RecipeModify/>}></Route>
                    <Route path='/recipe/add' element={<RecipeAdd/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default MainRouter