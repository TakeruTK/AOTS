
import React from 'react';
import ProductCard from '../components/ProductCard';

const jewelryContainerStyle = {
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

const productGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '2rem',
  maxWidth: '1200px',
  margin: '0 auto',
};


const jewelryProducts = [
  {
    id: 1,
    name: 'Anillo de Calavera',
    description: 'Un anillo forjado en plata maldita, con una calavera que susurra secretos oscuros.',
    price: 666,
    image: 'https://images.unsplash.com/photo-1599833413344-846139551a14?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 2,
    name: 'Collar de Huesos',
    description: 'Fragmentos de huesos de antiguos guerreros, unidos por un hilo de sombras.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1611652033939-a7e203c2d73a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 3,
    name: 'Pendientes de Murciélago',
    description: 'Pequeños murciélagos de obsidiana que cobran vida a la luz de la luna llena.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1586362534340-9b033d0f3532?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
];

const Jewelry = () => {
  return (
    <div style={jewelryContainerStyle}>
      <h1 style={pageTitleStyle}>Joyería Siniestra</h1>
      <div style={productGridStyle}>
        {jewelryProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Jewelry;
