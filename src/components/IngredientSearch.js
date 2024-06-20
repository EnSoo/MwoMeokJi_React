import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  width: 80%;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
`;

const IngredientsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const IngredientItem = styled.li`
  margin-bottom: 5px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

function IngredientSearch({ selectedIngredients, setSelectedIngredients, setUserPreferences, userPreferences }) {
  const [ingredient, setIngredient] = useState("");

  const handleIngredientChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleAddIngredient = () => {
    if (ingredient && !selectedIngredients.includes(ingredient)) {
      const updatedIngredients = [...selectedIngredients, ingredient];
      setSelectedIngredients(updatedIngredients); // 부모 컴포넌트의 상태 업데이트
      setIngredient("");
    }
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    const updatedIngredients = selectedIngredients.filter((ing) => ing !== ingredientToRemove);
    setUserPreferences({ ...userPreferences, ingredients: updatedIngredients }); // userPreferences 상태 업데이트
     // 로컬 스토리지 업데이트
  localStorage.setItem('userPreferences', JSON.stringify({ ...userPreferences, ingredients: updatedIngredients }));
  };

  

  return (
    <>
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
    </>
  );
}

export default IngredientSearch;
