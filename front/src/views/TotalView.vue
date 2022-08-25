<template>
  <div class="parent">
    hello admin! {{username}}
    <br><br><br>
    teams and condidators list:
    <div v-for="(team, i) in teams" :key="team._id">
      <h1>team name : {{ team.teamName }}</h1>
      <div v-for="(con, j) in condidates[i]" :key="con._id">
        <h2>&#8226; condidate {{ j + 1 }} : {{ con.username }}</h2>
        <router-link :to="`/performances/${con._id}`">Show details</router-link>
      </div>
    </div>
  </div>
</template>
<script lang="js">
/* eslint-disable */
import axios from "axios";
import Vue from "vue-class-component";
export default {
  name: 'TotalView',
  extends: Vue,
  data() {
    return {
      username: '',
      teams: [],
      condidates: []
    }
  },
  created() {
    this.username = this.$route.params.username
  },
  async mounted() {
    await axios.get('/api/teams/')
      .then(response => {
        this.teams = response.data
        this.teams.forEach(async (team, i) => {
          this.condidates[i] = []
          for (let j = 0; j < team?.condidateIds?.length; j++) {
            axios.get('/api/condidates/' + team.condidateIds[j])
              .then(response => {
                this.condidates[i][j] = response.data
              })
          }
        })
      })
  },
  methods: {
    openPage(con) {
    }
  }
}
</script>

<style scoped>
h2 {
  cursor: pointer;
  color: blueviolet;
}
</style>
