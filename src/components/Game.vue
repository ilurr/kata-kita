<template>
  <!-- <p>Prop from child 1: {{ mygame }}</p> -->
  <div class="gameWrap center-flex" id="gameWrap">
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
      <img class="timerImg" src="@/assets/ph_timer.png" />
      <span class="timer" id="timer">06:07</span>
    </div>
    <SimpleKeyboard
      @onChange="onChange"
      @onKeyPress="onKeyPress"
      :input="inputs[inputName]"
      :inputName="inputName"
    />
  </div>
</template>

<script>
import SimpleKeyboard from "@/components/SimpleKeyboard.vue";
import InputKeyboard from "./InputKeyboard";

export default {
  name: "Game_compo",
  components: {
    SimpleKeyboard,
    InputKeyboard,
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

.gameWrap {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
  transform: scale(0);
}

.timer {
  &Wrap {
    margin: 20px;
    font-size: 14px;
    color: var(--cl-white);
  }
  &Img {
    width: 20px;
    margin-right: 5px;
    vertical-align: middle;
  }
}
</style>