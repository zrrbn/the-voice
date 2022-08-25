<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <div class="parent">
    <strong>{{ user.username }}</strong> performances
    <br><br><br>

    <table>
      <tr>
        <th>name</th>
        <th>date</th>
        <th>score</th>
      </tr>

      <tr v-for="(song, i) in songs" :key="song._id">
        <td>
          <h3>{{ song.songName }}</h3>
        </td>
        <td>
          <h5>{{ song.performDate }}</h5>
        </td>
        <td id="score">
          <input type="number" name="score" id="scoreinput" v-model="editScore" v-if="isSelected(song)">
          <span v-else>{{ song.score }}</span>
          <button @click="isSelected(song) ? updateItem(song, i) : select(song)" :disabled="editScore>100 || editScore<0">
            {{ isSelected(song) ? 'save' : 'give score' }}
          </button>
        </td>
      </tr>
    </table>

  </div>
</template>
<script lang="js">
/* eslint-disable */
import axios from "axios";
import Vue from "vue-class-component";
import moment from 'moment'

export default {
  name: 'PerformancesView',
  extends: Vue,
  // inject:['globalUserName'],
  data() {
    return {
      id: '',
      user: [],
      songs: [],
      selected: {},
      editScore: ''
    }
  },
  created() {
    this.id = this.$route.params.id
  },
  async mounted() {
    await axios.get('/api/condidates/' + this.id)
      .then(response => {
        this.user = response.data
        this.user.songIds.forEach(async (songId, i) => {
          axios.get('/api/songs/' + songId)
            .then(response => {
              this.songs.push(response.data)
            })
        })
      })
  },
  methods: {
    select(item) {
      this.selected = item
      this.editScore = item.score
    },
    isSelected(item) {
      return this.selected._id == item._id
    },
    unSelect() {
      this.selected = {}
      this.editScore = ""
    },
    async updateItem(song, i) {
      console.log('hello dear')
      await axios.put('/api/songs/' + song._id, {
        score: this.editScore
      })
        .then(response => this.songs[i] = response.data)
      this.unSelect()
      console.table(this.songs[i])
    },
  }
}
</script>

<style scoped>
table,
td,
th {
  border: 1px solid rgba(252, 127, 127, 0.767);
  text-align: left;
}

table {
  border-collapse: collapse;
  width: 60%;
  margin-left: 20%;
  margin-right: 20%;
}

th,
td {
  padding: 6px;
}

#score {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
}

#score span {
  margin-right: auto;
  font-weight: bold;
  color: pink;
}

#scoreinput{
  border: 1px solid purple;
}
</style>