import React from 'react';
import MainRouter from './MainRouter'; // MainRouter 임포트

const App = () => {

  // 안드로이드 bottomnavigationView 클릭 시 동작 하는 부분
  const bnvRoute = (route) => {
    alert(route)
  }

  // 이 코드를 추가하여 bnvRoute 함수를 전역으로 사용할 수 있게 합니다.
  window.bnvRoute = bnvRoute;

  return (
    <div>
      <MainRouter />
    </div>
  )
}

export default App;