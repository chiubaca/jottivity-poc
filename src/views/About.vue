<template>
  <div class="about">
    <BurgerMenu/>
    <CustomHeader/>
    <h1>This is an about page</h1>
  </div>
</template>


<script>
import CustomHeader from '@/components/CustomHeader.vue'
import BurgerMenu from "@/components/BurgerMenu.vue";

export default {
  name: "About",

  components: {

    BurgerMenu,
    CustomHeader
  },
}
</script>

<style>

</style>
