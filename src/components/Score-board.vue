<template>
  <div class="scoreWrap">
    <div class="scoreHead center-flex">
      <h2 class="scoreTitle" id="text2">Skor</h2>
      <div class="scoreHead__wrap">
        <button class="button" id="show-modal" @click="showModal = true">
          <img
            src="@/assets/share.png"
            class="scoreHead__img"
            alt="Bagikan"
            width="42"
            height="40"
          />
        </button>
      </div>
    </div>
    <div class="scoreLvl center-flex">
      <!-- <button class="button buttonScore buttonMenu buttonMenu--active">
        4 Kata
      </button>
      <button class="button buttonScore buttonMenu">5 Kata</button>
      <button class="button buttonScore buttonMenu">6 Kata</button> -->

      <button
        v-for="tab in tabs"
        :key="tab.tabname"
        :class="[
          'button buttonScore buttonMenu',
          { '-active': currentTab === tab.tabname },
        ]"
        @click="currentTab = tab.tabname"
      >
        {{ tab.text }} Kata
      </button>
    </div>
    <div class="scoreContent">
      <keep-alive>
        <component :is="currentTab" class="tab" :users="users"></component>
      </keep-alive>
    </div>
  </div>

  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <Modal_compo :show="showModal" @close="showModal = false">
      <template #header>
        <div class="modalHead align-center">
          <h3 class="modalTitle">Bagikan ke</h3>
          <img
            src="@/assets/icon-share.png"
            class="modalShare__icon"
            alt=""
            width="25"
            height="28"
          />
        </div>
      </template>
      <template #body>
        <div class="modalShare__content">
          Ayo bagikan progres permainanmu. <br />
          Tantang teman untuk adu skor.
        </div>

        <div class="modalShare__list align-center">
          <button class="buttonSecondary buttonShare">
            <img
              src="@/assets/share-tw.png"
              class="modalShare__icon"
              alt=""
              width="19"
              height="16"
            />Twitter
          </button>
          <button class="buttonSecondary buttonShare">
            <img
              src="@/assets/share-ig.png"
              class="modalShare__icon"
              alt=""
              width="17"
              height="16"
            />Instagram
          </button>
          <button class="buttonSecondary buttonShare">
            <img
              src="@/assets/share-fb.png"
              class="modalShare__icon"
              alt=""
              width="17"
              height="16"
            />Facebook
          </button>
          <button class="buttonSecondary buttonShare">
            <img
              src="@/assets/share-save.png"
              class="modalShare__icon"
              alt=""
              width="16"
              height="16"
            />Simpan Gambar
          </button>
        </div>
      </template>

      <template #footer>
        <div class="modalShare__footer">
          <button class="button buttonSecondary" @click="showModal = false">
            Tutup
          </button>
        </div>
      </template>
    </Modal_compo>
  </Teleport>
</template>

<script>
import Modal_compo from "@/components/Modal-compo.vue";
import score4_compo from "@/components/score4-board.vue";
import score5_compo from "@/components/score5-board.vue";
import score6_compo from "@/components/score6-board.vue";

export default {
  components: {
    Modal_compo,
    score4_compo,
    score5_compo,
    score6_compo,
  },
  props: [
    "users"
  ],
  data() {
    return {
      showModal: false,
      currentTab: "score4_compo",
      tabs: [],
    };
  },
  created() {
    this.tabs = [
      { id: 1, tabname: "score4_compo", text: "4" },
      { id: 2, tabname: "score5_compo", text: "5" },
      { id: 3, tabname: "score6_compo", text: "6" },
    ];
  },
};
</script>

<style scoped lang="scss">
.score {
  &Content {
    position: relative;
    margin-left: 15px;
    margin-right: 15px;
    padding: 15px;
    background: var(--cl-white);
    box-shadow: 0px 0px 10px rgba(51, 51, 51, 0.05);
    border-radius: 5px;
    height: calc(100% - 90px - 50px - 15px);
    overflow: hidden;
    z-index: 1;
  }
  &Wrap {
    position: absolute;
    top: 0;
    width: 100%;
    height: calc(100% - 56px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  &Head {
    margin-top: 30px;
    justify-content: space-between;
    width: 100%;
    height: 60px;
    &__wrap {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  &Title {
    margin: 0 15px;
    font-family: var(--font-parent);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    color: var(--cl-white);
  }
  &Lvl {
    padding-left: 15px;
    padding-right: 15px;
  }
}
.button {
  &Score {
    margin-left: 4px;
    margin-right: 4px;
    padding: 8px 10px;
  }
}
</style>