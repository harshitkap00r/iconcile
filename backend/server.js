const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json())

app.get('/getUsersData', (req, res) => {
    const Users = fs.readFileSync('./Data/Users.json').toString();
    res.send(Users)
})

app.get('/getHotelsData', (req, res) => {
    const Hotels = fs.readFileSync('./Data/Hotels.json').toString();
    res.send(Hotels)
})

app.post('/increaseVisit', (req, res) => {
    var Hotels = JSON.parse(fs.readFileSync('./Data/Hotels.json'));
    Hotels = Hotels.map((hotel) => {
        console.log(hotel.name)
        if (hotel.name == req.body.name) {
            return {
                ...hotel,
                visitCount: hotel.visitCount + 1
            }
        } else {
            return hotel
        }
    })
    console.log(Hotels)
    fs.writeFileSync('./Data/Hotels.json', JSON.stringify(Hotels));
    
})

app.post('/getHotelData', (req, res) => {
    const Hotels = JSON.parse(fs.readFileSync('./Data/Hotels.json'));
    Hotels.forEach(hotel => {
        if (hotel.name == req.body.name) {
            res.send(hotel)
        }
    })
})

app.post('/booking', (req, res) => {
    var Users = JSON.parse(fs.readFileSync('./Data/Users.json'));
    Users = Users.map(user => {
        if (user.name == req.body.user) {
            return {
                ...user,
                booked: [...user.booked, req.body.hotel]
            }
        } else {
            return user
        }
    })
    console.log(Users);
    fs.writeFileSync('./Data/Users.json', JSON.stringify(Users))
})

app.post('/showMyBooking', (req, res) => {
    var Users = JSON.parse(fs.readFileSync('./Data/Users.json'));
    Users = Users.map(user => {
        if (user.name == req.body.name) {
            res.send(user.booked)
        }
    })
})

function getUsersData() {
    return Users;
}

app.listen(8080, () => {
    console.log('server started')
})