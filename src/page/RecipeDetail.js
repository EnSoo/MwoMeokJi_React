import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { useParams } from 'react-router-dom';
import Navigation from "../components/Navigation";
import styled from 'styled-components';

const RecipeModify = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Fetching recipe for id:', id); // 콘솔 로그 추가
        fetch('/recipe.csv')
            .then(response => response.text())
            .then(csv => {
                Papa.parse(csv, {
                    header: true,
                    complete: (results) => {
                        console.log('Parsed data:', results.data); // 콘솔 로그 추가
                        const recipeData = results.data[id];
                        setRecipe(recipeData);
                        setLoading(false);
                    }
                });
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const handleDelete = () => {
        // 삭제 로직 구현
        console.log('Delete recipe with id:', id)
        // 서버로 삭제 요청을 보내는 로직을 구현할 수 있습니다.
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!recipe) return <div>Recipe not found</div>

    return (
        <RecipeDetailContainer>
            <Navigation />
            <RecipeHeader>
                <h2>{recipe.Name}</h2>
                <p>{recipe.uid}</p>
            </RecipeHeader>
            <RecipeContent>
                <RecipeDescription>
                    <p>{recipe.Description}</p>
                    <RecipeImage src={`${process.env.PUBLIC_URL}/imgs/${recipe.Name}.jpg`} alt={recipe.Name} />
                </RecipeDescription>
                <RecipeIngredients>
                    <h3>재료</h3>
                    <p>{recipe.Ingredients}</p>
                </RecipeIngredients>
                <RecipeRecipe>
                    <h3>조리법</h3>
                    <p>{recipe.Recipe}</p>
                    <p>총 조리시간: {recipe.times}<span>분</span></p>
                </RecipeRecipe>
            </RecipeContent>
        </RecipeDetailContainer>
    )
}


export default RecipeModify;

const RecipeDetailContainer = styled.div`
    font-family: 'Arial', sans-serif;
    max-width: 600px;
    margin: auto;
    background: #fff;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
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

const uid = styled.span`
    font-weight: bold;

`
const RecipeFooter = styled.div`
    text-align: center;
    margin-top: 20px;
`