const InfoWindow = ({place}) => {
    const handleClick = () => {
        window.history.pushState(null, '', window.location.pathname); // 현재 경로를 이전 페이지로 저장
        window.location.href = place.place_url; // 새로운 페이지로 이동
    };
    return (
        <div onClick={handleClick} style={{userSelect:'none', margin:'.5rem'}}>
            <h4>{place.place_name}</h4>
            <h5>{place.road_address_name}</h5>
            <h6>{place.phone}</h6>
        </div>
    );
};

export default InfoWindow