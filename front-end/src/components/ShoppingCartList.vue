<template>
  <div class="grid-wrap"> <!-- styling class tags in divs -->
    <div 
      class="product-item"
      v-for="product in products" 
      :key="product.id">
      <img :src="product.imageUrl" />
      <h3 class="product-name" >{{ product.name }}</h3>
      <p class="product-price" >{{ product.price }}</p>
      <RouterLink :to="'/products/' + product.id"> <!-- Don't forget to add the colon before the "to" if inserting JS functionality -->
        <button>View Details</button>
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductsList",
  props: ['products'],
}
</script>