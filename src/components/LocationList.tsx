import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

export const locationsMock: Location[] = [
  {
    id: 2,
    name: 'Home',
    latitude: '1477',
    longitude: '699877',
  },
  {
    id: 2,
    name: 'Parents',
    latitude: '1477',
    longitude: '699877',
  },
  {
    id: 3,
    name: 'Work',
    latitude: '1477',
    longitude: '699877',
  },
  {
    id: 4,
    name: 'Kid\'s School',
    latitude: '1477',
    longitude: '699877',
  },
];

export const LocationList = ({ locations }: { locations: Location[] }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>Location</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Actions</Item>
        </Grid>
        {locations.map(location => {
          return <LocationItem location={location} />;
        })}
      </Grid>
    </Box>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export type Location = {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
};

const LocationItem = ({ location }: { location: Location }) => {
  return (
    <>
      <Grid item xs={6}>
        <span>{location.name}</span>
      </Grid>
      <Grid item xs={3}>
        <Button variant="text">View</Button>
      </Grid>
      <Grid item xs={3}>
        <Button variant="text">Delete</Button>
      </Grid>
    </>
  );
};
