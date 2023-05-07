import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Hotels from '../Data/Hotels.json';
import './Home.css';


function Home() {


    const [hotels, setHotels] = useState([]);

    const { user } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/getHotelsData')
        .then(res => res.json())
        .then(res => {
            console.log(res)
            setHotels(res);
        })
    }, [])

    const bookingHandler = (name) => {
        console.log(name)
        fetch('http://localhost:8080/increaseVisit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify({name:name})
        })
        navigate(name)
    }

    const showMyBooking = () => {
        fetch('http://localhost:8080/showMyBooking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify({name:user})
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            window.alert(res)
        })
    }

    return (
        <>
            <div className='home-title'>
                Available Hotels
            </div>
            <button className='my-booking' onClick={showMyBooking}> Show my Booking</button>
            <div className='home-hotels'>
                {hotels.map((hotel) => {
                    if (0 < hotel.availableRoom) {
                        return (
                            <div className='home-hotel' key={hotel.id}>
                                <img className='home-hotel-image' src={hotel.image}></img>
                                <div className='home-hotel-info'>
                                    <div className='home-hotel-name'>
                                        {hotel.name}
                                    </div>
                                    <div className='home-hotel-location'>
                                        Location: {hotel.location}
                                    </div>
                                    <div className='home-hotel-rating'>
                                        Rating: {hotel.rating}
                                    </div>
                                    <div className='home-hotel-available-room'>
                                        Available Room: {hotel.availableRoom}
                                    </div>
                                    <div className='home-hotel-visit-count'>
                                        Visit: {hotel.visitCount}
                                    </div>
                                    <div className='home-hotel-price'>
                                        Price: ₹{hotel.price}
                                    </div>
                                    <button onClick={() => bookingHandler(hotel.name)} className='home-hotel-book'>Book</button>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </>
    )
}

export default Home;