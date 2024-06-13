const InfoWindow = ({place}) => {
    return (
        <div style={{userSelect:'none', margin:'.5rem'}}>
            <h4>{place.place_name}</h4>
            <h5>{place.road_address_name}</h5>
            <h6>{place.phone}</h6>
            <a href={place.place_url} target="_blank" rel="noopener noreferrer">이동</a>
        </div>
    );
};

export default InfoWindow