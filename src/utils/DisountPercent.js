export const DiscountPercentage = (price, discountPercentage) => {
  const disPrice = price / (1 - discountPercentage / 100); // İndirim oranına göre ürünün gerçek fiyatı
  const result = disPrice.toFixed(2); // Ondalık sayının virgülden sonra ilk iki basamağı
  return result;
};
