import styled, { keyframes } from "styled-components";
import Card from "./Card";
import { useState } from "react";

const RecipeList = ({ recipes, setRecipes }) => {
    const [visibleCount, setVisibleCount] = useState(8);

    // 더보기 클릭 시 표시할 레시피 수 증가
    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 4);
    };

    // 삭제 처리 함수
    const handleDeleteRecipe = (recipeNo) => {
        setRecipes(recipes.filter(recipe => recipe.no !== recipeNo));
    };

    return (
        <>
            <List>
                {recipes.slice(0, visibleCount).map((recipe, index) => (
                    <Card recipe={recipe} key={recipe.no} onDelete={handleDeleteRecipe} delay={index === 0 ? 0 : index * 0.15} />
                ))}
            </List>
            {visibleCount < recipes.length && (
                <LoadMoreButton onClick={handleLoadMore}>더보기</LoadMoreButton>
            )}
        </>
    );
}

export default RecipeList;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;  /* Adjusted to space-around for better distribution */
  gap: 1rem;
  padding: 2rem;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const LoadMoreButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #55a416;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #499d14;
  }
`;
