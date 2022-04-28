<template>
  <div class="scoreContent__wrap" v-if="players.length">
    <div class="scoreContent__title">
      Total <span class="playerCount">89.028</span> pemain
    </div>
    <div class="playerUser -show align-center">
      <div class="align-center">
        <div class="playerAva" :data-initial="users.initial"></div>
        <div class="playerUser__content">
          Peringkat kamu pada <br />
          <span><b>4 huruf</b></span>
        </div>
      </div>
      <div class="playerUser__rank">#{{ userRank }}</div>
    </div>
    <ul class="playerList">
      <li v-for="player in players" :key="player.id" class="playerItem">
        <div class="align-center">
          <div class="playerRank">{{ player.rank }}</div>
          <div
            class="playerAva"
            :data-initial="player.initial"
            :style="{ backgroundColor: randomColor(player.id) }"
          >
            {{ player.ava }}
            <div class="playerTop" v-if="player.id === 1">
              <span class="playerTopIcon icon-crown"></span>
            </div>
          </div>
          <div class="playerInfo">
            <div class="playerName">{{ player.name }}</div>
            <div class="playerScore">Skor: {{ player.score }}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Data masih kosong</p>
  </div>    
</template>

<script>
export default {
  props: [
    "users"
  ],
  data() {
    return {
      players: [],
      user: "Ilma Akrimatunnisa",
      userAva: "IA",
      userRank: "90",
      id: null,
      colorCache: {},
    }
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
      {
        rank: 1,
        id: 1,
        name: "Anggara Kusumaatmadja",
        initial: "AK",
        score: 1290,
      },
      { rank: 2, id: 2, name: "Andika Bayu", initial: "AB", score: 1290 },
      { rank: 3, id: 3, name: "Nurdita Afifah", initial: "NA", score: 1290 },
      { rank: 4, id: 4, name: "Nurhaman", initial: "N", score: 1290 },
      {
        rank: 5,
        id: 5,
        name: "Hendrawan Witjacksono",
        initial: "HW",
        score: 1290,
      },
      { rank: 6, id: 6, name: "Nabila Maulida", initial: "NM", score: 1290 },
      {
        rank: 7,
        id: 7,
        name: "Mohammad Khoirul Huda",
        initial: "MKH",
        score: 1290,
      },
      { rank: 8, id: 8, name: "Markus Wattimena", initial: "MW", score: 1290 },
    ];
  }
}
</script>

<style scoped lang="scss">
.score {
  &Content {
    &__wrap {
      position: relative;
      height: 100%;
    }
    &__title {
      font-family: var(--font-parent);
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      margin-bottom: 10px;
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
    margin: 0;
    max-height: calc(100% - 30px);
    overflow-y: auto;
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
    font-family: var(--font-parent);
    &:after {
      content: attr(data-initial);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
  }
  &Top {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ED543A;
    display: flex;
    align-items: center;
    justify-content: center;
    &Icon {
      display: block;
      width: 11px;
      height: 11px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
  &User {
    position: absolute;
    bottom: -15px;
    left: -15px;
    padding: 14px 15px;
    background: var(--cl-white);
    font-family: var(--font-child);
    font-size: 16px;
    line-height: 24px;
    width: calc(100% + 30px);
    justify-content: space-between;
    box-shadow: 0px -5px 10px rgba(51, 51, 51, 0.05);
    visibility: hidden;
    &.-show {
      visibility: visible;
      & ~ .playerList {
        max-height: calc(100% - 84px - 19px);
      }
    }
    &__content {
      margin-left: 15px;
    }
  }
}

</style>
