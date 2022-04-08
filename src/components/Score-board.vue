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
      <button class="button buttonScore buttonMenu buttonMenu--active">
        4 Kata
      </button>
      <button class="button buttonScore buttonMenu">5 Kata</button>
      <button class="button buttonScore buttonMenu">6 Kata</button>
    </div>
    <div class="scoreContent">
      <div v-if="players.length">
        <div class="scoreContent__title">
          Total <span class="playerCount">89.028</span> pemain
        </div>
        <ul class="playerList">
          <li v-for="player in players" :key="player.id" class="playerItem">
            <div class="align-center">
              <div class="playerRank">{{ player.rank }}</div>
              <div
                class="playerAva"
                :style="{ backgroundColor: randomColor(player.id) }"
              >
                {{ player.ava }}
                <div v-if="player.id === 1">
                  <img
                    src="@/assets/icon-top.png"
                    class="playerTop"
                    alt="Top player"
                    width="40"
                    height="40"
                  />
                </div>
              </div>
              <div class="playerInfo">
                <div class="playerName">{{ player.name }}</div>
                <div class="playerScore">Skor: {{ player.score }}</div>
              </div>
            </div>
          </li>
        </ul>
        <div class="playerUser align-center">
          <div class="align-center">
            <div class="playerAva"></div>
            <div class="playerUser__content">
              Peringkat kamu pada <br />
              <span><b>4 huruf</b></span>
            </div>
          </div>
          <div class="playerUser__rank">#{{ userRank }}</div>
        </div>
      </div>
      <div v-else>
        <p>No data found</p>
      </div>
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
        Ayo bagikan progres permainanmu. <br />
        Tantang teman untuk adu skor.

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

export default {
  components: {
    Modal_compo,
  },
  data() {
    return {
      players: [],
      user: "Ilma Akrimatunnisa",
      userRank: "90",
      id: null,
      colorCache: {},
      showModal: false,
    };
  },
  methods: {
    randomColor(id) {
      const r = () => Math.floor(256 * Math.random());

      return (
        this.colorCache[id] ||
        (this.colorCache[id] = `rgb(${r()}, ${r()}, ${r()})`)
      );
    },
  },
  created() {
    this.players = [
      { rank: 1, id: 1, name: "Anggara Kusumaatmadja", score: 1290 },
      { rank: 2, id: 2, name: "Andika Bayu", score: 1290 },
      { rank: 3, id: 3, name: "Nurdita Afifah", score: 1290 },
      { rank: 4, id: 4, name: "Nurhaman", score: 1290 },
      { rank: 5, id: 5, name: "Hendrawan Witjacksono", score: 1290 },
      { rank: 6, id: 6, name: "Nabila Maulida", score: 1290 },
      { rank: 7, id: 7, name: "Mohammad Khoirul Huda", score: 1290 },
      { rank: 8, id: 8, name: "Markus Wattimena", score: 1290 },
    ];
  },
};
</script>

<style scoped lang="scss">
.score {
  &Wrap {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  &Head {
    margin-top: 40px;
    justify-content: space-between;
    width: 100%;
    &__wrap {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  &Title {
    margin-left: 15px;
    margin-right: 15px;
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
  &Content {
    position: relative;
    margin-left: 15px;
    margin-right: 15px;
    padding: 15px;
    background: var(--cl-white);
    box-shadow: 0px 0px 10px rgba(51, 51, 51, 0.05);
    border-radius: 5px;
    height: 488px;
    overflow: hidden;
    z-index: 1;
    &__title {
      font-family: var(--font-parent);
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
    }
  }
}
.player {
  &Count {
    color: var(--cl-main);
    text-decoration: underline;
  }
  &List {
    list-style: none;
    padding: 0;
    max-height: 380px;
    overflow: scroll;
  }
  &Item {
    margin-top: 14px;
    margin-bottom: 14px;
  }
  &Rank {
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    margin-right: 5px;
    min-width: 18px;
    text-align: center;
  }
  &Info {
    font-family: var(--font-child);
    font-weight: 400;
    margin-left: 10px;
    flex: 1;
  }
  &Score {
    font-size: 14px;
    line-height: 20px;
    color: #757575;
  }
  &Name {
    font-size: 16px;
    line-height: 24px;
  }
  &Ava {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--cl-secondary);
    position: relative;
  }
  &Top {
    position: absolute;
    bottom: -10px;
    right: -10px;
  }
  &User {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 14px 15px;
    background: var(--cl-white);
    font-family: var(--font-child);
    font-size: 16px;
    line-height: 24px;
    width: calc(100% - 30px);
    justify-content: space-between;
    box-shadow: 0px -5px 10px rgba(51, 51, 51, 0.05);
    &__content {
      margin-left: 15px;
    }
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