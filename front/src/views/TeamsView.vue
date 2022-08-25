<template>
  <div class="parent">
    hello mentor! {{ mentor.username }}
    <br><br><br>
    my teams list:
    {{ globalUserName }}
    <div v-for="(team, i) in teams" :key="team._id">
      <h1>{{ i + 1 }}. team name : {{ team.teamName }}</h1>
      <router-link :to="`/members/${team._id}`">Show details</router-link>
    </div>
  </div>
</template>
<script lang="js">
/* eslint-disable */
import axios from "axios";
import Vue from "vue-class-component";
export default {
  name: 'TeamsView',
  extends: Vue,
  data() {
    return {
      userid: '',
      mentor: {},
      teams: [],
      condidates: []
    }
  },
  created() {
    this.userid = this.$route.params.userid
  },
  async mounted() {
    await axios.get('/api/mentors/' + this.userid)
      .then(response => {
        this.mentor = response.data
        this.mentor.teamIds.forEach(async (teamId, i) => {
          axios.get('/api/teams/' + teamId)
            .then(response => {
              this.teams.push(response.data)
            })
        })
      })
  },
  methods: {
  }
}
</script>

<style scoped>
h1 {
  cursor: pointer;
  color: blueviolet;
}
</style>
