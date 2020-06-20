export default function moneyFormat(price) {
  const pieces = String(price).split('');
  let ii = pieces.length;
  while ((ii -= 3) > 0) {
    if (price < 0 && ii === 1) {
      pieces.splice(ii, 0, '');
    } else {

      pieces.splice(ii, 0, ',');
    }
  }
  return pieces.join('')
}