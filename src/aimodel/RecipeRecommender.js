import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import recipes from '../data/recipes';
import PreferenceForm from './PreferenceForm';
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
  background-color: #f9f9f9;
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #ddd;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #bbb;
  }
`;

function RecipeRecommender() {
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [userPreferences, setUserPreferences] = useState(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    return savedPreferences ? JSON.parse(savedPreferences) : {
      ingredients: [],
      spiciness: "medium",
      vegan: false,
      meat: false,
      calories: "medium",
      cookingTime: "medium",
      categories: [],
      weatherFeatures: {
        warm: false,
        cold: true,
        soup: true,
        spicy: true
      }
    };
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('./proxy.php');
        const data = await response.json();
        console.log('Weather Data:', data);
        return data;
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('날씨 정보를 가져오는 중 오류가 발생했습니다.');
        setIsLoading(false);
        return null;
      }
    };

    const loadModelAndRecommend = async () => {
      setIsLoading(true);
      setError(null);

      const weatherData = await fetchWeatherData();
      if (!weatherData) {
        setIsLoading(false);
        return;
      }

      const updatedPreferences = {
        ...userPreferences,
        weatherFeatures: {
          warm: weatherData.main.temp > 20,
          cold: weatherData.main.temp < 10,
          soup: weatherData.weather[0].main.toLowerCase().includes("rain") || weatherData.weather[0].main.toLowerCase().includes("snow"),
          spicy: weatherData.main.temp < 5
        }
      };

      console.log("업데이트된 사용자 선호도:", updatedPreferences);

      try {
        const recommended = recommendRecipes(updatedPreferences, recipes);
        console.log("추천 결과:", recommended);
        console.log("추천 결과는 배열인가?", Array.isArray(recommended));
        if (Array.isArray(recommended)) {
          setRecommendedRecipes(recommended);
          console.log('Recommended Recipes:', recommended);
        } else {
          setError('레시피 추천 결과가 올바르지 않습니다.');
        }
      } catch (error) {
        console.error('Error recommending recipes:', error);
        setError('레시피 추천 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadModelAndRecommend();
  }, [userPreferences]);

  const handlePreferenceChange = (newPreferences) => {
    setUserPreferences(newPreferences);
    localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recommendedRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  return (
    <Container>
      <Title>레시피 추천</Title>
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          <PreferenceFormWrapper>
            <PreferenceForm preferences={userPreferences} onSubmit={handlePreferenceChange} />
          </PreferenceFormWrapper>
          {isLoading ? (
            <LoadingMessage>추천 중...</LoadingMessage>
          ) : (
            currentRecipes.map((recipe, index) => (
              <RecipeContainer key={index}>
                <RecipeTitle>추천 레시피: {recipe.name || '레시피 이름 없음'}</RecipeTitle>
                <RecipeList>
                  {recipe.ingredients.map((ingredient, idx) => (
                    <RecipeItem key={idx}>{ingredient}</RecipeItem>
                  ))}
                </RecipeList>
                <RecipeDetail>칼로리: {recipe.calories}</RecipeDetail>
                <RecipeDetail>매운 정도: {recipe.spiciness}</RecipeDetail>
                <RecipeDetail>조리 시간: {recipe.cookingTime}</RecipeDetail>
                <RecipeDetail>카테고리: {recipe.categories.join(', ')}</RecipeDetail>
              </RecipeContainer>
            ))
          )}
          <Pagination>
            {[...Array(Math.ceil(recommendedRecipes.length / recipesPerPage)).keys()].map(number => (
              <PageButton key={number} onClick={() => setCurrentPage(number + 1)}>
                {number + 1}
              </PageButton>
            ))}
          </Pagination>
        </>
      )}
    </Container>
  );
}

export default RecipeRecommender;