<template>
  <Header_compo :gametitle="gametitle" />

  <!-- @click="(showMenu = !showMenu), (isHidden = true), hideMenu" -->
  <div v-if="!isHidden" id="menuWrap">
    <button
      class="button buttonMenu buttonMenu--active"
      id="btnstart"
      @click="hideMenu"
    >
      <img
        src="@/assets/icon-game.png"
        class="buttonIcon"
        alt=""
        width="23"
        height="17"
      />
      <span class="buttonTxt">Yuk Main</span>
    </button>
    <button class="button buttonMenu" id="btnscore" @click="showScoreboard">
      <img
        src="@/assets/icon-score.png"
        class="buttonIcon"
        alt=""
        width="20"
        height="16"
      />
      <span class="buttonTxt">Papan Skor</span>
    </button>
  </div>

  <Menu_level @showGame="displayGame" v-if="showMenu" />

  <!-- <Game_compo :myGame="myGame" v-if="myGame" /> -->
  <Game_compo />
  <Scoreboard_compo v-if="displayScoreboard" />
  <!-- <Scoreboard_compo /> -->

  <!-- <h2>Welcome {{ name }}</h2>
  <button @click="changeName">Change Name</button>
  <p>Name : <input type="text" v-model="name" /></p>
  <p>
    <a :href="url" target="_blank" rel="noopener noreferrer"
      >Go to my Portfolio</a
    >
  </p>

  <input type="text" placeholder="Cari berdasar tebakan" v-model="find" />
  <ul>
    <li v-for="answer in findData" :key="answer.id">
      {{ answer.guest }} - {{ answer.time }}
    </li>
  </ul> -->

  <Footer_compo :isBackActive="isBackActive" />
</template>

<script>
import { gsap, Expo, Back } from "gsap";
import Header_compo from "@/components/Header.vue";
import Menu_level from "@/components/Menu-level.vue";
import Game_compo from "@/components/Game.vue";
import Scoreboard_compo from "@/components/Score-board.vue";
import Footer_compo from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Header_compo,
    Menu_level,
    Game_compo,
    Scoreboard_compo,
    Footer_compo,
  },
  data() {
    return {
      showMenu: false,
      isHidden: false,
      myGame: null,
      isBackActive: false,
      displayScoreboard: false,
      number: 0,
      tweenedNumber: 0,
      name: "Ilma",
      url: "https://ilmaisme.github.io",
      answers: [],
      find: "",
      gametitle: "Game Kompla",
    };
  },
  methods: {
    displayGame(val) {
      this.myGame = val;
      console.log("mygame:", this.myGame);
    },
    hideMenu() {
      gsap.to("#logo", 0.5, {
        scale: 1,
        ease: Expo.easeOut,
      });
      gsap.to("#menuWrap", 0.5, {
        scale: 0,
        alpha: 0,
        ease: Back.easeIn,
        onComplete: () => {
          this.isHidden = true;
          this.showMenu = true;
        },
      });
      gsap.to("#btnback", 0.5, {
        display: "block",
        ease: Expo.easeOut,
      });
      this.isBackActive = !this.isBackActive;
      console.log("hd menu");
    },
    showScoreboard() {
      gsap.to("#menuWrap", 0.5, {
        scale: 0,
        alpha: 0,
        ease: Back.easeIn,
        onComplete: () => {
          this.displayScoreboard = true;
          this.isHidden = true;
        },
      });
      gsap.to("#logo", 0.5, {
        scale: 0,
        ease: Expo.easeIn,
      });
      gsap.to("#btnback", 0.5, {
        display: "block",
        ease: Expo.easeOut,
      });
      this.isBackActive = !this.isBackActive;
    },
  },
  beforeCreate() {
    console.log("Before create");
  },
  created() {
    console.log("Created"); //call data after component created
    this.answers = [
      { id: 1, guest: "marjan", time: 1000 },
      { id: 2, guest: "parhan", time: 4000 },
      { id: 3, guest: "darkan", time: 5000 },
      { id: 4, guest: "marlam", time: 8000 },
      { id: 5, guest: "damkar", time: 16000 },
    ];
  },
  beforeMount() {
    console.log("Before mount");
  },
  mounted() {
    console.log("Mounted");
    gsap.to("#logo", 2, {
      scale: 0,
      rotation: 180,
      ease: Expo.easeOut,
    });
    gsap.to("#btnstart", 0, {
      scale: 0,
      ease: Expo.easeOut,
    });
    gsap.to("#btnscore", 0, {
      scale: 0,
      ease: Expo.easeOut,
    });
    gsap.to("#logo", 2, {
      scale: 1,
      rotation: 0,
      ease: Back.easeOut,
      delay: 0.5,
      onComplete: () => {
        gsap.to("#logo", 0.5, {
          scale: 0.7,
          y: 30,
          ease: Expo.easeIn,
        });
        gsap.to("#btnstart", 0.5, {
          scale: 1,
          ease: Back.easeOut,
          delay: 0.5,
        });
        gsap.to("#btnscore", 0.5, {
          scale: 1,
          ease: Back.easeOut,
          delay: 0.8,
        });
      },
    });
  },
  computed: {
    findData() {
      return this.answers.filter((item) => {
        return item.guest.match(this.find);
      });
    },
  },
};
</script>

<style lang="scss">
:root {
  --cl-main: #ff512f;
  --cl-secondary: #f09819;
  --cl-white: #fff;
  --cl-black: #333333;
  --font-parent: "Roboto Slab", serif;
  --font-child: "Mukta", sans-serif;
}
#app {
  font-family: var(--font-parent);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: var(--cl-black);
  background-image: url(@/assets/bg.png);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: contain;
  position: relative;
  max-width: 360px;
  height: 800px;
  margin: auto;
}
@font-face {
  font-family: "Roboto Slab";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local("Roboto Slab"),
    url(https://fonts.gstatic.com/s/robotoslab/v22/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjovoSmb2Rj.woff2)
      format("woff2");
}
@font-face {
  font-family: "Mukta";
  font-style: normal;
  font-weight: 400;
  src: local("Mukta"),
    url(https://fonts.gstatic.com/s/mukta/v12/iJWKBXyXfDDVXbnBrXw.woff2)
      format("woff2");
}
body {
  margin: 0;
}
.button {
  border: 0;
  border-radius: 3px;
  font-family: var(--font-parent);
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  background: transparent;
  &Menu {
    width: calc(100% - 60px);
    padding: 16px 20px;
    background: var(--cl-white);
    color: var(--cl-main);
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 10px;
    &--active {
      color: var(--cl-white);
      background: linear-gradient(
        93.98deg,
        var(--cl-main) -19.89%,
        var(--cl-secondary) 118.82%
      );
    }
  }
  &Txt {
    min-width: 98px;
    display: inline-block;
    text-align: left;
  }
  &Icon {
    margin-right: 10px;
    vertical-align: sub;
  }
  &Primary {
    font-family: var(--font-parent);
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: var(--cl-white);
    background: linear-gradient(
      93.98deg,
      var(--cl-main) -19.89%,
      var(--cl-secondary) 118.82%
    );
    border: 1px solid transparent;
    border-radius: 3px;
    padding: 12px 10px;
    width: 100%;
  }
  &Secondary {
    font-family: var(--font-parent);
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: var(--cl-main);
    background: var(--cl-white);
    border: 1px solid var(--cl-main);
    border-radius: 3px;
    padding: 12px 10px;
    width: 100%;
  }
  &Share {
    margin: 0 7px 15px;
    width: calc(100% / 2 - 14px);
  }
}
.player {
  &User {
    &__rank {
      font-family: var(--font-parent);
      font-size: 28px;
      line-height: 36px;
      color: var(--cl-main);
    }
  }
}
.center-flex {
  justify-content: center;
  align-items: center;
  display: flex;
}
.align-center {
  display: flex;
  align-items: center;
}
.text-center {
  text-align: center;
}
</style>
