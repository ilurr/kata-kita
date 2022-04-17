<template>
  <Header_compo :gametitle="gametitle" />

  <!-- @click="(showMenu = !showMenu), (isHidden = true), hideMenu" -->
  <div v-if="!isHidden" id="menuWrap">
    <button
      class="button buttonMenu -active -loading"
      id="btnstart"
      @click="hideMenu"
    >
      <span class="buttonIcon">
        <img
          src="@/assets/icon-game.png"
          alt=""
          width="23"
          height="17"
        />
      </span>
      <span class="buttonTxt">Yuk Main</span>
    </button>
    <button class="button buttonMenu -loading" id="btnscore" @click="showScoreboard">
      <span class="buttonIcon">
        <img
          src="@/assets/icon-score.png"
          alt=""
          width="20"
          height="16"
        />
      </span>
      <span class="buttonTxt">Papan Skor</span>
    </button>
  </div>

  <Menu_level @showGame="displayGame" v-if="showMenu" />

  <!-- <Game_compo :myGame="myGame" v-if="myGame" /> -->
  <Game_compo :levelChar="levelChar" v-if="displayGameBoard" @backHome='backHome' />
  <Scoreboard_compo v-if="displayScoreboard" :userData="userData" />
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

  <Footer_compo :isBackActive="isBackActive" @backHome='backHome' />
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
      userData: {},
      isLogged: false,
      showMenu: false,
      isHidden: false,
      myGame: null,
      isBackActive: false,
      displayScoreboard: false,
      displayGameBoard: false,
      number: 0,
      tweenedNumber: 0,
      name: "Ilma",
      url: "https://ilmaisme.github.io",
      answers: [],
      find: "",
      gametitle: "Game Kompla",
      levelChar: Number
    };
  },
  methods: {
    backHome() {
      window.location.href = window.location.origin
      console.log(window.location.origin)
    },
    getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    getUserLogin() {
      // GET request using fetch with error handling
      fetch("https://subs.kompas.com/api/v1/subscription?user_id=" + this.getCookie('kmps_usrid') + "&token=" + this.getCookie('kmp_uid') + "&loginwith=" + this.getCookie("lgn_w"))
      .then(async response => {
        const data = await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        } else {
          console.log(data);
          if(!data.email) {
            this.isLogged = false
          } else {
            this.userData = data
            this.userData.initial = data.first_name.substr(0,1).toUpperCase() + (data.last_name.length>0?data.last_name.substr(0,1).toUpperCase():'')
            this.isLogged = true
          }
          document.getElementById('btnstart').classList.remove('-loading')
          document.getElementById('btnscore').classList.remove('-loading')
        }
      })
      .catch(error => {
        this.errorMessage = error;
        console.error("There was an error login!", error);
      });
    },
    displayGame(val) {
      this.levelChar = val;
      gsap.to("#logo", 0.5, {
        scale: 0,
        ease: Expo.easeIn,
      });
      gsap.to("#lvlWrap", 0.5, {
        x: 1000,
        ease: Expo.easeIn,
        onComplete: () => {
          this.displayGameBoard = true;
          this.showMenu = false;
          // gsap.to("#gameWrap", 1, {
          //   scale: 1,
          //   ease: Expo.easeOut,
          // });
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
    hideMenu() {
      if(!this.isLogged) {
        window.open('https://account.kompas.com/login/a29tcGFz/'+btoa(window.location.href+'?login=true'), '_parent');
      } else {
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
        // console.log(this.userData);
      }
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
      console.log(this.userData);
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
    this.getUserLogin();
    console.log("Mounted");
    gsap.to("#logo", 0.2, {
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
    gsap.to("#logo", 0.2, {
      scale: 1,
      rotation: 0,
      ease: Back.easeOut,
      delay: 0.2,
      onComplete: () => {
        gsap.to("#logo", 0.5, {
          scale: 0.7,
          y: 30,
          ease: Expo.easeIn,
        });
        gsap.to("#btnstart", 0.5, {
          scale: 1,
          ease: Back.easeOut,
          delay: 0.2,
        });
        gsap.to("#btnscore", 0.5, {
          scale: 1,
          ease: Back.easeOut,
          delay: 0.4,
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
*,*:after,*:before {
  box-sizing: border-box;
}
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
  background-repeat: repeat-x;
  background-position: top center;
  background-size: auto calc(100% - 56px);
  position: relative;
  width: 100%;
  max-width: 500px;
  // height: 100vh;
  // max-height: 100vh;
  // max-height: -webkit-fill-available;
  // height: 800px;
  margin: auto;
  height: 100%;
  height: -webkit-fill-available;
  overflow: auto;
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
html,
body {
  margin: 0;
  touch-action:manipulation;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  // min-height: -webkit-fill-available;
  // max-height: -webkit-fill-available;
  height: 100vh;
  height: -webkit-fill-available;
  overflow: hidden;
}
.button {
  border: 0;
  border-radius: 3px;
  font-family: var(--font-parent);
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  &Menu {
    width: calc(100% - 60px);
    padding: 16px 20px;
    background: var(--cl-white);
    color: var(--cl-main);
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 10px;
    &.-active {
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
    text-decoration: none;
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
    margin: 0;
    width: calc(50% - (5px / 2));
  }
  &.-loading {
    background: #EBEBE4;
    pointer-events: none;
    .buttonTxt {
      display: none;
    }
    .buttonIcon {
      margin-right: 0;
      vertical-align: center;
      width: 23px;
      height: 23px;
      background-position: center center;
      background-size: contain;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' style='margin:auto;background:0 0;display:block;shape-rendering:auto' width='23' height='23' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'%3E%3Ccircle cx='50' cy='50' r='0' fill='none' stroke='%23ff512f' stroke-width='12'%3E%3Canimate attributeName='r' repeatCount='indefinite' dur='1.1764705882352942s' values='0;40' keyTimes='0;1' keySplines='0 0.2 0.8 1' calcMode='spline' begin='0s'/%3E%3Canimate attributeName='opacity' repeatCount='indefinite' dur='1.1764705882352942s' values='1;0' keyTimes='0;1' keySplines='0.2 0 0.8 1' calcMode='spline' begin='0s'/%3E%3C/circle%3E%3Ccircle cx='50' cy='50' r='0' fill='none' stroke='%23f09819' stroke-width='12'%3E%3Canimate attributeName='r' repeatCount='indefinite' dur='1.1764705882352942s' values='0;40' keyTimes='0;1' keySplines='0 0.2 0.8 1' calcMode='spline' begin='-0.5882352941176471s'/%3E%3Canimate attributeName='opacity' repeatCount='indefinite' dur='1.1764705882352942s' values='1;0' keyTimes='0;1' keySplines='0.2 0 0.8 1' calcMode='spline' begin='-0.5882352941176471s'/%3E%3C/circle%3E%3C/svg%3E");
      & > img {
        display: none;
      }
    }
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
