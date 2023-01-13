const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63b5a07d4d3be93f84526ee0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude
                ]               
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dqa8vcbx8/image/upload/v1673359835/YelpCamp/dxrbb8muekdmrhohfpft.png',
                  filename: 'YelpCamp/dxrbb8muekdmrhohfpft'
                },
                {
                  url: 'https://res.cloudinary.com/dqa8vcbx8/image/upload/v1673359835/YelpCamp/gxnenndohfq9jbn31osn.jpg',
                  filename: 'YelpCamp/gxnenndohfq9jbn31osn'
                },
                {
                  url: 'https://res.cloudinary.com/dqa8vcbx8/image/upload/v1673359836/YelpCamp/mwrzxd7bhwqb8cv5mevo.jpg',
                  filename: 'YelpCamp/mwrzxd7bhwqb8cv5mevo'
                },
                {
                  url: 'https://res.cloudinary.com/dqa8vcbx8/image/upload/v1673359836/YelpCamp/xbwa0m5mauqwqwwbwd9c.jpg',
                  filename: 'YelpCamp/xbwa0m5mauqwqwwbwd9c'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})