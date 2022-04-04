<template>
  <div v-if="!isHiddenLvl" id="lvlWrap">
    <h2 class="text-center menuTitle" id="text1">Pilih Jumlah Huruf</h2>
    <ul class="listMenu">
      <li>
        <button
          class="button buttonMenu buttonMenu__lvl"
          @click="updateParent"
          id="btn1"
        >
          <span><span class="buttonMenu__num">1</span>Mudah</span>
          <span class="buttonMenu__txt">4 Huruf</span>
        </button>
      </li>
      <li>
        <button
          class="button buttonMenu buttonMenu__lvl"
          id="btn2"
          @click="updateParent, (isHiddenLvl = true)"
        >
          <span><span class="buttonMenu__num">2</span>Sedang</span>
          <span class="buttonMenu__txt">5 Huruf</span>
        </button>
      </li>
      <li>
        <button class="button buttonMenu buttonMenu__lvl" id="btn3">
          <span><span class="buttonMenu__num">3</span>Sulit</span>
          <span class="buttonMenu__txt">6 Huruf</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { gsap, Expo } from "gsap";

export default {
  name: "Menu_level",
  data() {
    return {
      isHiddenLvl: false,
      showGame: false,
    };
  },
  methods: {
    updateParent() {
      this.$emit("showGame", true);
      console.log(this.showGame);
      gsap.to("#logo", 0.5, {
        scale: 0,
        ease: Expo.easeIn,
      });
      gsap.to("#lvlWrap", 0.5, {
        x: 1000,
        ease: Expo.easeIn,
        onComplete: () => {
          gsap.to("#gameWrap", 1, {
            scale: 1,
            ease: Expo.easeOut,
          });
          this.isHiddenLvl = true;
        },
      });
      gsap.to("#ftLogo", 0.5, {
        scale: 0,
        ease: Expo.easeIn,
      });
      gsap.to("#btnback", 0.5, {
        display: 'none',
        ease: Expo.easeOut,
        onComplete: () => {
          gsap.to("#btnhome", 0.5, {
            display: 'block',
            ease: Expo.easeIn,
          });
        }
      });
    },
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
.menuTitle {
  font-family: var(--font-parent);
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: var(--cl-white);
  margin-bottom: 27px;
}
.buttonMenu {
  padding: 24px 30px;
  &__lvl {
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__txt {
    text-transform: uppercase;
    color: #9a9a9a;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.05em;
  }
  &__num {
    padding: 0 8px;
    margin-right: 12px;
    border: 2px solid var(--cl-main);
  }
}
.listMenu {
  list-style: none;
  padding: 0;
}
</style>