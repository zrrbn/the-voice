<template>
    <div class="parent">
        <div>
            <h1>LOGIN FORM</h1>
            <h6 v-if="showErr">incorrect username or password! :(</h6>
            <div>
                <label for="username">Username:</label>
                <input type="text" name="editusernameUsername" id="username" v-model="username"
                    @click="showErr = false">
            </div>
            <div class="pt-5">
                <label for="password">Password:</label>
                <input type="password" name="password" id="password" v-model="password" @click="showErr = false">
            </div>
            <div class="button-container">
                <div class="loader" v-if="loading"></div>
                <button @click="loginAdmin(username, password)" :disabled="!username || !password">LOGIN</button>
            </div>
        </div>
    </div>
</template>
<script lang="js">
import { Vue } from 'vue-class-component';
import axios from "axios";

export default {
    name: 'LoginView',
    extends: Vue,
    data() {
        return {
            username: "",
            password: "",
            showErr: false,
            loading: false
        }
    },
    methods: {
        async loginAdmin(username, password) {
            this.loading = true
            await axios.post('/api/admins/login/', {
                username: username,
                password: password
            })
                .then((res) => {
                    this.loading = false
                    this.username = res.data.username
                    this.$router.push({ name: 'total', params: { username: this.username } }
                    )
                },
                    () => {
                        this.loginMentor(username, password)
                    })
        },
        async loginMentor(username, password) {
            await axios.post('/api/mentors/login/', {
                username: username,
                password: password
            })
                .then((res) => {
                    this.loading = false
                    let userid = res.data._id
                    this.$router.push({ name: 'teams', params: { userid: userid } }
                    )
                },
                    () => {
                        this.loginCondidate(username, password)
                    })
        },
        async loginCondidate(username, password) {
            await axios.post('/api/condidates/login/', {
                username: username,
                password: password
            })
                .then((res) => {
                    this.loading = false
                    this.username = res.data
                    this.$router.push({ name: 'performances', params: { userid: this.username._id } }
                    )
                },
                    () => {
                        this.showErr = true
                        this.loading = false
                    })
        }
    }
}
</script>

<style scoped>
.parent {
    display: flex;
    flex-flow: column;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
}

* {
    text-align: center;
}

.pt-5 {
    padding-top: 3rem;
}

.button-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

button {
    background: thistle;
    color: white;
    font-weight: 900;
    padding: .5rem 1.8rem;
    border: none;
    box-shadow: none;
    outline: none;
    border-radius: 8px;
    margin: 3rem .5rem;
    transition: background .2s ease-in-out;
}

button:disabled {
    background: rgb(136, 136, 136);
}

button:hover {
    background: rgb(138, 110, 138);
}

h6 {
    color: tomato;
    font-size: 14px;
}

.loader {
    border: 3px solid #f3f3f3;
    border-top: 3px solid #ee6487;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
