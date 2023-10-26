<template>
  <div class="main" :class="{ 'dark-mode' : darkTheme }">
    <ModalComponent :photo="student.photo" :open ="isOpenModal" @close="isOpenModal = !isOpenModal">
    </ModalComponent>

    <div class="student-info">
      {{student}}
      <div>
        <div>
          <div>
            <p> Кількість студентів: {{ getCount }}</p>
          </div>
          <label for="themeSwitch">Сменить тему:</label>
          <input
            type="checkbox"
            id="themeSwitch"
            :checked="darkTheme"
            @change="toggleTheme"
          />
        </div>
      </div>
      <img class="student-img" :src="student.photo" @click="isOpenModal = !isOpenModal">
      <div>
        <div><h2>Імʼя: {{ student.name }}</h2></div>
        <div><h2>Група: {{ student.group }}</h2></div>
        <div><h2>Оцінка: {{ student.mark }}</h2></div>
        <div>
          <h2>Стан практики:</h2>
          <h2 v-if="student.isDonePr">Практика виконана!</h2>
          <h2 v-if="!student.isDonePr">Практика ще не виконана</h2>
        </div>
      </div>
      <button class="button_redirect" @click="this.$router.push('/')">Повернутись до списку студентів</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import ModalComponent from '../components/ModalComponent.vue'
export default {
  props: {
    id: {}
  },
  components: {
    ModalComponent
  },
  data () {
    return {
      student: {},
      isOpenModal: false,
    }
  },
  methods: {
    ...mapActions(['toggleTheme']),
    getCount () {
      return this.getCount()
    },
    getStudent (id) {
      axios.get('http://34.82.81.113:3000/students/' + id).then(response => {
        this.student = response.data
      })
    }
  },
  mounted () {
    this.getStudent(this.id)
  },
  computed: {
    ...mapGetters(['getCount']),
    darkTheme() {
      return this.$store.state.theme;
    },
  }
}
</script>

<style>
@import '../assets/style.css';
</style>
