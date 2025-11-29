
import React from 'react';
import { Link } from 'react-router-dom';

const shopContainerStyle = {
  padding: '2rem',
  backgroundColor: '#1a1a1a',
  textAlign: 'center',
};

const pageTitleStyle = {
  fontFamily: "'Nosifer', cursive",
  color: '#e53935',
  fontSize: '3rem',
  textShadow: '3px 3px 6px #000',
  margin: '2rem 0',
};

const sectionStyle = {
  margin: '4rem 0',
};

const sectionTitleStyle = {
  fontFamily: "'Creepster', cursive",
  color: '#fdd835',
  fontSize: '2.5rem',
  textDecoration: 'none',
   textShadow: '2px 2px 4px #000',
};

const sectionDescriptionStyle = {
    color: '#f5f5f5',
    fontSize: '1.2rem',
    maxWidth: '600px',
    margin: '1rem auto'
}

const Shop = () => {
  return (
    <div style={shopContainerStyle}>
      <h1 style={pageTitleStyle}>Nuestra Tienda Macabra</h1>
      <div style={sectionStyle}>
          <Link to="/jewelry" style={sectionTitleStyle}>
            <h2>Joyería Siniestra</h2>
          </Link>
          <p style={sectionDescriptionStyle}>
            Anillos, collares y pendientes forjados en las llamas del inframundo. Encuentra la pieza perfecta para tu ritual nocturno o tu paseo por el cementerio.
          </p>
      </div>
       <div style={sectionStyle}>
            <h2 style={{...sectionTitleStyle, color: '#555'}}>Ropa (Próximamente)</h2>
            <p style={sectionDescriptionStyle}>
                Viste la oscuridad. Próximamente, camisetas, sudaderas y más, con diseños de tus peores pesadillas.
            </p>
      </div>
       <div style={sectionStyle}>
            <h2 style={{...sectionTitleStyle, color: '#555'}}>Artefactos (Próximamente)</h2>
            <p style={sectionDescriptionStyle}>
                Decora tu guarida con arte y objetos malditos. Cráneos, grimorios y otras curiosidades te esperan.
            </p>
      </div>
    </div>
  );
};

export default Shop;
