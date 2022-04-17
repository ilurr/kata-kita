<template>
  <button
    class="keyBtn"
    :class="{ '-enter': isEnter, '-delete': isDelete }"
    :keyChar="keyChar"
    @click="$emit('onKeyPress', $event.target, keyChar)"
  >
    <span v-if="keyChar == 'delete'">
      <img
        src="@/assets/backspace.svg"
        alt=""
      />
    </span>
    <span v-else>
      {{keyChar}}
    </span>
  </button>
</template>

<script>
export default {
  name: "KeyBtn",
  props: {
    keyChar: String,
    isEnter: Boolean,
    isDelete: Boolean
  },
  methods: {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.key {
  &Btn {
    min-width: 28px;
    height: 40px;
    background-color: var(--cl-white);
    // color: var(--cl-main);
    font-size: 14px;
    font-weight: 500;
    margin: 0;
    text-align: center;
    text-transform: uppercase;
    border: 0;
    border-radius: 4px;
    padding: 0 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    & > span {
      display: block;
      pointer-events: none;
      img {
        vertical-align: top;
      }
    }
    &.-enter {
      background-color: var(--cl-main);
      color: var(--cl-white);
    }
    &.-delete {
      padding: 0 12px;
    }
  }
}
</style>