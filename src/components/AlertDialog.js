import React from 'react'
import styled from 'styled-components'
import ai from './img/logo.gif'

const AlertDialog = () => {
    
  return (
    <Wrapper>
        <Box>
            <img className='img' src={ai} alt='logo'></img>
            <p className='element'>AI 쉐프가 최고의 레시피를 <br/>
                추천하는 중입니다.<br/>
                잠시만 기다려 주세요!
            </p>
        </Box>
    </Wrapper>
  )
}

export default AlertDialog

const Wrapper = styled.div`
    width: 100%;
    display: flex !important;
    justify-content: center;
    align-items: center;
    height: 100vh; /* 화면 전체 높이 */
    max-width: 300px;
`

const Box  = styled.div`
    width: 50%;
    max-width: 975px;
    margin: 0 auto;
    display: flex;
    height: 80vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 15px gray;
    border-radius: 10%;
    border: 2px solid #55A416;

    .element{
    color: red;
    font-weight: bold;
    text-align: center;
    font-size:16px;
    margin-top: 5px;

    .img{
        width: 300px;

    }
}

` 
