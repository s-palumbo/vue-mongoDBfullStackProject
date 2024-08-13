<template>

<div class="nav-bar">
  
  <RouterLink to="/products" class="products-link"> 
    <div class="logo-wrap">
      <img :src="logo" />
    </div>
  </RouterLink>

  <RouterLink to="/cart" class="cart-link">
    <button>Shopping Cart</button>
  </RouterLink>
  
</div>

</template>


<script>

import logo from '@/assets/logo-hexagon.svg';

import { RouterLink } from 'vue-router'; /* to use RouterLink, import in script and USE as component */

export default {
  name: "NavBar",
  components: {
    RouterLink
  },
  data() {
    return {
      logo,
    };
  }
}


</script>

<!-- Another option for RouterLink is to use it in the template HTML
 section as lower-cased with a dash: <router-link to=""> 
 And then you don't need to import it or declare it as a component -->