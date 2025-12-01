
import React from 'react';
import {
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';

const Image = ({ item }) => {
  return (
    <ImageListItem sx={{
      position: 'relative',
      overflow: 'hidden',
      '& .MuiImageListItemBar-root': {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        transition: 'transform 0.35s ease-out, opacity 0.35s ease-out',
        opacity: 0,
        transform: 'translateY(100%)',
      },
      '&:hover .MuiImageListItemBar-root': {
        opacity: 1,
        transform: 'translateY(0)',
      },
      '& img': {
        transition: 'filter 0.3s ease-in-out, transform 0.3s ease-in-out',
      },
      '&:hover img': {
        filter: 'grayscale(20%) brightness(1)',
        transform: 'scale(1.05)',
      }
    }}>
      <img
        src={`${item.img}?w=248&fit=crop&auto=format`}
        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
        alt={item.title}
        loading="lazy"
        style={{ filter: 'grayscale(80%) brightness(0.8)', borderRadius: '4px' }}
      />
      <ImageListItemBar
        title={item.title}
        sx={{
          fontFamily: "'Montserrat Light', 'Lato Light', sans-serif",
          textAlign: 'center',
          '& .MuiImageListItemBar-title': {
            fontSize: '1.2rem',
            letterSpacing: '0.1em',
            textShadow: '0px 0px 8px rgba(184, 134, 11, 0.9)'
          },
        }}
      />
    </ImageListItem>
  );
};

export default Image;
