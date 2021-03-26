import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React from 'react'
import Axios from "axios";


export class MapContainer extends React.Component {



    componentDidMount() {
        this.geocode(this.props.location)
    }

    geocode(location) {
        let res = Axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
                params: {
                        address: location,
                key: 'AIzaSyAmen9kYggzGMA5XU8lAFWPi5UypUUneEs'
                    }
                }
        )
    
        .then(response => {
            var formattedAddress = response.data.results[0].geometry.location;
            this.setState({key: formattedAddress})
            })
    
    }

    render() {

        const mapStyles = {
            width: '50%',
            height: '50%',
          };

        return ( 
            <Map
            google={this.props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{lat: 0, lng:0}}
            >
            <Marker position= {{lat: 0, lng:0}}/>
            </Map>
        )
    }

}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAmen9kYggzGMA5XU8lAFWPi5UypUUneEs'
  })(MapContainer);
