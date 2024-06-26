import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loading = () => {
    return (
        <LoadingContainer>
            <Spinner />
        </LoadingContainer>
    );
};

export default Loading;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 배경색에 투명도를 추가 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* 화면의 최상단에 위치하도록 설정 */
`;

const Spinner = styled.div`
    border: 16px solid #f3f3f3;
    border-top: 16px solid #55A416;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: ${spin} 2s linear infinite;
`;