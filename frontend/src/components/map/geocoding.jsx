import Axios from "axios";
import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';



export class MapContain extends React.Component {
    constructor(props){
        super(props)
        this.state = {key: 0};
    }

    componentDidMount() {
        this.geocode(this.props.location)
    }

    render() {
        if(this.state.key === 0) return null
        const mapStyles = {
            width: '50%',
            height: '50%',
          };
        return (
            <div>
            <Map
            google={this.props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={this.state.key}
            >
            <Marker position={this.state.key}/>
            </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA9w4yZlROGaoP6q-a338pBQU2haj_3v6s'
  })(MapContain);
