import React, { useState } from 'react';

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
    <div>
      <input
        type="text"
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
      <button onClick={handleAddIngredient}>추가</button>

      <ul>
        {Object.entries(history).map(([ingredient, _], index) => (
          <li key={index}>
            {ingredient}
            <button onClick={() => handleRemoveIngredient(ingredient)}>제거</button>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default IngredientSearch;