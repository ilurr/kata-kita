<template>
  <input
    class="inputTxt"
    readonly="readonly"
    :id="inputName"
    :value="inputValue"
  />
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
    height: 46px;
    color: #454545;
    background-color: var(--cl-white);
    margin: 2px;
    text-align: center;
    text-transform: uppercase;
    border: 0;
    border-radius: 4px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-parent);
    font-size: 18px;
    font-weight: 500;
    @media screen and (max-height: 670px) {
      height: 45px;
    }
    @media screen and (max-height: 500px) {
      height: 35px;
      width: 35px;
    }
  }
}
</style>