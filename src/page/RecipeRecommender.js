import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import PreferenceForm from '../components/PreferenceForm';
import Card from '../components/Card';
import Confirm from '../components/Confirm';
import { recommendRecipes } from '../utils/recipeUtils';
import { useSelector } from 'react-redux';
import BackBtn from '../components/BackBtn';
import AlertDialog from '../components/AlertDialog';

const Container = styled.div`
  padding: 20px;
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
  justify-content: center;
  margin-top: 20px;
`;

const RecipeRecommender = () => {
  const jsondata = useSelector(state => state.recipeReducer.recipes);
  const weatherData = useSelector(state => state.weatherReducer.data);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [userPreferences, setUserPreferences] = useState(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    return savedPreferences ? JSON.parse(savedPreferences) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preferencesSubmitted, setPreferencesSubmitted] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const loadModelAndRecommend = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setShowAlertDialog(true)

    if (!userPreferences) {
      setError('선호도 조사가 필요합니다.');
      setIsLoading(false);
      setShowAlertDialog(false)
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 5000));
      // 코사인 유사도 기반으로 정렬된 레시피 목록 생성
      const recommended = recommendRecipes(userPreferences, jsondata);
      setRecommendedRecipes(recommended);
    } catch (error) {
      setError('레시피 추천 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
      setShowAlertDialog(false);
    }
  }, [userPreferences, jsondata]);

  useEffect(() => {
    if (preferencesSubmitted || userPreferences) {
      loadModelAndRecommend();
    }
  }, [preferencesSubmitted, userPreferences, loadModelAndRecommend]);

  const handlePreferenceChange = useCallback((newPreferences) => {
    setUserPreferences(newPreferences);
    localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
    setPreferencesSubmitted(true);
  }, []);

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
    closeConfirm();
  };

  return (
    <Container>
      {showAlertDialog && <AlertDialog />}
      <BackBtn title="AI 레시피 추천"/>
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          {!userPreferences && (
            <PreferenceForm
              preferences={userPreferences || {}}
              saveStep={handlePreferenceChange}
              openSelect={true}
              closeSelect={() => setPreferencesSubmitted(true)}
              weatherData={weatherData}
            />
          )}
          {isLoading ? (
            <LoadingMessage>추천 중...</LoadingMessage>
          ) : (
            <RecipeContainer>
              {recommendedRecipes.map(recipe => (
                <Card 
                  key={recipe.no} 
                  recipe={recipe} 
                  onClick={() => handleCardClick(recipe)} 
                  fromRecommender={true}
                  onDelete={(recipeNo) => {
                    setRecommendedRecipes(recommendedRecipes.filter(r => r.no !== recipeNo));
                  }} 
                />
              ))}
            </RecipeContainer>
          )}
          {isConfirmOpen && (
            <Confirm
              isOpen={isConfirmOpen}
              onRequestClose={closeConfirm}
              content={selectedRecipe && selectedRecipe.details}
              recipe={selectedRecipe} // 전달된 recipe prop
              onNoClick={handleNoClick} // onNoClick 함수 추가
            />
          )}
        </>
      )}
    </Container>
  );
}

export default RecipeRecommender
