const priceFormatter = (price: number) => {
  const newFormat = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumSignificantDigits: 3,
  }).format(price);

  const formatWithDot = newFormat.replace(/^Rp(\s?)/, "Rp. $1");

  return formatWithDot;
};

export default priceFormatter;
