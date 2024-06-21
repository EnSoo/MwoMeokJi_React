//(1) state : 전역저장소 store에 저장할 user의 초기값
const initState={
    userAccount :{
        email:'',
        nickname:'',
        imgfile:''
    }
    
}

//(2) action : 어떻게 변경하고 싶은지.. 동작명(액션 타입)을 지정
export const setUserAccount= (userAccount) => {
    return {type:'setUserAccount', userAccount}
}

//(3) reducer : 기존 state값과 Action 객체를 파라미터로 전달받아 action의 type에 따라 state 값을 변경하여 새로운 state객체를 리턴해주는 함수
export default function itemsReducer(state= initState, action){
    switch(action.type){
        case 'setUserAccount':
            return { ...state, userAccount: action.userAccount }
        default:
            return state
    }
}