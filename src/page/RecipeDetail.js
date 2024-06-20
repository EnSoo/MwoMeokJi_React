import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navigation from "../components/Navigation";
import styled from 'styled-components';

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.recipe) {
            setRecipe(location.state.recipe);
            if(recipe.email!=''){
                const sendData = new FormData()
                sendData.append('email', recipe.email);
                sendData.append('myrecipe_id', recipe.no);
                fetch(`${process.env.PUBLIC_URL}/backend/recipe_view.php`, {
                    method: 'POST',
                    body: sendData,
                })
                    .then(res => res.text())
                    .then(text => {
                        if (text == "200") {
                        } else if (text == "201") {
                        }
                    }).catch(error => console.error('Error:', error));
            } else {
                // 앱이 아닌 브라우저에서 볼 경우 조회수가 증가되지 않음
            }   
        } else {
        }
    }, [id]);


    if (!recipe) return <div>Loading...</div>;

    return (
        <RecipeDetailContainer>
            <Navigation />
            <RecipeHeader>
                <h2>{recipe.title}</h2>
            </RecipeHeader>
            <RecipeContent>
                <RecipeDescription>
                    <p>{recipe.recipe}</p>
                    <RecipeImage src={`${process.env.PUBLIC_URL}/imgs/${recipe.imgurl}`} alt={recipe.title} />
                </RecipeDescription>
                <RecipeIngredients>
                    <h3>재료</h3>
                    <p>{recipe.ingredients}</p>
                </RecipeIngredients>
                <RecipeRecipe>
                    <h3>조리법</h3>
                    <p>{recipe.recipe}</p>
                    <p>총 조리시간: {recipe.times}<span>분</span></p>
                </RecipeRecipe>
            </RecipeContent>
        </RecipeDetailContainer>
    );
}

export default RecipeDetail

const RecipeDetailContainer = styled.div`
    font-family: 'Arial', sans-serif;
    max-width: 600px;
    height: 100vh;
    margin: auto;
    background: #fff;
    padding: 20px;
    box-shadow: 0 0 15px gray;
`

const RecipeHeader = styled.div`
    text-align: center;
    margin-bottom: 20px;
`

const RecipeContent = styled.div`
    margin-bottom: 20px;
`

const RecipeDescription = styled.div`
    margin-bottom: 20px;
`

const RecipeIngredients = styled.div`
    margin-bottom: 20px;
`

const RecipeRecipe = styled.div`
    margin-bottom: 20px;
`

const RecipeImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-top: 10px;
`
