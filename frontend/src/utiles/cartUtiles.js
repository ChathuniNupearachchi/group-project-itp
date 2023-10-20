export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
} 

export const updateCart = (state) => {
    //calculate item price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => 
    acc + item.price * item.qty , 0));

    //calculate shipping price (If order is over 30000 then free, else 300 shipping)
    state.shippingPrice = addDecimals(state.itemsPrice > 30000 ? 0 : 300);

    //calculate tax price(10%)
    state.taxPrice = addDecimals(Number((0.10 * state.itemsPrice).toFixed(2)));

    //calculate total price
    state.totalPrice = addDecimals((
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2));

    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}