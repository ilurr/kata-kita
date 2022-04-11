<template>
  <input
    class="inputTxt"
    readonly="readonly"
    :id="inputName"
    :value="inputValue"
  />
  <!-- </button> -->
</template>

<script>
export default {
  name: "InputBoard",
	props: {
    inputName: String,
    inputValue: String
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.input {
  &Txt {
    width: 40px;
    height: 40px;
    background-color: var(--cl-white);
    margin: 5px;
    text-align: center;
    text-transform: uppercase;
    border: 0;
    border-radius: 4px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    // font-weight: 700;
  }
}
</style>