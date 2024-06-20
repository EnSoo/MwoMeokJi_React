import styled from "styled-components"
import Card from "./Card"
import { Link } from "react-router-dom"

const RecipeList = ({recipes, setRecipes}) => {
    // 삭제 처리 함수
    const handleDeleteRecipe = (recipeNo) => {
        setRecipes(recipes.filter(recipe => recipe.no !== recipeNo));
      };

    return(
        <List>
            {
                recipes.map((recipe, index) => (
                    <Card recipe={recipe} key={index} onDelete={handleDeleteRecipe}/>
                ))
            }
            
        </List>
    )
}

export default RecipeList

const List=styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    padding: 2rem;
    margin-top: 40px;
    margin-bottom: 20px;
`
