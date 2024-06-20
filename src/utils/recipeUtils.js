import { generateVectorFromPreferences, generateVectorFromRecipe, generateUniqueIngredients } from './vectorUtils';
import { cosineSimilarity } from './utils';

export function recommendRecipes(userPreferences, recipes) {
  const originalRecipes = [...recipes]; // 레시피 데이터 깊은 복사
  const uniqueIngredients = generateUniqueIngredients(recipes, userPreferences.ingredients);

  const weights = {
    spiciness: 1,
    cookingTime: 1,
    calories: 1
  };

  // 매움 정도에 따른 가중치 조정
  switch (userPreferences.spiciness) {
    case "보통":
      weights.spiciness = 1;
      break;
    case "매움":
    case "안 매움":
      weights.spiciness = 2;
      break;
    case "엄청 매움":
    case "약간 매움":
      weights.spiciness = 3;
      break;
    default:
      weights.spiciness = 1;
  }

  // 조리 시간에 따른 가중치 조정
  switch (userPreferences.cookingTime) {
    case "veryShort":
      weights.cookingTime = 2;
      break;
    case "short":
      weights.cookingTime = 1.5;
      break;
    case "medium":
      weights.cookingTime = 1;
      break;
    case "long":
      weights.cookingTime = 1.5;
      break;
    case "veryLong":
      weights.cookingTime = 2;
      break;
    default:
      weights.cookingTime = 1;
  }

  // 칼로리에 따른 가중치 조정
  switch (userPreferences.calories) {
    case "low":
      weights.calories = 2;
      break;
    case "medium":
      weights.calories = 1;
      break;
    case "high":
      weights.calories = 0.5;
      break;
    default:
      weights.calories = 1;
  }

  const userVector = generateVectorFromPreferences(userPreferences, uniqueIngredients, weights);
  console.log("사용자 벡터:", userVector);

  // 매핑 테이블 생성
  const categoryMapping = {
    '한식': 'korean',
    '중식': 'chinese',
    '일식': 'japanese'
  };

  const mappedCategories = userPreferences.categories.map(type => categoryMapping[type] || type);
  const includeOtherCategories = userPreferences.categories.includes('기타');

  const filteredRecipes = originalRecipes.filter(recipe => {
    const categoryMatch = mappedCategories.length === 0 || mappedCategories.some(type => recipe.categories.includes(type));
    const otherCategoriesMatch = includeOtherCategories ? !['korean', 'chinese', 'japanese'].some(type => recipe.categories.includes(type)) : true;
    const dietTypeMatch = userPreferences.dietType === "상관없음" || (userPreferences.dietType === "채식(비건)" && !recipe.meat) || (userPreferences.dietType === "육식" && recipe.meat);
    const ingredientsMatch = userPreferences.ingredients.every(ingredient => recipe.ingredients.includes(ingredient));

    console.log(`레시피: ${recipe.name}, categoryMatch: ${categoryMatch}, otherCategoriesMatch: ${otherCategoriesMatch}, dietTypeMatch: ${dietTypeMatch}, ingredientsMatch: ${ingredientsMatch}`);

    return categoryMatch && otherCategoriesMatch && dietTypeMatch && ingredientsMatch;
  });

  if (userPreferences.searchQuery) { // 검색어 필터링 추가
    const query = userPreferences.searchQuery.toLowerCase();
    filteredRecipes = filteredRecipes.filter(recipe => { // filteredRecipes 재할당
      return recipe.name.toLowerCase().includes(query) ||
             recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query));
    });
  }

  console.log("필터링된 레시피:", filteredRecipes);

  const recipeVectors = filteredRecipes.map(recipe => ({
    ...recipe,
    vector: generateVectorFromRecipe(recipe, uniqueIngredients, weights)
  }));

  recipeVectors.forEach(recipe => {
    const similarity = cosineSimilarity(userVector, recipe.vector);
    recipe.similarity = similarity;
    console.log(`레시피: ${recipe.name}, 유사도: ${similarity}`);
  });

  recipeVectors.sort((a, b) => b.similarity - a.similarity);
  return recipeVectors.map(({ vector, ...rest }) => rest);
}
