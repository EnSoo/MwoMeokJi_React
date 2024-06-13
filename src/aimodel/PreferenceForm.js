import React, { useState } from 'react';

const PreferenceForm = ({ preferences, onSubmit }) => {
  const [localPreferences, setLocalPreferences] = useState(preferences);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setLocalPreferences((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleIngredientChange = (event) => {
    const ingredients = event.target.value.split(',').map(ingredient => ingredient.trim());
    setLocalPreferences((prev) => ({ ...prev, ingredients }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(localPreferences);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        재료 (쉼표로 구분):
        <input
          type="text"
          name="ingredients"
          value={localPreferences.ingredients.join(', ')}
          onChange={handleIngredientChange}
        />
      </label>
      <br />
      <label>
        매운 정도:
        <select name="spiciness" value={localPreferences.spiciness} onChange={handleChange}>
          <option value="notSpicy">안 매움</option>
          <option value="barelySpicy">약간 매움</option>
          <option value="mild">약간</option>
          <option value="medium">보통</option>
          <option value="spicy">매움</option>
          <option value="verySpicy">매우 매움</option>
        </select>
      </label>
      <br />
      <label>
        채식주의자용:
        <input
          type="checkbox"
          name="vegan"
          checked={localPreferences.vegan}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        육류 포함:
        <input
          type="checkbox"
          name="meat"
          checked={localPreferences.meat}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        칼로리:
        <select name="calories" value={localPreferences.calories} onChange={handleChange}>
          <option value="low">낮음</option>
          <option value="medium">중간</option>
          <option value="high">높음</option>
        </select>
      </label>
      <br />
      <label>
        조리 시간:
        <select name="cookingTime" value={localPreferences.cookingTime} onChange={handleChange}>
          <option value="veryShort">15분 이하</option>
          <option value="short">15-30분</option>
          <option value="medium">31-45분</option>
          <option value="long">46-120분</option>
          <option value="veryLong">120분 이상</option>
        </select>
      </label>
      <br />
      <button type="submit">제출</button>
    </form>
  );
};

export default PreferenceForm;