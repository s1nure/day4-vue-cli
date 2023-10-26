<template>
  <div class="main">
    <ModalComponent :photo="student.photo" :open ="isOpenModal" @close="isOpenModal = !isOpenModal">
    </ModalComponent>

    <div class="student-info">
      <p> Кількість студентів: {{ getCount }}</p>
      {{student}}
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
import { mapGetters } from 'vuex'
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
  }
}
</script>

<style>
@import '../assets/style.css';
</style>
