// useHook
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

// rendering
import { renderToString } from 'react-dom/server';

// styled-components
import styled, { css } from "styled-components";

//react-icons
import { IoMdMenu, IoIosRefresh } from "react-icons/io";
import { FaStore } from "react-icons/fa6";
import { MdRestaurant } from "react-icons/md";
import { FaShoppingCart, FaStoreAlt } from "react-icons/fa";

// custom components
import Navigation from "../components/Navigation";
import Tooltip from "../components/Tooltip";
import GeolocationExample from "../components/GeolocationExmple";
import InfoWindow from "../components/InfoWindow";

// kakao map
const { kakao } = window;

const KakaoMap = () => {
    // Hook
    // 1) Link 태그 없이 페이지 라우팅이 가능한 Hook
    const navigate = useNavigate();

    // 2) useState
    // - 위 경도 정보
    const [location, setLocation] = useState({ latitude: null, longitude: null }); // 현재 위치(위경도)
    // - 카카오 검색 REST API 요청 결과인 장소들을 저장
    const [Places, setPlaces] = useState([]); // keyword로 검색한 장소 목록
    // - 선택한 키워드 정보
    const [currentKeyword, setCurrentKeyword] = useState('대형마트'); 

    // 3) useRef
    // - kakaomap 참조변수
    const mapRef = useRef(null); 
    // - marker 목록 참조변수
    const markersRef = useRef([]);
    // - infowindow 목록
    const infoWindowsRef = useRef([]); // 마커 윈도우창

    // map의 중심 좌표(위경도) 처리 메소드(코틀린과 연동)
    const resLocation = (latitude, longitude) => {
        setLocation({ latitude, longitude });
    };

    window.resLocation = resLocation;

    // 키워드로 하는 카카오 검색 REST API 요청 메소드
    const fetchNearbyPlaces = async () => {
        const apiKey = '11581c54c070cdfea295c16038bab831';
        const url = `https://dapi.kakao.com/v2/local/search/keyword.json?y=${location.latitude}&x=${location.longitude}&radius=2000&query=${currentKeyword}`;
        const headers = new Headers({ 'Authorization': `KakaoAK ${apiKey}`, 'Content-Type': 'application/json' });

        try {
            const response = await fetch(url, { method: 'GET', headers });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPlaces(data.documents);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // 마커 목록이 맵 지도상에 있을 경우 삭제, infoWindows는 close
    const clearMarkers = () => {
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
        infoWindowsRef.current.forEach(infoWindow => infoWindow.close());
        infoWindowsRef.current = [];
    };

    // 마커 목록 및 infoWindow 추가 
    const addMarkers = () => {
        if (!mapRef.current) return;

        // 키워드 검색 Rest API로 가져온 장소목록을 foreach 문으로 1개씩 마커, infowindow 추가
        Places.forEach(place => {
            const latlng = new kakao.maps.LatLng(place.y, place.x);
            const marker = new kakao.maps.Marker({
                position: latlng,
                title: place.place_name
            });
            
            const iwContent= renderToString(<InfoWindow place={place}/>)

            // infowindow 생성
            const infowindow = new kakao.maps.InfoWindow({
                content: iwContent
            });

            // 마커를 맵에 표시
            marker.setMap(mapRef.current);
            // 마커 참조변수 목록에 마커를 추가
            markersRef.current.push(marker);
            // infowindow 참조변수 목록에 infowindow 추가
            infoWindowsRef.current.push(infowindow);
            
            // 마커 클릭 시 infowindow가 열려있을 경우 close, 닫혀있을 경우 open
            kakao.maps.event.addListener(marker, 'click', () => {
                const isOpen = infowindow.getMap() // infowindow가 맵상에 존재할 경우 true, 존재하지 않을 경우 false
                infoWindowsRef.current.forEach(window => window.close()); // 무조건 close 동작
                if(!isOpen) { // infowindow가 열려 있을 경우(true) open 동작하지 않고, infowindow가 닫혀 있을 경우(false) open 동작함
                    infowindow.open(mapRef.current, marker);
                }
            });

        });
    };

    // kakaomap 라이브러리를 index.html에서 불러와도, kakaomap 불러오는 것은 비동기로 동작하므로 useEffect로 다시 라이브러리를 불러옴
    useEffect(() => {
        // 현재 위치정보를 불러왔을 경우에만 동작
        if (location.latitude && location.longitude) {
            const loadKakaoMap = () => {
                if (!window.kakao || !window.kakao.maps) {
                    console.error('kakao.maps API가 로드되지 않았습니다.');
                    return;
                }
                const container = document.getElementById('map');
                const options = {
                    center: new kakao.maps.LatLng(location.latitude, location.longitude), // 지도 상의 중심 좌표 지정
                    draggable: true, // 드래그 가능 여부
                    level: 7, // 줌 확대 레벨. 낮을 수록 최대 확대 된것임
                };
                mapRef.current = new kakao.maps.Map(container, options); // map을 생성하면서 map 참조변수 지정
                fetchNearbyPlaces(); // 카카오 검색 REST API 메소드
            };

            const script = document.createElement('script');
            script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=cefb8bef456fdc33b55d22b9108938be';
            script.async = true;
            script.onload = loadKakaoMap;
            document.head.appendChild(script);
        }
    }, [location]);

    // keyword로 불러온 장소가 1개 이상일 경우 마커 삭제 및 마커 재 추가
    useEffect(() => {
        if (Places.length > 0) {
            clearMarkers();
            addMarkers();
        }
    }, [Places]);

    // 우상단 메뉴 
    const menuOpen = () => {
        console.log('test');
    };

    // 맵상에 존재하는 "이 근처 장소 탐색" 클릭시 동작하는 메소드
    const refreshSearch = () => {
        if (mapRef.current) {
            const center = mapRef.current.getCenter();
            setLocation({ latitude: center.getLat(), longitude: center.getLng() });
        } else {
            console.error('Map is not initialized');
        }
    };

    // 화면 랜더링 부분
    return (
        <MapContent>
            <GeolocationExample onLocation={setLocation} />
            <Navigation />
            <header>
                지도<IoMdMenu onClick={menuOpen} className="menu" />
            </header>
            <div className="keywordList">
                <Tooltip text="대형마트" imgSrc="market.png">
                    <KeywordIconWrapper className="keyword" isActive={currentKeyword === '대형마트'} onClick={() => setCurrentKeyword('대형마트')}>
                        <FaStore className="icon" />
                    </KeywordIconWrapper>
                </Tooltip>
                <Tooltip text="음식점" imgSrc="market.png">
                    <KeywordIconWrapper className="keyword" isActive={currentKeyword === '음식점'} onClick={() => setCurrentKeyword('음식점')}>
                        <MdRestaurant className="icon" />
                    </KeywordIconWrapper>
                </Tooltip>
                <Tooltip text="식자재마트" imgSrc="market.png">
                    <KeywordIconWrapper className="keyword" isActive={currentKeyword === '식자재마트'} onClick={() => setCurrentKeyword('식자재마트')}>
                        <FaShoppingCart className="icon" />
                    </KeywordIconWrapper>
                </Tooltip>
                <Tooltip text="시장" imgSrc="market.png">
                    <KeywordIconWrapper className="keyword" isActive={currentKeyword === '시장'} onClick={() => setCurrentKeyword('시장')}>
                        <FaStoreAlt className="icon"/>
                    </KeywordIconWrapper>
                </Tooltip>
            </div>

            <div id="content">
                <div id='map' ref={mapRef}></div>
                <div className="refresh" onClick={refreshSearch}>
                    <div><IoIosRefresh style={{ marginRight: '1rem' }} id='iorefresh' />이 근처 장소 탐색</div>
                </div>
            </div>
        </MapContent>
    );
};

export default KakaoMap;

// 스타일 변수 목록
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
        width: 100%;
        .keyword {
            height: 55px;
            width: 55px;
            background-color: #55A416;
            border-radius: 50%;
            padding: .3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 1px;
            .icon{
                height: 25px;
                width: 25px;
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
            border: 1px solid black;
            &:active { /* refresh 클릭 시 배경색 초록색, 버튼 클릭 되는 느낌 */
                background-color: #55A416;
                box-shadow: 0 2px #666;
                transform: translateY(2px);
                #iorefresh { /* 아이콘 회전 */
                    transform: rotate(90deg);
                }
                transition: transform .2s ease-in-out;
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
            padding: .25rem;
            .icon{
                height: 20px;
                width: 20px;
            }
        }
    }
    @media (max-width: 480px) {
        .keywordList .keyword {
            height: 25px;
            width: 25px;
            padding: .2rem;
            .icon{
                height: 15px;
                width: 15px;
            }
        }
    }
`;

const activeStyle = css`
  box-shadow: 0 3px 15px gray;
  transform: scale(1.1);
  border: 2px solid #557000;
`;

const KeywordIconWrapper = styled.div`
  height: 55px;
  width: 55px;
  background-color: #55A416;
  border-radius: 50%;
  padding: .7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  cursor: pointer;
  ${(props) => props.isActive && activeStyle}

  &:active {
    ${activeStyle}
  }
`;