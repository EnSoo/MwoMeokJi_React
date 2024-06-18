import styled from "styled-components"
import Card from "./Card"
import { Link } from "react-router-dom"

const RecipeList = ({recipes}) => {
    return(
        <List>
            {
                recipes.map((recipe, index) => (
                    <Card recipe={recipe} key={index}/>
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
`
