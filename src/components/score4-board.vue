<template>
  <div class="scoreContent__wrap" v-if="apiRank.query.data.length">
    <div class="scoreContent__title">
      Total <span class="playerCount">{{ apiRank.query.total }}</span> pemain
    </div>
    <div class="playerUser -show align-center">
      <div class="align-center">
        <div class="playerAva" :data-initial="users.initial"></div>
        <div class="playerUser__content">
          Peringkat kamu pada <br />
          <span><b>4 huruf</b></span>
        </div>
      </div>
      <div class="playerUser__rank">#{{ apiRank.query.myrank.position }}</div>
    </div>
    <ul class="playerList">
      <li v-for="(player, index) in apiRank.query.data" :key="index" class="playerItem">
        <div class="align-center">
          <div class="playerRank">{{ index+1 }}</div>
          <div
            class="playerAva"
            :data-initial="player.initial"
            :style="{ backgroundColor: randomColor(index) }"
          >
            <span class="playerInitial">{{ player.name.split(' ')[1] ? player.name.split(' ')[0].substr(0,1).toUpperCase() + '' + player.name.split(' ')[1].substr(0,1).toUpperCase() : player.name.split(' ')[0].substr(0,1).toUpperCase() }}</span>
            <div class="playerTop" v-if="index === 0">
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
import axios from 'axios';

export default {
  props: [
    "users"
  ],
  data() {
    return {
      ranks: {},
      page: 1,
      apiRank: {
        url: 'api/kata_kita/score',
        query: {
          data: {}
        },
        status: ''
      },
      players: [],
      user: "Ilma Akrimatunnisa",
      userAva: "IA",
      userRank: "90",
      id: null,
      colorCache: {},
    }
  },
  mounted() {
    // let _this = this
    if(this.users.kmpsid.length>0) {
      this.getRank()
    }
  },
  methods: {
    async getRank() {
      try {
        const response = await axios.get(process.env.VUE_APP_API_URL + this.apiRank.url + '?level=4&kgid=' + this.users.kmpsid + '&page=' + this.page);
        console.log(response);
        if (!response.ok) {
          const error = (response && response.message) || response.statusText;
          this.apiRank.status = error
          // return Promise.reject(error);
        }

        this.apiRank.query = response.data
        this.apiRank.status = response.status
        console.log(this.apiRank.query);

      } catch (error) {
        console.log(error.response.status);
        this.apiRank.status = error.response.status
      }
    },
    randomColor(id) {
      const r = () => Math.floor(256 * Math.random());

      return (
        this.colorCache[id] ||
        (this.colorCache[id] = `rgba(${r()}, ${r()}, ${r()}, .5)`)
      );
    },
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
  &Initial {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
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
