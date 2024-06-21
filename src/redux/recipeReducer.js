const initialState = {
    recipes: []  // 처음에 빈 배열로 시작
};

export const setRecipes = (recipes) => {
    return { type: 'setRecipes', recipes }
}
;

export default function recipeReducer(state = initialState, action){
    switch (action.type) {
        case 'setRecipes':
            return {
                ...state,
                recipes: action.recipes
            };
        default:
            return state;
    }
};
