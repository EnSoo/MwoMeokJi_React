import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PreferenceForm from '../components/PreferenceForm';
import IngredientSearch from '../components/IngredientSearch';
import Card from '../components/Card';
import Confirm from '../components/Confirm';
import BackBtn from '../components/BackBtn';
import AlertDialog from '../components/AlertDialog';
import { recommendRecipes } from '../utils/recipeUtils';
import { useSelector } from 'react-redux';
import RecipeList from '../components/RecipeList';

const Container = styled.div`
  padding: 10px;
  max-width: 800px;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;  /* Adjusted to space-around for better distribution */
  gap: 1rem;
  padding: 0rem;
  margin-bottom: 20px;
`;

const RecipeRecommender = () => {
  const jsondata = useSelector(state => state.recipeReducer.recipes);
  const weatherData = useSelector(state => state.weatherReducer.data);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [userPreferences, setUserPreferences] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preferencesSubmitted, setPreferencesSubmitted] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [reload, setReload] = useState(false);
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsConfirmOpen(true);
  };

  const closeConfirm = () => {
    setIsConfirmOpen(false);
    setSelectedRecipe(null);
  };

  const handleNoClick = (recipeNo) => {
    setRecommendedRecipes((prevRecipes) => prevRecipes.filter(r => r.no !== recipeNo));
    setFilteredRecipes((prevRecipes) => prevRecipes.filter(r => r.no !== recipeNo));
    closeConfirm();
  };
  const filterRecipes = (ingredients) => {
    const filtered = recommendedRecipes.filter(recipe =>
      ingredients.every(ing => recipe.ingredients.toLowerCase().includes(ing))
    );
    setFilteredRecipes(filtered);
  };

  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      setShowAlertDialog(true)
      const parsedPreferences = JSON.parse(savedPreferences);
      setUserPreferences(parsedPreferences);
      setPreferencesSubmitted(true);
      const recommended = recommendRecipes(parsedPreferences, jsondata);
      setRecommendedRecipes(recommended);
      setFilteredRecipes(recommended); // 초기 필터링된 레시피 목록을 설정
      setTimeout(() => {
        setShowAlertDialog(false);
    }, 3000);
    } else {
      setShowAlertDialog(true)
      setPreferencesSubmitted(false);
    }

    
  }, [reload, jsondata]);
  

  return (
    <Container>
      {showAlertDialog && <AlertDialog />}
      <BackBtn title="AI 레시피 추천" />
      <IngredientSearch 
        recommendedRecipes={recommendedRecipes} 
        setFilteredRecipes={setFilteredRecipes} // 필터된 레시피 설정을 위한 setter 전달
      />
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          {!preferencesSubmitted && (
            <PreferenceForm
              openSelect={true}
              closeSelect={() => {
                setReload(true);
              }}
              weatherData={weatherData}
            />
          )}
          {isLoading ? (
            <LoadingMessage>추천 중...</LoadingMessage>
          ) : (
            <RecipeContainer>
              {(filteredRecipes.length > 0 ? <RecipeList recipes={filteredRecipes} setRecipes={setFilteredRecipes} /> : <RecipeList recipes={recommendedRecipes} setRecipes={setRecommendedRecipes} />)}
              {!window.isAndroid && <StyledButton  onClick={()=>localStorage.clear()}>선호도 초기화</StyledButton> }
            </RecipeContainer>
          )}
        </>
      )}
      {isConfirmOpen && (
        <Confirm
          isOpen={isConfirmOpen}
          onRequestClose={closeConfirm}
          content={selectedRecipe && selectedRecipe.details}
          recipe={selectedRecipe} // 전달된 recipe prop
          onNoClick={() => handleNoClick(selectedRecipe.no)} // onNoClick 함수 추가
        />
      )}
    </Container>
  );
};

export default RecipeRecommender;

const StyledBackBtn = styled(BackBtn)`
font-size: 30px; // 원하는 폰트 크기
font-weight: bold; // 폰트 굵기
`
const StyledButton = styled.button`
  background-color: #55A416;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45910e;
  }

  &:active {
    background-color: #366d0b;
  }
`;