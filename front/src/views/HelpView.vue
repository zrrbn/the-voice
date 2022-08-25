<template>
    <div class="parent">
        <h4 v-if="loading">wait please...</h4>
        <h2>Admins:</h2>
        <table>
            <tr>
                <th>row</th>
                <th>id</th>
                <th>username</th>
                <th>password</th>
            </tr>
            <tr v-for="(admin, i) in admins" :key="admin._id">
                <td>{{ i + 1 }}</td>
                <td>{{ admin._id }}</td>
                <td>{{ admin.username }}</td>
                <td>{{ admin.password }}</td>
            </tr>
        </table>
        <br><br>
        <h2>Others:</h2>
        <table>
            <tr>
                <th>row</th>
                <th>id</th>
                <th>type</th>
                <th>username</th>
                <th>password</th>
                <th>teamIds</th>
            </tr>
            <template v-for="(mentor, j) in mentors" :key="mentor._id">
                <tr>
                    <td>{{ j + 1 }}</td>
                    <td>{{ mentor._id }}</td>
                    <td>mentor</td>
                    <td>{{ mentor.username }}</td>
                    <td>{{ mentor.password }}</td>
                    <td>{{ mentor.teamIds }}</td>
                </tr>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>row</th>
                                <th>id</th>
                                <th>team name</th>
                            </tr>
                            <template v-for="(team, k) in teams[j]" :key="team._id">
                                <tr>
                                    <td>{{ k + 1 }}</td>
                                    <td>{{ team._id }}</td>
                                    <td>{{ team.teamName }}</td>
                                </tr>
                                <div>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>row</th>
                                                <th>id</th>
                                                <th>type</th>
                                                <th>username</th>
                                                <th>password</th>
                                                <th>songIds</th>
                                            </tr>
                                            <template v-for="(con, h) in condidates[j][k]" :key="con._id">
                                                <tr>
                                                    <td>{{ h + 1 }}</td>
                                                    <td>{{ con._id }}</td>
                                                    <td>condidate</td>
                                                    <td>{{ con.username }}</td>
                                                    <td>{{ con.password }}</td>
                                                    <td>{{ team.songIds }}</td>
                                                </tr>
                                                <div>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <th>row</th>
                                                                <th>id</th>
                                                                <th>song name</th>
                                                                <th>performance date</th>
                                                                <th>score</th>
                                                            </tr>
                                                            <tr v-for="(song, o) in songs[j][k][h]" :key="song._id">
                                                                <td>{{ o + 1 }}</td>
                                                                <td>{{ song._id }}</td>
                                                                <td>{{ song.songName }}</td>
                                                                <td>{{ song.performDate }}</td>
                                                                <td>{{ song.score }}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </template>
                                        </tbody>
                                    </table>
                                </div>
                            </template>
                        </tbody>
                    </table>
                </div>
            </template>
        </table>
    </div>
</template>
<script lang="js">
/* eslint-disable */
import axios from "axios";
import Vue from "vue-class-component";
export default {
    name: 'HelpView',
    extends: Vue,
    data() {
        return {
            loading: true,
            admins: [],
            mentors: [],
            teams: [],
            condidates: [],
            songs: []
        }
    },
    async created() {
        await axios.get('/api/admins/')
            .then(response => {
                this.admins = response.data
            })
    },
    async mounted() {
        await axios.get('/api/mentors/')
            .then(response => {
                this.mentors = response.data
                this.mentors.forEach(async (mentor, i) => {
                    this.teams[i] = []
                    for (let j = 0; j < mentor?.teamIds?.length; j++) {
                        axios.get('/api/teams/' + mentor?.teamIds[j])
                            .then(response => {
                                this.teams[i][j] = response.data
                                this.condidates[i] = []
                                this.condidates[i][j] = []
                                for (let k = 0; k < this.teams[i][j]?.condidateIds?.length; k++) {
                                    axios.get('/api/condidates/' + this.teams[i][j]?.condidateIds[k])
                                        .then(response => {
                                            this.condidates[i][j][k] = response.data
                                            this.songs[i] = []
                                            this.songs[i][j] = []
                                            this.songs[i][j][k] = []
                                            for (let m = 0; m < this.condidates[i][j][k]?.songIds?.length; m++) {
                                                axios.get('/api/songs/' + this.condidates[i][j][k]?.songIds[m])
                                                    .then(response => {
                                                        this.songs[i][j][k][m] = response.data
                                                        this.loading = false
                                                    })
                                            }
                                        })
                                }
                            })
                    }
                })
            })
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}

table,
td,
th {
    border: 1px solid rgba(154, 89, 207, 0.87);
    text-align: left;
}

table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    padding: 6px;
}
</style>
