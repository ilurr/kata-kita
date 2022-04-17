<template>
  <!-- <p>Prop from child 1: {{ mygame }}</p> -->
  <div class="gameWrap center-flex" id="gameWrap">
    <div class="gameHead center-flex">
      <div class="gameHead__wrap">
        <button class="button" @click="showModal = true">
          <img
            src="@/assets/help.png"
            class="gameHead__img"
            alt="How to Play"
            width="40"
            height="36"
          />
        </button>
        <button
          class="button"
          @click.prevent="audio.isPlaying ? pause(audio) : play(audio)"
        >
          <img
            src="@/assets/sound.png"
            class="gameHead__img"
            alt="Sound"
            width="40"
            height="36"
          />
        </button>
      </div>
      <button class="button buttonClue">
        <img
          src="@/assets/icon-clue.png"
          class="buttonIcon"
          alt=""
          width="14"
          height="14"
        />Contekan (3x)
      </button>
    </div>

    <div class="gameBoard">
      <div class="gameBoard__row" v-for="i in 6" :key="i">
        <div class="gameBoard__item" v-for="j in levelChar" :key="j">
          <KeyInput
            :inputName="`inputAnswer_${i}_${j}`"
            :inputValue="ansWord[`${i - 1}`].char[`${j - 1}`]"
          >
          </KeyInput>
        </div>
      </div>
      <div class="timerWrap">
        <img
          class="timerImg"
          src="@/assets/ph_timer.png"
          width="48"
          height="48"
          alt="Timer"
        />
        <span class="timer">{{ ansTimerDisplay }}</span>
        <!-- <span class="timer" v-else>00:00</span> -->
      </div>
    </div>

    <!-- <div v-for="key in Object.keys(inputs)" :key="key">
      <InputKeyboard
        :inputs="inputs"
        :inputName="key"
        @onInputFocus="onInputFocus"
        @onInputChange="onInputChange"
      />
    </div> -->

    <div class="gameKey">
      <div
        class="gameKey__row"
        v-for="(row, index) in keyBoardChar"
        :id="[`keyBar_${index + 1}`]"
        :key="row"
      >
        <div class="gameKey__item" v-if="index == 2">
          <KeyBtn @onKeyPress="onEnterPress" keyChar="enter" :isEnter="true">
          </KeyBtn>
        </div>
        <div
          class="gameKey__item"
          v-for="item in splitChar(row.char)"
          :key="item"
        >
          <KeyBtn @onKeyPress="onKeyPress" :keyChar="item"> </KeyBtn>
        </div>
        <div class="gameKey__item" v-if="index == 2">
          <KeyBtn @onKeyPress="onKeyPress" keyChar="delete" :isDelete="true">
          </KeyBtn>
        </div>
      </div>
    </div>
  </div>

  <!-- s: modal result -->
  <Teleport to="body">
    <Modal_compo :show="showResult" @close="showResult = false">
      <template #header>
        <div class="modalHead center-flex">
          <h3 class="modalTitle" v-if="userAns">Jawabanmu Benar!</h3>
          <h3 class="modalTitle" v-else>Jawabanmu Salah!</h3>
        </div>
      </template>
      <template #body>
        <div class="modalGame__body">
          <div class="modalGame__result" v-if="userAns">
            Yey, kamu menebak kata dengan benar. Jawabannya adalah:
          </div>
          <div class="modalGame__result" v-else>
            Ups, kamu salah menebak kata. Jawaban yang benar adalah:
          </div>
          <div class="modalGame__word">
            <span
              class="letter"
              v-for="j in this.contohSoal[this.levelChar].kata.split('')"
              :key="j"
              >{{ j }}</span
            >
          </div>
          <div class="modalGame__explained">
            <p class="modalGame__verb">nomina</p>
            <p>
              <span class="modalGame__misc">1</span> perkataan yg keluar sewaktu
              tidur;
            </p>
            <p>
              <span class="modalGame__misc">2</span> <b>ki</b> perkataan yg
              bukan-bukan; omong kosong; ocehan;
            </p>
          </div>
          <div class="modalGame__result center-flex">
            <div class="modalGame__box">
              <img
                src="@/assets/result-score.png"
                class="modalGame__img"
                alt=""
                width="68"
                height="55"
              />
              Skor sesi ini
              <div class="modalGame__num" v-if="totalScore">
                {{ totalScore }}
              </div>
              <div class="modalGame__num" v-else>-</div>
            </div>
            <div class="modalGame__box">
              <img
                src="@/assets/result-total.png"
                class="modalGame__img"
                alt=""
                width="62"
                height="52"
              />
              Skor total
              <div class="modalGame__num">129 <span>+34</span></div>
            </div>
          </div>
          <div class="modalGame__rank align-center">
            Peringkat kamu pada {{ levelChar }} huruf
            <div class="playerUser__rank">#{{ userRank }}</div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="modalGame__footer center-flex">
          <button class="button buttonPrimary" @click="$emit('backHome')">
            <!-- <button class="button buttonPrimary" @click="showResult = false, userAns = false"> -->
            <img
              src="@/assets/icon-home-white.png"
              class="modalGame__icon"
              alt=""
              width="18"
              height="18"
            />Kembali ke Beranda
          </button>
          <!-- </button> -->
          <button class="button buttonGame__share">
            <img
              src="@/assets/icon-share.png"
              alt="Bagikan"
              width="25"
              height="28"
            />
          </button>
        </div>
      </template>
    </Modal_compo>
  </Teleport>
  <!-- e: modal result -->

  <!-- s: modal help -->
  <Teleport to="body">
    <Modal_compo :show="showModal" @close="showModal = false">
      <template #header>
        <div class="modalHead center-flex">
          <h3 class="modalTitle">Cara Bermain</h3>
        </div>
      </template>
      <template #body>
        <div class="modalGame__body">
          <p>
            Tebak kata yang tersembunyi dengan menyatukan keenam huruf yang
            tersedia. Kata-kata ini sesuai dengan KBBI. Tekan ENTER untuk
            mengirimkan jawaban.
          </p>
          <p>
            Setelah jawaban dikirim, warna kotak akan berubah seberapa dekat
            tebakanmu dengan kata rahasia.
          </p>
          <p>
            Ketika jawaban salah, ulangi merangkai huruf hingga menjadi kata
            yang dimaksud hingga <b>enam kali</b> kesempatan.
          </p>
          <!-- Contoh: -->
        </div>
      </template>
      <template #footer>
        <div class="modalGame__footer">
          <button class="button buttonSecondary" @click="showModal = false">
            <img
              src="@/assets/icon-close.png"
              class="modalIcon"
              alt=""
              width="15"
              height="15"
            />Tutup Bantuan
          </button>
        </div>
      </template>
    </Modal_compo>
  </Teleport>
  <!-- e: modal help -->
</template>

<script>
import { gsap, Expo, Sine } from "gsap";
// import SimpleKeyboard from "@/components/SimpleKeyboard.vue";
// import InputKeyboard from "./InputKeyboard";
import KeyInput from "./InputBoard.vue";
import KeyBtn from "./ButtonKeyboard.vue";
import Modal_compo from "@/components/Modal-compo.vue";

export default {
  name: "Game_compo",
  components: {
    // SimpleKeyboard,
    // InputKeyboard,
    KeyInput,
    KeyBtn,
    Modal_compo,
  },
  props: ["levelChar"],
  emits: ["backHome"],
  data: () => ({
    /**
     * We define the inputs here
     */
    audio: {
      file: new Audio(require("@/assets/fx/beautifulrussia.mp3")),
      isPlaying: false,
    },
    fx: {
      tap: new Audio(require("@/assets/fx/tap.mp3")),
      juggle: new Audio(require("@/assets/fx/jadi.mp3")),
    },
    showModal: false,
    showResult: false,
    userAns: false,
    userRank: "90",
    // key static
    ansWord: [
      { char: [] },
      { char: [] },
      { char: [] },
      { char: [] },
      { char: [] },
      { char: [] },
    ],
    ansChance: 0,
    ansChanceMax: 5,
    ansScore: 0,
    totalScore: 0,
    ansTimer: 0,
    ansTimerDisplay: "00:00",
    ansTimerVar: Number,
    ansSecVar: 300,
    ansSecMax: 600,
    ansScoreTemp: [],
    keyPressFirst: 0,
    keyBoardChar: [
      { char: "qwertyuiop" },
      { char: "asdfghjkl" },
      { char: "zxcvbnm" },
    ],
    contohSoal: [
      { kata: "0" },
      { kata: "1" },
      { kata: "2" },
      { kata: "3" },
      { kata: "kota" },
      { kata: "semut" },
      { kata: "normal" },
    ],
  }),
  created() {
    window.addEventListener("keydown", this.doCommand);
  },
  unmounted() {
    window.removeEventListener("keydown", this.doCommand);
  },
  methods: {
    //play music
    playFx(audio) {
      audio.currentTime = 0
      audio.play();
    },
    play(audio) {
      audio.isPlaying = true;
      audio.file.play();
      audio.file.loop = true;
    },
    pause(audio) {
      audio.isPlaying = false;
      audio.file.pause();
    },
    // fungsi general, untuk pecah string jadi array per-karakter
    splitChar(char) {
      return char.split("");
    },

    // timer for display, format 00:00
    str_pad(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    },

    // stop timer
    stopTimer() {
      clearInterval(this.ansTimerVar);
    },

    // timer func, in second
    runTimer() {
      let _this = this;
      let localTimer = 0;

      this.ansTimerVar = setInterval(function () {
        localTimer++;
        let minutes = Math.floor(localTimer / 60);
        let seconds = localTimer - minutes * 60;
        _this.ansTimerDisplay =
          _this.str_pad(minutes, "0", 2) + ":" + _this.str_pad(seconds, "0", 2);
        _this.ansTimer = localTimer;
        // console.log(_this.ansTimer);
      }, 1000);
    },

    // fungsi ketika user pencet huruf pada layar
    onKeyPress(e, char) {
      let _this = this;

      // effect
      _this.animateZoom(e)
      _this.playFx(this.fx.tap)

      // timer running when user start typing
      if (this.keyPressFirst == 0) {
        _this.runTimer();
        this.keyPressFirst = 1;
      }

      // mari menjawab
      if (this.ansChance <= this.ansChanceMax) {
        if (char !== "delete" && char !== "enter") {
          if (this.ansWord[this.ansChance].char.length < this.levelChar) {
            this.ansWord[this.ansChance].char.push(char);
          }
        } else if (char == "delete") {
          this.ansWord[this.ansChance].char.pop();
        }
      }
    },

    // fungsi press keyboard di laptop, nanti aja ya
    doCommand(e) {
      if(!this.showResult) {
        let _this = this
        let cmd = String.fromCharCode(e.keyCode).toLowerCase();
        // console.log(cmd)
        // console.log(e.keyCode)
        if(e.keyCode == 8) {
          _this.onKeyPress(document.querySelector(".keyBtn[keychar=delete]"), 'delete')
          document.querySelector(".keyBtn[keychar=delete]").focus();
        } else if(e.keyCode == 13) {
          _this.onEnterPress(document.querySelector(".keyBtn[keychar=enter]"))
          document.querySelector(".keyBtn[keychar=enter]").focus();
        } else {
          for(let u=0;u<this.keyBoardChar.length;u++) {
            this.keyBoardChar[u].char.split('').map(function(char){
              if(cmd == char) {
                _this.onKeyPress(document.querySelector(".keyBtn[keychar="+cmd+"]"), cmd)
                document.querySelector(".keyBtn[keychar="+cmd+"]").focus();
              }
            });
          }
        }
      }
    },

    // button Enter func
    onEnterPress(e) {
      let _this = this;

      // effect
      _this.animateZoom(e)

      if (this.ansChance <= this.ansChanceMax) {

        _this.animateJuggle()

        if (this.ansWord[this.ansChance].char.length == this.levelChar) {
          _this.checkTile(this.ansWord[this.ansChance].char);
        } else {
          console.log("Ada yang kosong kotaknya");
        }
      } else {
        _this.finalScore();
      }
    },

    animateZoom(e) {
      gsap.to(e, 0.1, {
        scale: 1.25,
        ease: Expo.easeOut,
      });
      gsap.to(e, 0.1, {
        scale: 1,
        ease: Expo.easeOut,
        delay: 0.1
      });
    },

    animateJuggle() {
      let _this = this
      let andelay = 0;

      _this.playFx(this.fx.juggle)

      //Animate fx
      for (let i = 0; i < this.levelChar; i++) {
        gsap.to(document.getElementById(
          "inputAnswer_" + (this.ansChance + 1) + "_" + (i + 1)
        ), 0.2, {
            scale: 1.25,
            ease: Sine.easeOut,
            delay: andelay
        });
        gsap.to(document.getElementById(
          "inputAnswer_" + (this.ansChance + 1) + "_" + (i + 1)
        ), 0.2, {
            scale: 1,
            ease: Sine.easeOut,
            delay: andelay + 0.09
        });
        andelay += 0.05;
      }
    },

    // display popup result, reset variables
    onGameOver() {
      // reset score
      this.ansScore = 0;
      this.ansChance = 0;
      this.ansTimer = 0;
      this.showResult = true;
      this.ansWord.map(function (item) {
        item.char = [];
      });
      document
        .querySelectorAll(".inputTxt")
        .forEach((e) => e.removeAttribute("style"));
      document
        .querySelectorAll(".keyBtn")
        .forEach((e) => e.removeAttribute("style"));
      console.log("game over");
    },

    // final scoring
    finalScore() {
      let _this = this;
      let valid = false;
      console.log("Level User: " + this.levelChar);
      console.log("Total Kesempatan Jawab: " + this.ansChance);
      console.log("Total Huruf Tertabak: " + this.ansScore);
      console.log("Total Waktu: " + this.ansTimer);

      _this.stopTimer();

      // under 10 seconds, penalti 10 detik hahaha, masak sih bisa jawab under 10 detik, yg bener aja gan
      if (this.ansTimer < 10) {
        this.ansTimer = 10;
      }

      // max timer (10 minutes)
      if (this.ansTimer > this.ansSecMax) {
        this.ansTimer = this.ansSecMax;
      }

      // Rumus : (((1 - (Response Time / Variabel Detik) / 2) * 940) / Kesempatan Jawab ) + Huruf Tertebak
      this.totalScore =
        ((1 - this.ansTimer / this.ansSecVar / 2) * 940) / this.ansChance +
        this.ansScore;
      this.totalScore = Math.round(this.totalScore);
      if (this.totalScore) {
        valid = true;
      }

      if (valid) {
        return _this.onGameOver();
      }
    },

    // scoring per letter
    tempScore(temp) {
      if (this.ansScoreTemp.indexOf(temp) === -1) {
        this.ansScoreTemp.push(temp);
        this.ansScoreTemp.sort();
      }
    },

    // checking one by one tile answer
    checkTile(answer) {
      let _this = this;
      console.log("answer " + answer);
      let localScore = 0;

      let soal = this.contohSoal[this.levelChar].kata.split("");
      console.log("soal " + soal);

      answer.map(function (char, index) {
        if (char == soal[index]) {
          // green
          document.querySelector(".keyBtn[keychar="+char+"]").style.backgroundColor = "#4caf50";
          document.getElementById(
            "inputAnswer_" + (_this.ansChance + 1) + "_" + (index + 1)
          ).style.backgroundColor = "#4caf50";
          _this.tempScore(index + char);
          localScore++;
        } else {
          // grey
          document.querySelector(".keyBtn[keychar="+char+"]").style.backgroundColor = "#c7c3c3";
          document.getElementById(
            "inputAnswer_" + (_this.ansChance + 1) + "_" + (index + 1)
          ).style.backgroundColor = "#c7c3c3";
          for (let j = 0; j < _this.levelChar; j++) {
            if (soal[j] == char) {
              // yellow
              document.querySelector(".keyBtn[keychar="+char+"]").style.backgroundColor = "#ffeb3b";
              document.getElementById(
                "inputAnswer_" + (_this.ansChance + 1) + "_" + (index + 1)
              ).style.backgroundColor = "#ffeb3b";
            }
          }
        }
      });

      // overall chance
      this.ansChance++;
      console.log(this.ansChance);

      // scoring letter
      this.ansScore = this.ansScoreTemp.length;

      // all true in a row
      if (localScore == this.levelChar) {
        this.userAns = true;
        _this.finalScore();
      }

      // max chance 
      if (this.ansChance > this.ansChanceMax) {
        _this.finalScore();
      }

    },
  },
};
</script>

<style scoped lang="scss">
.input {
  &Wrap {
    display: flex;
    justify-content: center;
  }
}

.game {
  &Board {
    position: relative;
    padding: 15px 0 0;
    &__row {
      position: relative;
      display: flex;
      justify-content: center;
    }
  }
  &Wrap {
    position: absolute;
    top: 0;
    width: 100%;
    height: calc(100% - 56px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    // transform: scale(0);
  }
  &Head {
    // margin-top: 40px;
    // margin-bottom: 50px;
    justify-content: space-between;
    width: 100%;
    &__wrap {
      padding: 10px;
      display: flex;
      justify-content: flex-start;
    }
  }
  &Key {
    position: relative;
    gap: 5px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    &__row {
      position: relative;
      display: flex;
      justify-content: center;
      gap: 5px;
    }
    &__item {
      position: relative;
    }
  }
}

.button {
  &Clue {
    margin-left: 15px;
    margin-right: 15px;
    background: var(--cl-white);
    border-radius: 3px;
    padding: 8px 12px;
    font-family: var(--font-child);
    font-weight: 700;
    font-size: 12px;
    line-height: 20px;
    color: var(--cl-main);
    border: 1px solid var(--cl-main);
    visibility: hidden;
  }
  &Game {
    &__share {
      border-radius: 3px;
      border: 1px solid var(--cl-secondary);
      padding: 10px 20px;
      height: 49px;
      margin-left: 10px;
      img {
        max-width: 18px;
        height: auto;
      }
    }
  }
}

.timer {
  &Wrap {
    margin: 20px;
    font-size: 14px;
    color: var(--cl-white);
    text-align: center;
  }
  &Img {
    width: 20px;
    height: auto;
    margin-right: 5px;
    vertical-align: middle;
  }
}
.modal {
  &Game {
    &__body {
      position: relative;
      background: #fafafa;
      // margin-left: -20px;
      // margin-right: -20px;
      // margin-bottom: 50px;
      padding: 1px 15px;
      // max-height: 250px;
      // overflow: scroll;
      p {
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }
    &__footer {
      position: relative;
      // position: absolute;
      // bottom: 0;
      // left: 0;
      // padding: 14px 15px;
      // width: calc(100% - 30px);
      justify-content: space-between;
      background: var(--cl-white);
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      // box-shadow: 0px -5px 10px rgba(51, 51, 51, 0.05);
    }
    &__verb {
      color: var(--cl-main);
    }
    &__misc {
      color: var(--cl-main);
      position: relative;
      top: -4px;
      font-size: 10px;
    }
    &__icon {
      margin-right: 10px;
    }
    &__result {
      flex-wrap: wrap;
      margin: 15px 0 5px;
      gap: 5px;
      width: 100%;
      align-items: stretch;
      // margin-left: -7px;
      // margin-right: -7px;
    }
    &__box {
      background: var(--cl-white);
      border: 1px solid #e2e2e2;
      border-radius: 5px;
      margin: 0;
      padding: 14px 20px;
      width: calc(50% - (5px / 2));
      text-align: center;
    }
    &__rank {
      background: var(--cl-white);
      border: 1px solid #e2e2e2;
      padding: 11px 15px;
      border-radius: 5px;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    &__img {
      display: block;
      margin: 0 auto 10px;
    }
    &__num {
      font-family: var(--font-parent);
      font-size: 32px;
      line-height: 40px;
      span {
        position: relative;
        top: -8px;
        font-size: 18px;
        line-height: 24px;
        color: var(--cl-main);
      }
    }
    &__word {
      font-family: var(--font-parent);
      font-size: 21px;
      line-height: 32px;
      color: var(--cl-white);
      .letter {
        background: #7bbc49;
        border-radius: 5px;
        padding: 0;
        width: 40px;
        height: 42px;
        justify-content: center;
        align-items: center;
        display: inline-flex;
        text-transform: uppercase;
        margin: 5px 1px;
      }
    }
  }
}
</style>