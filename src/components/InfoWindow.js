const InfoWindow = ({place, onClick}) => {
    return (
        <div className="infoWindowClass" style={{userSelect:'none', margin:'.5rem', pointerEvents: 'auto'}} onClick={onClick}>
            <h4>{place.place_name}</h4>
            <h5>{place.road_address_name}</h5>
            <h6>{place.phone}</h6>
        </div>
    );
};

export default InfoWindow