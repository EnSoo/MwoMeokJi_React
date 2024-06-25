import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineArrowBackIos } from "react-icons/md";

const IconWrapper = styled.div`
  display: inline-block;
  position: relative;
  overflow: hidden;
  border-radius: 50%;  // 추가: 부모 요소를 원형으로 만듦

  &::after {
    content: "";
    display: block;
    position: absolute;
    border-radius: 50%;
    width: 200%;    // 변경: 100% -> 200%
    height: 200%;   // 변경: 100% -> 200%
    top: 50%;       // 변경: 0 -> 50%
    left: 50%;      // 변경: 0 -> 50%
    transform: translate(-50%, -50%);  // 추가: 중앙으로 이동
    background: rgba(85, 164, 22, 0.3); /* rgba(#55A416, 0.3) */
    opacity: 0;
    pointer-events: none;
  }
  
  &.ripple-active::after {
    animation: ripple-animation 0.6s linear;
    opacity: 1;
  }

  @keyframes ripple-animation {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
const ContainerBox = styled.div`
display: flex;
align-items: center;
`
const Title = styled.div`
  text-align: center;
  width: 100%;
  font-size: 40px; /* 원하는 폰트 크기로 수정 */
  font-weight: bold; /* 두껍게 설정 */
  text-align: center;
`
const BackBtn = ({title}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    const target = e.currentTarget;
    target.classList.add('ripple-active');

    setTimeout(() => {
      target.classList.remove('ripple-active');
    }, 600); // Match the duration of the ripple effect

    setTimeout(() => {
      navigate(-1);
    }, 600); // Short delay to allow ripple effect to be visible
  };

  return (
    <ContainerBox>
        <IconWrapper onClick={handleClick}>
          <MdOutlineArrowBackIos style={{ fontWeight: 'bold', fontSize: '2rem' }}/>
        </IconWrapper>
        <Title>{title}</Title>
    </ContainerBox>
  );
};

export default BackBtn;