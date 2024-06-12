import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { IoMdMenu, IoIosRefresh } from "react-icons/io";
import Navigation from "../components/Navigation";
import { FaStore } from "react-icons/fa6";
import { MdRestaurant } from "react-icons/md";
import { FaShoppingCart, FaStoreAlt } from "react-icons/fa";
import Tooltip from "../components/Tooltip";

const { kakao } = window;

const KakaoMap = () => {
    const [infoDisplay, setInfoDisplay] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadKakaoMap = () => {
            if (!window.kakao || !window.kakao.maps) {
                console.error('kakao.maps API가 로드되지 않았습니다.');
                return;
            }
            const latlng = new kakao.maps.LatLng(33.450701, 126.570667); // 마커 표시 좌표
            const container = document.getElementById('map');
            const options = {
                center: latlng,
                draggable: true,
                level: 3,
            };
            let map = new kakao.maps.Map(container, options);

            const marker = new kakao.maps.Marker({
                position: latlng,
                title: "타이틀",
            });

            marker.setMap(map);
        };

        const script = document.createElement('script');
        script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=cefb8bef456fdc33b55d22b9108938be';
        script.async = true;
        script.onload = loadKakaoMap;
        document.head.appendChild(script);
    }, []);

    const menuOpen = () => {
        console.log('test');
    };

    return (
        <MapContent>
            <Navigation />
            <header>
                지도<IoMdMenu onClick={menuOpen} className="menu" />
            </header>
            <div className="keywordList">
                <Tooltip text="대형마트" imgSrc="market.png">
                    <FaStore className="keyword"/>
                </Tooltip>
                <Tooltip text="음식점" imgSrc="market.png">
                    <MdRestaurant className="keyword"/>
                </Tooltip>
                <Tooltip text="식자재마트" imgSrc="market.png">
                    <FaShoppingCart className="keyword"/>
                </Tooltip>
                <Tooltip text="시장" imgSrc="market.png">
                    <FaStoreAlt className="keyword"/>
                </Tooltip>
            </div>
            
            <div id="content">
                <div id='map'></div>
                <div className="refresh">
                    <div><IoIosRefresh style={{ marginRight: '1rem' }} id='iorefresh'/>이 근처 장소 탐색</div>
                </div>
            </div>
        </MapContent>
    );
};

export default KakaoMap;

const MapContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 975px;
    margin: 0 auto;
    height: 100vh;
    box-shadow: 0 0 15px gray;
    header {
        display: flex;
        justify-content: space-between;
        font-size: 2rem;
        padding: 1rem;
        width: 100%;
        box-sizing: border-box; /* Ensure padding is included in width calculation */
        .menu {
            margin-right: 1rem;
            &:active {
                transform: rotate(90deg);
            }
            transition: transform .15s ease-in-out;
            pointer-events: auto;
        }
        user-select: none;
    }

    .keywordList {
        margin: .5rem auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        width: 70%;
        .keyword {
            height: 55px;
            width: 55px;
            background-color: #55A416;
            border-radius: 50%;
            padding: .7rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 5px;
            &:active {
                background-color: #55DD16;
                box-shadow: 0 3px 15px gray;
                transform: translateY(4px);
            }
        }
    }

    #content {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        flex: 1;
        width: 100%;
        height: 100%; /* Adjust for padding and header height */

        #map {
            width: 100%;
            height: 100%;
        }

        .refresh {
            position: absolute;
            top: 6%;
            display: flex;
            background-color: white;
            border-radius: 1rem;
            width: 25vh;
            z-index: 10;
            padding: .5rem 1rem;
            align-items: center;
            justify-content: center;
            font-size: .8rem;
            &:active { /* refresh 클릭 시 배경색 초록색, 버튼 클릭 되는 느낌 */
                background-color: #55A416;
                box-shadow: 0 2px #666;
                transform: translateY(4px);
                #iorefresh { /* 아이콘 회전 */
                    transform: rotate(90deg);
                }
                transition: transform 1s ease-in-out;
            }
            div {
                display: flex;
                justify-content: center;
                align-items: center;
                user-select: none;
            }
        }
    }

    @media (max-width: 768px) {
        max-width: 100%;
        header {
            width: 100%;
        }
        #content {
            width: 100%;
            height: calc(100% - 2rem); /* Adjust for padding and header height */
        }
        .keywordList .keyword {
            height: 45px;
            width: 45px;
        }
    }
    @media (max-width: 480px) {
        .keywordList .keyword {
            height: 25px;
            width: 25px;
        }
    }
`;