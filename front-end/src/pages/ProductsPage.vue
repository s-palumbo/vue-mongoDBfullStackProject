<template>
<h1>Products</h1>
<ProductsList :products="products"/>
</template>

<script>
import ProductsList from '@/components/ProductsList.vue';
import axios from 'axios';
/* import { products } from '../temp-data'; */

export default {
  name: "ProductsPage", /* this is a component, thigs added need commas to separate */
  components: {
    ProductsList,
  },
  data() {
    return {
      products: [],
    };
  },
  async created() {
    const response = await axios.get('/api/products'); //proxy setup, add "api" in front of endpoints here AND in server.js
    const products = response.data;
    this.products = products;
  }
}
</script>