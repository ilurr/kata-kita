<template>
  <!-- <p>Prop from child 1: {{ mygame }}</p> -->
  <div class="gameWrap center-flex" id="gameWrap">
    <div class="gameHead center-flex">
      <div class="gameHead__wrap">
        <button class="button">
          <img
            src="@/assets/help.png"
            class="gameHead__img"
            alt="How to Play"
            width="40"
            height="36"
            @click="showModal = true"
          />
        </button>
        <button class="button">
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
            :inputValue="ansWord[`${i-1}`].char[`${j-1}`]"
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
        <span class="timer" id="timer">06:07</span>
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
        :id="[`keyBar_${index+1}`]"
        :key="row"
      >
        <div class="gameKey__item" v-if="index == 2">
          <KeyBtn
            @onKeyPress="onEnterPress"
            keyChar="enter"
            :isEnter=true
          >
          </KeyBtn>
        </div>
        <div 
          class="gameKey__item"
          v-for="item in splitChar(row.char)"
          :key="item"
        >
          <KeyBtn
            @onKeyPress="onKeyPress"
            :keyChar="item"
          >
          </KeyBtn>
        </div>
        <div class="gameKey__item" v-if="index == 2">
          <KeyBtn
            @onKeyPress="onKeyPress"
            keyChar="delete"
            :isDelete=true
          >
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
          <div class="modalGame__result" v-if="userAns">Yey, kamu menebak kata dengan benar. Jawabannya adalah:</div>
          <div class="modalGame__result" v-else>Ups, kamu salah menebak kata. Jawaban yang benar adalah:</div>
          <div class="modalGame__word">
            <span class="letter" v-for="j in this.contohSoal[this.levelChar].kata.split('')" :key="j">{{j}}</span>
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
              <div class="modalGame__num">34</div>
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
            Peringkat kamu pada 4 huruf
            <div class="playerUser__rank">#{{ userRank }}</div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="modalGame__footer center-flex">
          <button class="button buttonPrimary" @click="showResult = false, userAns = false">
            <img
              src="@/assets/icon-home-white.png"
              class="modalGame__icon"
              alt=""
              width="18"
              height="18"
            />Kembali ke Beranda
          </button>
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
// import SimpleKeyboard from "@/components/SimpleKeyboard.vue";
// import InputKeyboard from "./InputKeyboard";
import KeyInput from "./InputBoard.vue"
import KeyBtn from "./ButtonKeyboard.vue"
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
  props: [
    "levelChar"
  ],
  data: () => ({
    /**
     * We define the inputs here
     */
    // key_parent: null,
    // inputs: {
    //   input1: "",
    //   input2: "",
    //   input3: "",
    //   input4: "",
    // },
    // inputName: "input1",
    // inputsWrap: {
    //   inputwrap1: "",
    //   inputwrap2: "",
    //   inputwrap3: "",
    //   inputwrap4: "",
    //   inputwrap5: "",
    //   inputwrap6: "",
    // },
    // inputWrapName: "inputwrap1",
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
      { char: [] }
    ],
    ansLvl: 0,
    ansScore: 0,
    keyBoardChar: [ 
      { char: "qwertyuiop" },
      { char: "asdfghjkl" },
      { char: "zxcvbnm" },
    ],
    contohSoal: [
      { kata: "0"},
      { kata: "1"},
      { kata: "2"},
      { kata: "3"},
      { kata: "kota" },
      { kata: "semut" },
      { kata: "normal" },
    ]
  }),
  created() {
    window.addEventListener('keypress', this.doCommand);
  },
  unmounted() {
    window.removeEventListener('keypress', this.doCommand);
  },
  methods: {
    splitChar(char) {
      return char.split('');
    },
    onKeyPress(char) {
      if(this.ansLvl < 6) {
        if(char !== 'delete' && char !== 'enter') {
          if(this.ansWord[this.ansLvl].char.length < this.levelChar) {
            this.ansWord[this.ansLvl].char.push(char)
            console.log(this.ansWord[this.ansLvl].char)
          }
        } else if(char == 'delete') {
          this.ansWord[this.ansLvl].char.pop()        
          console.log(this.ansWord[this.ansLvl].char)
        }
      }
    },
    // doCommand(e) {
    //   let cmd = String.fromCharCode(e.keyCode).toLowerCase();
    //   console.log(cmd)
    // }
    onEnterPress() {
      let _this = this;
      if(this.ansLvl < 6) {
        if(this.ansWord[this.ansLvl].char.length == this.levelChar) {
          console.log((this.ansLvl+1) +'pas')
          _this.checkTile(this.ansWord[this.ansLvl].char)
        } else {
          console.log('kurang')
        }
      } else {
        _this.onGameOver()
      }
    },
    onGameOver() {
      this.ansLvl = 0
      this.showResult = true
      console.log('game over')
      for (let i=0; i<6; i++) {
        this.ansWord[i].char = []
      }
      document.querySelectorAll('.inputTxt').forEach(e => e.removeAttribute('style'));
    },
    checkTile(answer) {
      let _this = this;
      console.log('cek '+ answer)
      let score = 0;

      let soal = this.contohSoal[this.levelChar].kata.split('');
      console.log('soal '+ soal)

      for (let i=0; i<this.levelChar; i++) {
        if(soal[i] == answer[i]) {
          // console.log(document.getElementById('inputAnswer_'+(this.ansLvl+1)+'_'+(i+1)))
          document.getElementById('inputAnswer_'+(this.ansLvl+1)+'_'+(i+1)).style.backgroundColor = '#4caf50';
          score++
          console.log(score+''+this.levelChar)
        } else {
          // console.log('g')
          document.getElementById('inputAnswer_'+(this.ansLvl+1)+'_'+(i+1)).style.backgroundColor = '#c7c3c3';
          for (let j=0; j<this.levelChar;j++) {
            if(soal[j] == answer[i]) {
              document.getElementById('inputAnswer_'+(this.ansLvl+1)+'_'+(i+1)).style.backgroundColor = '#ffeb3b';
            }
          }
        }
      }

      this.ansLvl++

      if(score==this.levelChar) {
        this.userAns = true
        _this.onGameOver()
      }
    },
    // onChange(input) {
    //   this.inputs[this.inputName] = input;
    // },
    // onKeyPress(button) {
    //   console.log("button", button);
    // },
    // onInputChange(input) {
    //   console.log("Input changed directly:", input.target.id);
    //   this.inputs[input.target.id] = input.target.value;
    // },
    // onInputFocus(input) {
    //   console.log("Focused input:", input.target.id);
    //   this.inputName = input.target.id;
    // },
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