export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const calculateNights = (checkIn, checkOut) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const calculateTotalPrice = (checkIn, checkOut, pricePerNight) => {
  const nights = calculateNights(checkIn, checkOut);
  return nights * pricePerNight;
};

export const isValidDateRange = (checkIn, checkOut) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  return start < end;
};