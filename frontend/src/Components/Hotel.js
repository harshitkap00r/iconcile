import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './Hotel.css';


function Hotel() {

    const [hotelData, setHotelData] = useState({});

    const { hotel, user } = useParams();

    useEffect(() => {
        fetch('http://localhost:8080/getHotelData/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: hotel })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setHotelData(res)
            })
    }, [])

    const bookingHandler = () => {
        fetch('http://localhost:8080/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: user, hotel: hotel })
        })
    }

    return (
        <div>
            <div className='hotel-title'>
                {hotelData.name}
            </div>
            <img className='hotel-image' src={hotelData.image} />
            <div className='hotel-detail-info'>
                <div className='hotel-location'>
                    Location: {hotelData.location}
                </div>
                <div className='hotel-rating'>
                    Rating: {hotelData.rating}
                </div>
                <div className='hotel-price'>
                    Price: ₹{hotelData.price}
                </div>
            </div>
            <button onClick={() => bookingHandler()} className='hotel-button'>Book Now</button>
        </div>
    )
}

export default Hotel;