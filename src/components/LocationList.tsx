import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Modal } from '@mui/material';
import { SimpleMap } from './SimpleMap';
import { useQuery } from 'react-query';
import { Loader } from './Loader';

export const LocationList = () => {
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [currentLocation, setCurrentLocation] = React.useState<Location>();
  const handleViewModalClose = () => setOpenViewModal(false);
  const getLocations = async () => {
    const response = await fetch(`http://localhost:6868/api/locations`);
    const result = await response.json();
    return {
      locations: result.data.map(
        (location: { id: string; name: string; latitude: string; longitude: string }) => {
          return {
            id: location.id,
            name: location.name,
            coords: {
              lat: Number(location.latitude),
              lng: Number(location.longitude),
            },
          };
        }
      ),
    };
  };
  const { data, status } = useQuery('locations', getLocations);
  if (status === 'loading') {
    return <Loader />;
  }

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
        {data?.locations.map((location: Location) => {
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
