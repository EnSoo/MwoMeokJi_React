import React from 'react'
import styled from 'styled-components'
import logo from './img/logo.png'
import click from './img/image.png'
import { useNavigate } from 'react-router-dom'


const HomeLayout = () => {

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path)
    }

  return (
    <Layout>
        <Left>
            <img className='img' src={logo} alt='logo' onClick={()=>handleNavigate('/')}></img>
        </Left>
        <Right>
            <input className='search' type='search' placeholder='search'></input>
            <button className='button' type='submit'><img src={click} alt='click'></img></button>
        </Right>
    </Layout>
  )
}

export default HomeLayout

const Layout = styled.div`
    width: 100%;
    background-color: white;
    color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;/* 다른 요소들보다 위에 표시되도록 z-index 설정 */

    @media (max-width: 768px) {
    padding: 10px;
  }
`
const Left = styled.div`
    .img{
        width: 100px;
        cursor: pointer;

        @media (max-width: 768px) {
        width: 150px;
     }
    }
`
const Right = styled.div`
    display: flex;
    align-items: center;

    .search{
        width: 250px;
        padding: 10px;
        border: 2px solid #55A416;
        margin-right: 10px;

        @media (max-width: 768px) {
        width: 150px;
        padding: 5px;
        }
    }
    .button{
        padding: 10px;
        border: 2px solid #55A416;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #55A416;
        margin-right: 30px;
        cursor: pointer;

        @media (max-width: 768px) {
      padding: 5px;
    }

    }

`