<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">default header</slot>
          </div>

          <div class="modal-body">
            <slot name="body">default body</slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    show: Boolean,
  },
};
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal {
  &-container {
    position: relative;
    padding: 20px;
    width: 320px;
    margin: 0px auto;
    background-color: var(--cl-white);
    border-radius: 10px;
    transition: all 0.3s ease;
  }
  &-body {
    font-family: var(--font-child);
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: var(--cl-black);
  }
  &Head {
    justify-content: space-between;
  }
  &Title {
    font-family: var(--font-parent);
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    margin: 0 0 10px;
  }
  &Share {
    &__icon {
      vertical-align: text-bottom;
      margin-right: 7px;
    }
    &__list {
      flex-wrap: wrap;
      margin-top: 15px;
      margin-left: -7px;
      margin-right: -7px;
    }
    &__footer {
      border-top: 1px solid #e2e2e2;
      padding-top: 15px;
    }
  }
  &Icon {
      vertical-align: middle;
      margin-right: 10px;
  }
}
</style>