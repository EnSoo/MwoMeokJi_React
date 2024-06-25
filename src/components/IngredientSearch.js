import React, { useState } from 'react';
import styled from 'styled-components';
import click from './img/image.png'

const IngredientSearch = ({ recommendedRecipes, setFilteredRecipes }) => { // setFilteredRecipes를 props로 받음
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState({});

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleAddIngredient = () => {
    const trimmedIngredient = query.trim().toLowerCase();
    if (trimmedIngredient && !history[trimmedIngredient]) {
      const filtered = recommendedRecipes.filter(recipe =>
        recipe.ingredients.some(ing => ing.toLowerCase().includes(trimmedIngredient))
      );
      setHistory(prevHistory => ({ ...prevHistory, [trimmedIngredient]: filtered }));
      setFilteredRecipes(filtered); // 추가된 재료로 필터링된 레시피 업데이트
      setQuery('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    const newHistory = { ...history };
    delete newHistory[ingredientToRemove];
    setHistory(newHistory);

    // 남은 재료로 다시 필터링
    const remainingIngredients = Object.keys(newHistory);
    const newFilteredRecipes = recommendedRecipes.filter(recipe =>
      remainingIngredients.every(ing =>
        recipe.ingredients.some(recipeIng => recipeIng.includes(ing))
      )
    );
    setFilteredRecipes(newFilteredRecipes); 
  };

  return (
    <Search>
      <div className='p'>
        <input
          type="text"
          className='search'
          placeholder="재료를 입력하세요"
          value={query}
          onChange={handleInputChange}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              handleAddIngredient();
              event.preventDefault();
            }
          }}
        />
        <button className='button' onClick={handleAddIngredient}><img src={click} alt='click'></img></button>
      </div>
      <ul>
        {Object.entries(history).map(([ingredient, _], index) => (
          <li key={index}>
            {ingredient}
            <button onClick={() => handleRemoveIngredient(ingredient)}>제거</button>
          </li>
        ))}
      </ul>

    </Search>
  );
};

export default IngredientSearch;

const Search = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
   
    .p{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
    }

    .search{
        width: 300px;
        height: 40px;
        border: 2px solid #55A416;
        margin-right: 10px;

        @media (max-width: 768px) {
        width: 150px;
        padding: 5px;
        }
    }
    .button{
        padding: 10px;
        border: 2px solid #55A416;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #55A416;
        cursor: pointer;

        @media (max-width: 768px) {
      padding: 5px;
    }

    }

`