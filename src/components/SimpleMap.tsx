import GoogleMapReact from 'google-map-react';
import { Location } from './LocationList';

import './map.css';
import { API_KEY } from '../constants';

const LocationPin = ({ text }: { text?: string; }) => (
  <div className="pin">
    <p className="pin-text">{text}</p>
  </div>
);

export const SimpleMap = ({
  location,
  zoomLevel,
}: {
  location?: Location;
  zoomLevel: number;
}) => (
  <div className="map">
    <h2 className="map-h2">{`Location: ${location?.name}`}</h2>

    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY || ""}}
        defaultCenter={location?.coords}
        defaultZoom={zoomLevel}>
        <LocationPin text={location?.name} />
      </GoogleMapReact>
    </div>
  </div>
);
