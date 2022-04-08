<template>
  <div class="footer center-flex">
    <img
      src="@/assets/present.png"
      alt="KG Media Present"
      class="footerPresent"
      id="ftLogo"
      width="103"
      height="16"
    />
    <div :class="{ active: isBackActive }" class="footerWrap center-flex">
      <button class="button footerBack__btn" @click="backHome" id="btnback">
        <img
          src="@/assets/icon-back.png"
          alt=""
          class="footerBack"
          width="16"
          height="14"
        />
        Kembali
      </button>
      <button class="button footerBack__btn" @click="backHome" id="btnhome">
        <img
          src="@/assets/icon-home.png"
          alt=""
          class="footerBack"
          width="16"
          height="16"
        />
        Beranda
      </button>
      <img
        src="@/assets/logokomplay.png"
        alt="Kompas Play"
        width="148"
        height="18"
      />
    </div>
  </div>
</template>

<script>
// import { gsap, Expo, Back } from "gsap";

export default {
  name: "Footer_compo",
  props: ["isBackActive"],
  methods: {
    // backHome() {
    //   gsap.to("#logo", 2, {
    //     scale: 1,
    //     ease: Expo.easeOut,
    //     delay: 0.5,
    //     onComplete: () => {
    //       gsap.to("#menuWrap", 0.5, {
    //         scale: 1,
    //         alpha: 1,
    //         ease: Back.easeIn,
    //       });
    //     },
    //   });
    //   this.displayScoreboard = false;
    //   this.isHidden = false;
    // },
  },
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
    vertical-align: sub;
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