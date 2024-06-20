import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import recipes from '../data/recipes';
import PreferenceForm from '../components//PreferenceForm';
import IngredientSearch from '../components/IngredientSearch';
import { recommendRecipes } from '../utils/recipeUtils';

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: auto;
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const LoadingMessage = styled.p`
  text-align: center;
`;

const RecipeContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9';
`;

const RecipeTitle = styled.h3`
  color: #444;
`;

const RecipeList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const RecipeItem = styled.li`
  margin: 5px 0;
`;

const RecipeDetail = styled.p`
  margin: 5px 0;
`;

const PreferenceFormWrapper = styled.div`
  margin-top: 20px;
`;

function RecipeRecommender() {
 const [originalRecipes, setOriginalRecipes] = useState(recipes); // 원본 레시피 저장
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
   const [userPreferences, setUserPreferences] = useState(null); // 초기값 null로 변경
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    setUserPreferences(savedPreferences ? JSON.parse(savedPreferences) : null); 
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [preferencesSubmitted, setPreferencesSubmitted] = useState(false);
  const [currentRecipes, setCurrentRecipes] = useState([]);
  const recipesPerPage = 10;

  useEffect(() => {
    const loadModelAndRecommend = async () => {
      setIsLoading(true);
      setError(null);

      const savedPreferences = localStorage.getItem('userPreferences');
      if (!savedPreferences) {
        setError('선호도 조사가 필요합니다.');
        setIsLoading(false);
        return;
      }

      const userPreferences = JSON.parse(savedPreferences);
      console.log('User Preferences:', userPreferences);

      try {
        const recommended = recommendRecipes(userPreferences, originalRecipes); // 복사본 사용
        console.log('추천된 레시피:', recommended);

        if (Array.isArray(recommended)) {
          console.log('추천된 레시피 배열:', recommended);
          recommended.forEach((recipe, index) => {
            console.log(`추천된 레시피 ${index + 1}:`, recipe);
          });

          setRecommendedRecipes(recommended);
          setCurrentRecipes(recommended.slice(0, recipesPerPage)); // currentRecipes 업데이트
          console.log('추천된 레시피 설정:', recommended);
        } else {
          setError('레시피 추천 결과가 올바르지 않습니다.');
        }
      } catch (error) {
        console.error('레시피 추천 중 오류가 발생했습니다:', error);
        setError('레시피 추천 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    if (preferencesSubmitted || userPreferences) {
      loadModelAndRecommend();
    } else {
      setIsLoading(false);
    }
  }, [preferencesSubmitted, userPreferences]);

  useEffect(() => {
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    setCurrentRecipes(recommendedRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe));
  }, [currentPage, recommendedRecipes]); 

  const handlePreferenceChange = (newPreferences) => {
    setUserPreferences(newPreferences);
    localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
    setPreferencesSubmitted(true);
  };

  
  const handleIngredientSearch = (newIngredients) => {
    setUserPreferences({ ...userPreferences, ingredients: newIngredients });
    localStorage.setItem('userPreferences', JSON.stringify({ ...userPreferences, ingredients: newIngredients }));
  };


  return (
    <Container>
      <Title>레시피 추천</Title>
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          {!userPreferences && (
            <PreferenceFormWrapper>
              <PreferenceForm 
                preferences={userPreferences || {}}
                saveStep={handlePreferenceChange} 
                openSelect={true}
                closeSelect={() => setPreferencesSubmitted(true)} 
              />
            </PreferenceFormWrapper>
          )}
          {userPreferences && (
            <IngredientSearch
              selectedIngredients={userPreferences.ingredients}
              setSelectedIngredients={handleIngredientSearch}
              userPreferences={userPreferences} // userPreferences 상태 전달
              setUserPreferences={setUserPreferences} // setUserPreferences 함수 전달
            />
          )}
          {isLoading ? (
            <LoadingMessage>추천 중...</LoadingMessage>
          ) : (
            currentRecipes.map((recipe, index) => (
              <RecipeContainer key={index}>
                <RecipeTitle>추천 레시피: {recipe.name || '레시피 이름 없음'}</RecipeTitle>
                <RecipeList>
                  {recipe.ingredients.map((ingredient, index) => (
                    <RecipeItem key={index}>{ingredient}</RecipeItem>
                  ))}
                </RecipeList>
                <RecipeDetail>칼로리: {recipe.calories}</RecipeDetail>
                <RecipeDetail>매운 정도: {recipe.spiciness}</RecipeDetail>
                <RecipeDetail>조리 시간: {recipe.cookingTime}</RecipeDetail>
                <RecipeDetail>카테고리: {recipe.categories.join(', ')}</RecipeDetail>
              </RecipeContainer>
            ))
          )}
        </>
      )}
    </Container>
  );
}

export default RecipeRecommender;
