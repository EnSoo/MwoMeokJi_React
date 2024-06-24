import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navigation from "../components/Navigation";
import styled from 'styled-components';
import BackBtn from '../components/BackBtn';
import CommentList from '../components/CommentList';

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.recipe) {
            setRecipe(location.state.recipe);
            if(location.state.recipe.email !== ''){
                const sendData = new FormData();
                sendData.append('email', location.state.recipe.email);
                sendData.append('myrecipe_id', location.state.recipe.no);
                fetch(`${process.env.PUBLIC_URL}/backend/recipe_view.php`, {
                    method: 'POST',
                    body: sendData,
                })
                    .then(res => res.text())
                    .then(text => {
                        if (text === "200") {
                            // 조회수 증가 성공
                        } else if (text === "201") {
                            // 조회수 증가 실패
                        }
                    }).catch(error => console.error('Error:', error));
            } else {
                // 앱이 아닌 브라우저에서 볼 경우 조회수가 증가되지 않음
            }   
        } else {
            // handle case when recipe is not available in location.state
        }
    }, [id, location.state]);

    if (!recipe || !Object.keys(recipe).length) return <div>Loading...</div>;

    return (
        <RecipeDetailContainer>
            <Navigation />
            <BackBtn title="레시피 보기" />
            <ProfileImage src={`${process.env.PUBLIC_URL}/backend/`+recipe.imgfile} alt='프로필'/>
            <CommentAuthor>{recipe.nickname}</CommentAuthor>
            
            <RecipeHeader>
                <h2>{recipe.title}</h2>
            </RecipeHeader>
            <RecipeContent>
                <RecipeDescription>
                    <RecipeImage src={`${process.env.PUBLIC_URL}/imgs/${recipe.imgurl}`} alt={recipe.title} />
                </RecipeDescription>
                <RecipeIngredients>
                    <h3>재료</h3>
                    <p>{recipe.ingredients}</p>
                </RecipeIngredients>
                <RecipeRecipe>
                    <h3>조리법</h3>
                    <p>{recipe.recipe}</p>
                    <p>총 조리시간: {recipe.times} <span>분</span></p>
                </RecipeRecipe>
                <CommentSection>
                    <CommentList recipeId={recipe.no} />
                </CommentSection>
            </RecipeContent>
        </RecipeDetailContainer>
    );
}

export default RecipeDetail;

const RecipeDetailContainer = styled.div`
    font-family: 'Arial', sans-serif;
    max-width: 600px;
    height: 100%;
    margin: auto;
    background: #fff;
    padding: 20px;
    box-shadow: 0 0 15px gray;
`;

const ProfileImage = styled.img`
    width: 30px; /* 프로필 이미지 너비 */
    height: 30px; /* 프로필 이미지 높이 */
    border-radius: 50%; /* 원형 모양으로 만들기 */
    margin-right: 10px; /* 이미지와 내용 사이의 간격 */
`
const CommentAuthor = styled.div`
    font-weight: bold;
    margin-bottom: 5px;
    display: inline-block;
`

const RecipeHeader = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;

const RecipeContent = styled.div`
    margin-bottom: 20px;
`;

const RecipeDescription = styled.div`
    margin-bottom: 20px;
`;

const RecipeIngredients = styled.div`
    margin-bottom: 20px;
    padding-bottom: 10px;
`;

const RecipeRecipe = styled.div`
    margin-bottom: 20px;
    padding-bottom: 10px;
`;

const RecipeImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-top: 10px;
`;

const CommentSection = styled.div`
    margin-top: 20px;
    padding: 10px 0;
    border-top: 2px solid gray;
    padding-bottom: 20px;
`;
