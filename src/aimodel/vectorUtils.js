export function generateUniqueIngredients(recipes, userIngredients) {
  const allIngredients = recipes.flatMap(recipe => recipe.ingredients);
  const uniqueIngredients = Array.from(new Set([...allIngredients, ...userIngredients]));
  console.log("고유 성분:", uniqueIngredients);
  return uniqueIngredients;
}

export function generateVectorFromPreferences(preferences, uniqueIngredients, allCategories) {
  const ingredientVector = uniqueIngredients.map(ingredient => preferences.ingredients.includes(ingredient) ? 1 : 0);
  console.log("성분 벡터:", ingredientVector);

  const spicinessMapping = { notSpicy: 0, barelySpicy: 1, mild: 2, medium: 3, spicy: 4, verySpicy: 5 };
  const spicinessVector = Array(6).fill(0);
  spicinessVector[spicinessMapping[preferences.spiciness] || 0] = 1;
  console.log("매운 정도 벡터:", spicinessVector);

  const cookingTimeMapping = { veryShort: 0, short: 1, medium: 2, long: 3, veryLong: 4 };
  const cookingTimeVector = Array(5).fill(0);
  cookingTimeVector[cookingTimeMapping[preferences.cookingTime] || 0] = 1;
  console.log("조리 시간 벡터:", cookingTimeVector);

  const caloriesMapping = { low: 0, medium: 1, high: 2 };
  const caloriesVector = Array(3).fill(0);
  caloriesVector[caloriesMapping[preferences.calories] || 0] = 1;
  console.log("칼로리 벡터:", caloriesVector);

  const finalVector = ingredientVector.concat(spicinessVector, cookingTimeVector, caloriesVector);
  console.log("최종 사용자 선호도 벡터:", finalVector);

  return finalVector;
}

export function generateVectorFromRecipe(recipe, uniqueIngredients, allCategories) {
  const ingredientVector = uniqueIngredients.map(ingredient => recipe.ingredients.includes(ingredient) ? 1 : 0);
  console.log("레시피 성분 벡터:", ingredientVector);

  const spicinessMapping = { notSpicy: 0, barelySpicy: 1, mild: 2, medium: 3, spicy: 4, verySpicy: 5 };
  const spicinessVector = Array(6).fill(0);
  spicinessVector[spicinessMapping[recipe.spiciness] || 0] = 1;
  console.log("레시피 매운 정도 벡터:", spicinessVector);

  const cookingTimeMapping = { veryShort: 0, short: 1, medium: 2, long: 3, veryLong: 4 };
  const cookingTimeVector = Array(5).fill(0);
  cookingTimeVector[cookingTimeMapping[recipe.cookingTime] || 0] = 1;
  console.log("레시피 조리 시간 벡터:", cookingTimeVector);

  const caloriesMapping = { low: 0, medium: 1, high: 2 };
  const caloriesVector = Array(3).fill(0);
  caloriesVector[caloriesMapping[recipe.calories] || 0] = 1;
  console.log("레시피 칼로리 벡터:", caloriesVector);

  const finalVector = ingredientVector.concat(spicinessVector, cookingTimeVector, caloriesVector);
  console.log("최종 레시피 벡터:", finalVector);

  return finalVector;
}