import { generateVectorFromPreferences, generateVectorFromRecipe, generateUniqueIngredients } from './vectorUtils';
import { cosineSimilarity } from './utils';

export function recommendRecipes(userPreferences, recipes) {
  // 고유 성분 목록 생성
  const uniqueIngredients = generateUniqueIngredients(recipes, userPreferences.ingredients);
  // 모든 카테고리 목록 생성
  const allCategories = Array.from(new Set(recipes.flatMap(recipe => recipe.categories)));

  // 사용자 벡터 생성
  const userVector = generateVectorFromPreferences(userPreferences, uniqueIngredients, allCategories);
  console.log("사용자 벡터:", userVector);

  // 레시피 벡터 생성
  const recipeVectors = recipes.map(recipe => {
    const vector = generateVectorFromRecipe(recipe, uniqueIngredients, allCategories);
    console.log(`레시피 벡터 - ${recipe.name}:`, vector);
    return {
      recipe,
      vector
    };
  });

  // 각 레시피의 유사도 계산
  recipeVectors.forEach(({ recipe, vector }) => {
    const similarity = cosineSimilarity(userVector, vector);
    recipe.similarity = similarity;
    console.log(`레시피: ${recipe.name}, 유사도: ${similarity}`);
  });

  // 유사도에 따라 레시피 정렬
  recipeVectors.sort((a, b) => b.similarity - a.similarity);
  console.log("정렬된 레시피 벡터:", recipeVectors);

  // 추천 레시피 목록 반환
  const recommendedRecipes = recipeVectors.map(rv => rv.recipe);
  console.log("추천된 레시피:", recommendedRecipes);

  return recommendedRecipes;
}