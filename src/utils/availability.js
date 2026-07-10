export const PRODUCT_AVAILABILITY = {
  AVAILABLE: 'available',
  CLOSED: 'closed',
};

export const normalizeAvailabilityStatus = (value) => (
  value === PRODUCT_AVAILABILITY.CLOSED
    ? PRODUCT_AVAILABILITY.CLOSED
    : PRODUCT_AVAILABILITY.AVAILABLE
);

export const isProductAvailable = (product) => (
  normalizeAvailabilityStatus(product?.availabilityStatus) === PRODUCT_AVAILABILITY.AVAILABLE
);

export const getProductAvailabilityLabelKey = (product) => (
  isProductAvailable(product) ? 'product.available' : 'product.closed'
);
