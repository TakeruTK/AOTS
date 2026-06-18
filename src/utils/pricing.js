export const getProductPrice = (product) => {
  const price = Number(product?.price || 0);
  const salePrice = Number(product?.salePrice);

  if (Number.isFinite(salePrice) && salePrice > 0 && salePrice < price) {
    return salePrice;
  }

  return price;
};

export const hasProductOffer = (product) => getProductPrice(product) < Number(product?.price || 0);

export const formatUsdPrice = (value) => `$${Number(value || 0).toFixed(2)}`;
