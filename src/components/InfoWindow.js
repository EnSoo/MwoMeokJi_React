
import styled from 'styled-components'

const InfoWindow = ({place, onClick}) => {
    return (
        <Container className="infoWindowClass" onClick={onClick}>
            <p>{place.place_name}</p>
            <p>{place.road_address_name}</p>
            <p>{place.phone}</p>
        </Container>
    );
};

export default InfoWindow

const Container = styled.div`
    background-color: #55A416;
    border-radius: 10px;
    padding: 10px; /* 추가된 패딩 */
    margin: 0; /* 불필요한 여백 제거 */
    user-select: none;
    pointer-events: auto;
    display: inline-block;
    position: relative; /* 필요한 경우 */
    box-sizing: border-box; /* 패딩과 테두리를 포함하여 크기 계산 */
    border:none;
    p {
        margin: 0; /* 텍스트 요소의 여백 제거 */
        padding: 0; /* 텍스트 요소의 패딩 제거 */
        color: white; /* 텍스트 색상 */
    }
    &::after {
        content: '';
        position: absolute;
        top: 100%; /* 말풍선을 아래로 */
        left: 50%;
        transform: translateX(-50%);
        border-width: 10px;
        border-style: solid;
        border-color: #55A416 transparent transparent transparent;
    }
`;