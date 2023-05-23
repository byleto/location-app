import { Box, Grid } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import { useState, useCallback } from 'react';
import axios from 'axios';
import './map.css';
import { useQueryClient } from 'react-query';
import isEmpty from 'lodash/isEmpty';
import { API_KEY } from '../constants';

export const AddLocation = ({ handleClose }: { handleClose: any }) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [locationName, setLocationName] = useState('');
  const [validationError, setValidationError] = useState('');
  const queryClient = useQueryClient();

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      const location = {
        latitude,
        longitude,
        name: locationName,
      };
      if (isEmpty(locationName)) {
        setValidationError('Please provide a location name');
        return;
      }
      if (latitude === 0 && longitude === 0) {
        setValidationError('Please select a location on the map');
        return;
      }
      try {
        const response = await axios.post('http://localhost:6868/api/location', location);
        queryClient.invalidateQueries(['locations']);
        handleClose();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    [latitude, longitude, locationName]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ flexGrow: 1 }}>
        {validationError && <p>{validationError}</p>}
        <Grid container spacing={2}>
          <Grid item xs={12}></Grid>

          <Grid item xs={12}>
            <label>Location Name:</label>
          </Grid>
          <Grid item xs={12}>
            <input
              onChange={e => {
                e.preventDefault();
                setLocationName(e.target.value);
              }}
              placeholder="Location name"
            />
          </Grid>
          <Grid item xs={12}>
            <label>Latitute:</label>
          </Grid>
          <Grid item xs={12}>
            <input disabled value={latitude} placeholder="latitude" />
          </Grid>
          <Grid item xs={12}>
            <label>Longitude:</label>
          </Grid>

          <Grid item xs={12}>
            <input disabled value={longitude} placeholder="longitude" />
          </Grid>
          <Grid item xs={12}>
            <div className="google-map">
              <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY || ''}}
                zoom={15}
                onClick={e => {
                  setLatitude(e.lat);
                  setLongitude(e.lng);
                  console.log('latitude = ', e.lat);
                  console.log('longtitude = ', e.lng);
                }}
                defaultCenter={{ lat: -7.747872, lng: 110.4218147 }}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <input type="submit" />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};
