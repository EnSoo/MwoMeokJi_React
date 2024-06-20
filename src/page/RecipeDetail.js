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
        } else {
            fetchRecipeDetails();
        }
    }, [id]);

    const fetchRecipeDetails = async () => {
        try {
            const response = await fetch(`/backend/get-recipe.php?id=${id}`);
            const data = await response.json();
            setRecipe(data);
        } catch (error) {
            console.error('Error fetching recipe details:', error);
        }
    };

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
