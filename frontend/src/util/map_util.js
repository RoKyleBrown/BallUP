import axios from 'axios';


export const getAddress = (address) => {
  return axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
    address: address,
    key: 'AIzaSyAmen9kYggzGMA5XU8lAFWPi5UypUUneEs'
  }
)};

