<template>
<h1>Shopping Cart</h1>
<div v-if="cartItems.length > 0">
  <ShoppingCartList :cartItems="cartItems" />
  <button class="checkout-button">Proceed to Checkout</button>
</div>
<div v-else>
  <p>Your Cart is Currently Empty.</p>
</div>
</template>

<script>
import axios from 'axios';
import ShoppingCartList from '@/components/ShoppingCartList.vue';
// import { cartItems } from '@/temp-data';

export default {
  name: "ShoppingCartPage",
  components: {
    ShoppingCartList,
  },
  data() {
    return {
      cartItems:[],
    };
  },
  async created() {
    const response = await axios.get('/api/users/12345/cart');
    const cartItems = response.data;
    this.cartItems = cartItems;
  },
}
</script>