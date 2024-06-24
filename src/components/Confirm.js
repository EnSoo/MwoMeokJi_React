import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Typist from 'react-typist';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const Confirm = ({ isOpen, onRequestClose, content, recipe }) => { // recipe prop 추가
    const [response, setResponse] = useState(null);
    const navigate = useNavigate(); // useNavigate 훅 추가

    const handleYesClick = () => {
        setResponse('yes');
        navigate(`/detail/${recipe.no}`, { state: { recipe } }); // 상세 페이지로 이동
    };

    const handleNoClick = () => {
        setResponse('no');
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
            <div>
                {!response ? (
                    <>
                        <Typist cursor={{ show: false }}>
                            <h2>추천된 레시피가 마음에 드시나요?</h2>
                        </Typist>
                        <div>{content}</div>
                        <ButtonContainer>
                            <Button bgColor="green" onClick={handleYesClick}>예</Button>
                            <Button bgColor="red" onClick={handleNoClick}>아니오</Button>
                        </ButtonContainer>
                    </>
                ) : response === 'yes' ? (
                    <div>
                        <h2>감사합니다! 레시피가 저장되었습니다.</h2>
                        <Button onClick={onRequestClose}>닫기</Button>
                    </div>
                ) : (
                    <div>
                        <h2>다른 레시피를 추천해드릴게요!</h2>
                        <Button onClick={onRequestClose}>닫기</Button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default Confirm;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        padding: '20px',
    },
};

const Button = styled.button`
    padding: 10px 20px;
    background-color: ${props => props.bgColor || '#28a745'};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 10px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
`;
