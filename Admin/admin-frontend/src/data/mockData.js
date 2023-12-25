// Spa----------------------------------------------------------------------------
const SpaData = [];

for (let i = 1; i <= 43; i++) {
  const spa = {
    id: i,
    name: `Spa ${i}`,
    phoneno: Math.floor(Math.random() * 9000000000) + 1000000000,
    city: i % 2 === 0 ? "Gandhinagar" : "Ahmedabad",
    area: i % 2 === 0 ? "Kudasan" : "alpha one mall",
    status: true,
    verified: "no",
    spaAcademy: "no",
    premium: "no",
    luxurious: "no",
    image: "user.png",
  };

  SpaData.push(spa);
}

// Therapy----------------------------------------------------------------------------
const TherapyData = [];

for (let i = 1; i <= 20; i++) {
  const therapy = {
    name: `Therapy ${i}`,
    priority: i,
    slug: i % 2 === 0 ? "Swedish" : "Oil massage",
    // gender: i % 3 === 0 ? "Male" : i % 2 === 0 ? "Female" : "Both",
    image: "user.png",
  };

  TherapyData.push(therapy);
}

// Offers----------------------------------------------------------------------------
const OffersData = [];

for (let i = 1; i <= 20; i++) {
  const offer = {
    offerName: `Offer ${i}`,
    spaName: `Spa ${i}`,
    priority: i,
    // gender: i % 3 === 0 ? "Male" : i % 2 === 0 ? "Female" : "Both",
    slug: i % 2 === 0 ? "Swedish" : "Oil massage",
    // discount: i % 2 === 0 ? "60%" : "50%",
    image: "user.png",
  };
  OffersData.push(offer);
}

// CallNow----------------------------------------------------------------------------
const CallNowData = [];

for (let i = 1; i <= 17; i++) {
  const callnow = {
    spaName: `spa ${i}`,
    urlSlug: "swedish therapy",
    time: "00:00:00",
    date: "1/1/2023",
    service: "offer",
    category: "category",
  };

  CallNowData.push(callnow);
}

//BookNow----------------------------------------------------------------------------
const BookNowData = [];

for (let i = 1; i <= 17; i++) {
  const booknow = {
    spaName: `spa ${i}`,
    urlSlug: "swedish therapy",
    time: "00:00:00",
    date: "1/1/2023",
    service: "offer",
    category: "category",
  };
  BookNowData.push(booknow);
}
// Cities----------------------------------------------------------------------------
const CitiesData = [];

for (let i = 1; i <= 5; i++) {
  const city = {
    cityName: `City ${i}`,
    priority: i,
    date: "1/1/2023",
  };

  CitiesData.push(city);
}

// Areas----------------------------------------------------------------------------
const AreasData = [];

for (let i = 1; i <= 20; i++) {
  const area = {
    areaName: `Area ${i}`,
    city: `City`,
    priority: i,
    date: "1/1/2023",
  };

  AreasData.push(area);
}

// Services----------------------------------------------------------------------------
const ServicesData = [];

for (let i = 1; i <= 20; i++) {
  const service = {
    spaId: i%5,
    serviceName: `service ${i}`,
    category: `category ${i}`,
    price: 69 * (i * 5),
    time: "00:00:00",
    discount: i * 69,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis aperiam vero.",
  };

  ServicesData.push(service);
}

// Exports----------------------------------------------------------------------------
export {
  AreasData,
  CitiesData,
  CallNowData,
  BookNowData,
  OffersData,
  ServicesData,
  SpaData,
  TherapyData,
};
