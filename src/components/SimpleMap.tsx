import GoogleMapReact from 'google-map-react';
import { Location } from './LocationList';

import './map.css';

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
        bootstrapURLKeys={{ key: 'AIzaSyCcL9gSwPyYGlniOCGZkiC5SrBvqyevRDE' }}
        defaultCenter={location?.coords}
        defaultZoom={zoomLevel}>
        <LocationPin text={location?.name} />
      </GoogleMapReact>
    </div>
  </div>
);
