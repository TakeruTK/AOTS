import React from 'react';
import { Box, Fab, Tooltip } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WHATSAPP_NUMBER = '56920432179';
const MESSAGE = 'Hello, I would like to ask about Ashes of the Souls jewelry.';

const WhatsAppButton = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <Box
      sx={{
        position: 'fixed',
        right: { xs: 16, sm: 24 },
        bottom: { xs: 16, sm: 24 },
        zIndex: 1200,
      }}
    >
      <Tooltip title="Contact us on WhatsApp" placement="left">
        <Fab
          component="a"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact Ashes of the Souls on WhatsApp"
          sx={{
            width: { xs: 54, sm: 60 },
            height: { xs: 54, sm: 60 },
            backgroundColor: '#25D366',
            color: '#0b1f12',
            boxShadow: '0 10px 26px rgba(0, 0, 0, 0.45)',
            '&:hover': {
              backgroundColor: '#1ebe5d',
              transform: 'translateY(-2px)',
            },
          }}
        >
          <WhatsAppIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default WhatsAppButton;
