<template>
    <div class="parent">
        {{ team.teamName }} members
        <br><br><br>

        <div v-for="(con, i) in condidates" :key="con._id">
            <h1>{{ i + 1 }}. condidate name : {{ con.username }}</h1>
            <router-link :to="`/performances/${con._id}`">Show details</router-link>
        </div>
    </div>
</template>
<script lang="js">
/* eslint-disable */
import axios from "axios";
import Vue from "vue-class-component";
export default {
    name: 'TeamItem',
    extends: Vue,
    // inject:['globalUserName'],
    data() {
        return {
            id: '',
            team: {},
            condidates: []
        }
    },
    created() {
        this.id = this.$route.params.id
    },
    async mounted() {
        await axios.get('/api/teams/' + this.id)
            .then(response => {
                this.team = response.data
                this.team.condidateIds.forEach(async (conId, i) => {
                    axios.get('/api/condidates/' + conId)
                        .then(response => {
                            this.condidates.push(response.data)
                        })
                })
            })
    },
}
</script>