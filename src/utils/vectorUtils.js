export function generateUniqueIngredients(recipes, userIngredients) {// 모든 레시피에서 고유 재료 추출 후 벡터화
  const allIngredients = recipes.flatMap(recipe => recipe.ingredients);
  console.log("모든 성분:", allIngredients);
  const uniqueIngredients = Array.from(new Set([...allIngredients, ...userIngredients]));
  console.log("고유 성분:", uniqueIngredients);
  return uniqueIngredients;
}

export function generateVectorFromPreferences(preferences, uniqueIngredients, weights) {// 사용자 선호도 자료 벡터로 변환
  const ingredientVector = uniqueIngredients.map(ingredient => preferences.ingredients.includes(ingredient) ? 1 : 0);

  const spicinessMapping = { '안 매움': 0, '약간 매움': 1, '보통': 2, '매움': 3, '엄청 매움': 4 };
  const spicinessVector = Array(5).fill(0);
  if (spicinessMapping.hasOwnProperty(preferences.spiciness)) {
    spicinessVector[spicinessMapping[preferences.spiciness]] = 1;
  }
  const weightedSpicinessVector = spicinessVector.map(value => value * weights.spiciness);

  const cookingTimeMapping = { veryShort: 0, short: 1, medium: 2, long: 3, veryLong: 4 };
  const cookingTimeVector = Array(5).fill(0);
  if (cookingTimeMapping.hasOwnProperty(preferences.cookingTime)) {
    cookingTimeVector[cookingTimeMapping[preferences.cookingTime]] = 1;
  }
  const weightedCookingTimeVector = cookingTimeVector.map(value => value * weights.cookingTime);

  const caloriesMapping = { low: 0, medium: 1, high: 2 };
  const caloriesVector = Array(3).fill(0);
  if (caloriesMapping.hasOwnProperty(preferences.calories)) {
    caloriesVector[caloriesMapping[preferences.calories]] = 1;
  }
  const weightedCaloriesVector = caloriesVector.map(value => value * weights.calories);

  const finalVector = ingredientVector.concat(weightedSpicinessVector, weightedCookingTimeVector, weightedCaloriesVector);
  console.log("최종 사용자 선호도 벡터:", finalVector);

  return finalVector;
}

export function generateVectorFromRecipe(recipe, uniqueIngredients, weights) { //레시피 자료 백터로 변환
  const ingredientVector = uniqueIngredients.map(ingredient => recipe.ingredients.includes(ingredient) ? 1 : 0);

  const spicinessMapping = { '안 매움': 0, '약간 매움': 1, '보통': 2, '매움': 3, '엄청 매움': 4 };
  const spicinessVector = Array(5).fill(0);
  if (spicinessMapping.hasOwnProperty(recipe.spiciness)) {
    spicinessVector[spicinessMapping[recipe.spiciness]] = 1;
  }
  const weightedSpicinessVector = spicinessVector.map(value => value * weights.spiciness);

  const cookingTimeMapping = { veryShort: 0, short: 1, medium: 2, long: 3, veryLong: 4 };
  const cookingTimeVector = Array(5).fill(0);
  if (cookingTimeMapping.hasOwnProperty(recipe.times)) {
    cookingTimeVector[cookingTimeMapping[recipe.times]] = 1;
  }
  const weightedCookingTimeVector = cookingTimeVector.map(value => value * weights.cookingTime);

  const caloriesMapping = { low: 0, medium: 1, high: 2 };
  const caloriesVector = Array(3).fill(0);
  if (caloriesMapping.hasOwnProperty(recipe.calories)) {
    caloriesVector[caloriesMapping[recipe.calories]] = 1;
  }
  const weightedCaloriesVector = caloriesVector.map(value => value * weights.calories);

  const finalVector = ingredientVector.concat(weightedSpicinessVector, weightedCookingTimeVector, weightedCaloriesVector);
  console.log("재료 벡터:", ingredientVector);
  console.log("매운 정도 벡터:", weightedSpicinessVector);
  console.log("조리 시간 벡터:", weightedCookingTimeVector);
  console.log("칼로리 벡터:", weightedCaloriesVector);
  console.log("최종 레시피 벡터:", finalVector);

  return finalVector;
}
