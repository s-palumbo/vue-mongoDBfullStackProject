<template>
  <h1>Products Details</h1>
    <div v-if="product"> 
    <div class="img-wrap">
      <img :src="product.imageUrl" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">{{ product.price }}</h3>
      <button class="add-to-cart">Add to Cart</button>
    </div>
    </div>
    <div v-else >
      <!-- <p>Product not found.</p> -->
       <NotFoundPage />
    </div>

</template>

<script>
import axios from 'axios';
/* import { products } from '../temp-data'; */
import NotFoundPage from '@/pages/NotFoundPage.vue';

export default {
  name: "ProductDetailPage",
  data() {
    return {
      /* product: products.find(product => product.id === this.$route.params.productId) || null, */
      product: {},
    }
  },
  components: {
    NotFoundPage
  },
  async created() {
    const response = await axios.get(`/api/products/${this.$route.params.productId}`);
    const product = response.data;
    this.product = product;
  }
}
</script>

<!-- Retained commented out code that was the "dummy" code prior to adding a backend database. Leaving it as reference for 
 potential future use of front-end only apps -->