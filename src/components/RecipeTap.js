import { useState } from "react";
import styled, { css } from "styled-components"

const RecipeTap = ({tab, setTab}) => {

    return(
        <TapContainer>
            <TabItem onClick={() => setTab('all')} isActive={tab === 'all'}>전체 레시피</TabItem>
            <TabItem onClick={() => setTab('my')} isActive={tab === 'my'}>나만의 레시피</TabItem>
        </TapContainer>
    )
}

export default RecipeTap


const activeStyle = css`
    background: #55A416;
    color: #FFF;
`;

const TapContainer=styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
`

const TabItem = styled.div`
    background: ${(props) => (props.isActive ? '#55A416' : '#FFF')};
    color: ${(props) => (props.isActive ? '#FFF' : '#55A416')};
    border: 1px solid #55A416;
    padding: 10px 20px;
    cursor: pointer;
    &:not(:last-child) {
        border-right: none;
    }
    ${(props) => props.isActive && activeStyle}

    &:active {
        ${activeStyle}
    }
`;
