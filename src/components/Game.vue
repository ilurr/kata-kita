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
    <div
      v-for="(value_parent, key_parent) in Object.keys(inputsWrap)"
      :key="key_parent"
      :id="value_parent"
      class="inputWrap"
    >
      <div v-for="key in Object.keys(inputs)" :key="key" class="inputItem">
        <InputKeyboard
          :inputs="inputs"
          :inputName="key"
          :key_parent="key_parent"
          @onInputFocus="onInputFocus"
          @onInputChange="onInputChange"
        />
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
    <SimpleKeyboard
      @onChange="onChange"
      @onKeyPress="onKeyPress"
      :input="inputs[inputName]"
      :inputName="inputName"
    />
  </div>

  <!-- s: modal result -->
  <Teleport to="body">
    <Modal_compo :show="showResult" @close="showResult = false">
      <template #header>
        <div class="modalHead center-flex">
          <h3 class="modalTitle">Jawabanmu Salah!</h3>
        </div>
      </template>
      <template #body>
        <div class="modalGame__body">
          <p>Ups, kamu salah menebak kata. Jawaban yang benar adalah:</p>
          <div class="modalGame__word">
            <span class="letter">i</span>
            <span class="letter">g</span>
            <span class="letter">a</span>
            <span class="letter">u</span>
            <span class="letter">a</span>
            <span class="letter">n</span>
          </div>
          <p class="modalGame__verb">nomina</p>
          <p>
            <span class="modalGame__misc">1</span> perkataan yg keluar sewaktu
            tidur;
          </p>
          <p>
            <span class="modalGame__misc">2</span> <b>ki</b> perkataan yg
            bukan-bukan; omong kosong; ocehan;
          </p>
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
          <button class="button buttonPrimary" @click="showResult = false">
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
import SimpleKeyboard from "@/components/SimpleKeyboard.vue";
import InputKeyboard from "./InputKeyboard";
import Modal_compo from "@/components/Modal-compo.vue";

export default {
  name: "Game_compo",
  components: {
    SimpleKeyboard,
    InputKeyboard,
    Modal_compo,
  },
  // props: ["mygame"],
  data: () => ({
    /**
     * We define the inputs here
     */
    key_parent: null,
    inputs: {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
    },
    inputName: "input1",
    inputsWrap: {
      inputwrap1: "",
      inputwrap2: "",
      inputwrap3: "",
      inputwrap4: "",
      inputwrap5: "",
      inputwrap6: "",
    },
    inputWrapName: "inputwrap1",
    showModal: false,
    showResult: true,
    userRank: "90",
  }),
  methods: {
    onChange(input) {
      this.inputs[this.inputName] = input;
    },
    onKeyPress(button) {
      console.log("button", button);
    },
    onInputChange(input) {
      console.log("Input changed directly:", input.target.id);
      this.inputs[input.target.id] = input.target.value;
    },
    onInputFocus(input) {
      console.log("Focused input:", input.target.id);
      this.inputName = input.target.id;
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
  &Wrap {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    transform: scale(0);
  }
  &Head {
    margin-top: 40px;
    margin-bottom: 50px;
    justify-content: space-between;
    width: 100%;
    &__wrap {
      padding-left: 10px;
      padding-right: 10px;
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
      background: #fafafa;
      margin-left: -20px;
      margin-right: -20px;
      margin-bottom: 50px;
      padding: 0 20px;
      max-height: 250px;
      overflow: scroll;
    }
    &__footer {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 14px 15px;
      width: calc(100% - 30px);
      justify-content: space-between;
      background: var(--cl-white);
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      box-shadow: 0px -5px 10px rgba(51, 51, 51, 0.05);
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
      margin-top: 15px;
      margin-left: -7px;
      margin-right: -7px;
    }
    &__box {
      background: var(--cl-white);
      border: 1px solid #e2e2e2;
      border-radius: 5px;
      margin: 0 7px 15px;
      padding: 14px 20px;
      width: calc(100% / 2 - 56px);
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
      font-size: 24px;
      line-height: 32px;
      color: var(--cl-white);
      .letter {
        background: #7bbc49;
        border-radius: 5px;
        padding: 14px 14px;
        min-width: 19px;
        text-align: center;
        display: inline-block;
        text-transform: uppercase;
        margin: 10px 3px;
      }
    }
  }
}
</style>