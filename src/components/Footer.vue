<template>
  <div class="footer center-flex">
    <img
      src="@/assets/present.png"
      alt="KG Media Present"
      class="footerPresent"
      id="ftLogo"
    />
    <div :class="{ active: isBackActive }" class="footerWrap center-flex">
      <button class="button footerBack__btn" @click="backHome" id="btnback">
        <img src="@/assets/icon-back.png" alt="" class="footerBack" /> Kembali
      </button>
      <button class="button footerBack__btn" @click="backMenu" id="btnhome">
        <img src="@/assets/icon-home.png" alt="" class="footerBack" /> Beranda
      </button>
      <img src="@/assets/logokomplay.png" alt="Kompas Play" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer_compo",
  props: ["isBackActive"],
};
</script>

<style scoped lang="scss">
.footer {
  flex-direction: column;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-top: 27px;
  padding-bottom: 27px;
  background: var(--cl-white);
  &Wrap {
    width: calc(100% - 40px);
    padding: 0 20px;
    min-height: 26px;
    &.active {
      justify-content: space-between;
    }
  }
  &Present {
    position: absolute;
    top: -70px;
  }
  &Back {
    vertical-align: middle;
    margin-right: 10px;
    &__btn {
      display: none;
      font-family: var(--font-child);
      font-weight: 400;
      font-size: 14px;
      color: var(--cl-secondary);
    }
  }
}
</style>