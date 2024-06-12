import styled from "styled-components";

// 키워드 마우스 올려놓을 경우 alt을 보여주는 함수
const Tooltip = ({ children, text, imgSrc }) => (
    
    <TooltipContainer>
        {children}
        <div className="tooltip-content">
            <div>{text}</div>
        </div>
    </TooltipContainer>
);

export default Tooltip

// 키워드 클릭 시 alt을 표현하기 위한 div
const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;

  .tooltip-content {
    visibility: hidden;
    width: max-content;
    max-width: 200px;
    background-color: #55A416;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%; /* Position above the icon */
    left: 10px; /* Align to the left of the icon */
    transform: translateX(0); /* Remove centering transform */
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover .tooltip-content,
  &:active .tooltip-content {
    visibility: visible;
    opacity: 1;
  }
`;