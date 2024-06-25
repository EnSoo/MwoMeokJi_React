import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  width: 60%;
  max-width: 400px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  font-size: 16px;
  cursor: pointer;
`;

const IngredientsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const IngredientItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
`;

const IngredientSearch = ({ recommendedRecipes, setFilteredRecipes }) => {
  const [ingredient, setIngredient] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleIngredientChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleAddIngredient = () => {
    if (ingredient && !selectedIngredients.includes(ingredient)) {
      const newIngredients = [...selectedIngredients, ingredient];
      setSelectedIngredients(newIngredients);
      filterRecipes(newIngredients);
      setIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    const newIngredients = selectedIngredients.filter(ing => ing !== ingredientToRemove);
    setSelectedIngredients(newIngredients);
    filterRecipes(newIngredients);
  };

  const filterRecipes = (ingredients) => {
    const filtered = recommendedRecipes.filter(recipe =>
      ingredients.every(ing => recipe.ingredients.includes(ing))
    );
    setFilteredRecipes(filtered);
  };

  return (
    <SearchContainer>
      <Label>재료 검색:</Label>
      <Input
        type="text"
        value={ingredient}
        onChange={handleIngredientChange}
        placeholder="재료를 입력하세요"
      />
      <Button type="button" onClick={handleAddIngredient}>
        추가
      </Button>
      <IngredientsList>
        {selectedIngredients.map((ing, index) => (
          <IngredientItem key={index}>
            {ing}
            <Button type="button" onClick={() => handleRemoveIngredient(ing)}>
              제거
            </Button>
          </IngredientItem>
        ))}
      </IngredientsList>
    </SearchContainer>
  );
};

export default IngredientSearch;
