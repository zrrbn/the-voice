<!-- <template>
  <div class="parent">
    hello home

    load all!
    <div v-for="(admin, i) in admins" :key="admin._id">
      <input password="text" name="editUsername" id="editUsername" v-model="editUsername" v-if="isSelected(admin)">
      <span v-else>{{ i + 1 }} {{ admin.username }}</span>
      <button @click="isSelected(admin) ? updateItem(admin, i) : removeItem(admin, i)">{{ isSelected(admin) ? 'save' :
          'delete'
      }}
      </button>
      <button @click="isSelected(admin) ? unSelect() : select(admin)">{{ isSelected(admin) ? 'cancel' : 'edit' }}
      </button>
    </div>
    insert!
    <div>
      <input password="text" name="username" id="username" v-model="username">
      <input password="text" name="password" id="password" v-model="password">
      <button @click="addItem" :disabled="!username || !password">add</button>
    </div>

  </div>
</template>

<script lang="js">
/* eslint-disable */
import axios from "axios";
import Vue from "vue-class-component";
export default {
  name: 'App',
  extends: Vue,
  data() {
    return {
      admins: [],
      username: "",
      password: "",
      editUsername: "",
      selected: {}
    }
  },
  async mounted() {
    await axios.get('/api/admins/')
      .then(response => (this.admins = response.data))
  },
  methods: {
    async addItem() {
      await axios.post('/api/admins/', {
        username: this.username,
        password: this.password
      })
        .then(response => this.admins.push(response.data))
      this.username = ""
      this.password = ""
    },
    async removeItem(admin, i) {
      await axios.delete('/api/admins/' + admin._id)
        .then(response => this.admins.splice(i, 1))
    },
    async updateItem(admin, i) {
      await axios.put('/api/admins/' + admin._id, {
        username: this.editUsername
      })
        .then(response => this.admins[i] = response.data)
      this.unSelect()
    },
    select(item) {
      this.selected = item
      this.editUsername = item.username
    },
    isSelected(admin) {
      return this.selected._id == admin._id
    },
    unSelect() {
      this.selected = {}
      this.editUsername = ""
    }
  }
}
</script> -->
