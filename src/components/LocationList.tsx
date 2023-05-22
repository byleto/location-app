import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Modal } from '@mui/material';
import { SimpleMap } from './SimpleMap';

export const locationsMock: Location[] = [
  {
    id: 2,
    name: 'Home',
    coords: {
      lat: 1477,
      lng: 699877,
    },
  },
  {
    id: 2,
    name: 'Parents',
    coords: {
      lat: 1477,
      lng: 699877,
    },
  },
  {
    id: 3,
    name: 'Work',
    coords: {
      lat: 1477,
      lng: 699877,
    },
  },
  {
    id: 4,
    name: "Kid's School",
    coords: {
      lat: 1477,
      lng: 699877,
    },
  },
];

export const LocationList = ({ locations }: { locations: Location[] }) => {
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [currentLocation, setCurrentLocation] = React.useState<Location>();
  const handleViewModalClose = () => setOpenViewModal(false);

  const LocationItem = ({ location }: { location: Location }) => {
    return (
      <>
        <Grid item xs={6}>
          <span>{location.name}</span>
        </Grid>
        <Grid item xs={3}>
          <Button
            onClick={() => {
              setOpenViewModal(true);
              setCurrentLocation(location);
            }}
            variant="text">
            View
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant="text">Delete</Button>
        </Grid>
      </>
    );
  };
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
      <ViewLocation
        location={currentLocation}
        open={openViewModal}
        handleClose={handleViewModalClose}
      />
    </Box>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
}));

export type Location = {
  id: number;
  name: string;
  coords: {
    lat: number;
    lng: number;
  };
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ViewLocation = ({
  location,
  open,
  handleClose,
}: {
  location?: Location;
  open: boolean;
  handleClose: any;
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <SimpleMap location={location} zoomLevel={15} />
        </Box>
      </Modal>
    </div>
  );
};
