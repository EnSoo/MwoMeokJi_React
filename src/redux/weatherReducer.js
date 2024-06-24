const initialState = {
   data:{weather:[], temperature: {}},
};

// 액션 생성자
export const setWeather = (data) => {
    
    return { type: 'setWeather', data };
};

// 리듀서
export default function weatherReducer(state = initialState, action) {
    
    switch (action.type) {
        
        case 'setWeather':
            return {
                ...state,
                data: action.data,
            };
        default:
            return state;
    }
};