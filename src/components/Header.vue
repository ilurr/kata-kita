<template>
  <div class="text-center" id="logoWrap">
    <img src="@/assets/logo.png" class="headerImg" ref="logo" id="logo" alt="Kata Kita" />
    <!-- <h1 cl>{{ gametitle }}</h1> -->
  </div>
</template>

<script>
export default {
  name: "Header_compo",
  props: ["gametitle"],
};
</script>

<style lang="scss">
.header {
  &Img {
    margin-top: 90px;
    margin-bottom: 40px;
    max-width: 160px;
    transform: scale(0) rotate(180deg);
  }
}
</style>