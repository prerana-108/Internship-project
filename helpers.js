export function formatPrice(cents) {
  return (cents / 100).toLocaleString("en-India", {
    style: "currency",
    currency: "INR"
  });
}

export function formatToppings(arr){
 const joined = arr.join(', ');
 return joined.charAt(0).toUpperCase() + joined.slice(1);
}
