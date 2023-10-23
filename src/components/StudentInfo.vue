<template>
  <div class="main">
    <div class="student-info">
      {{student}}
      <img :src="student.photo">
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
import axios from 'axios'
export default {
  props: {
    id: {}
  },
  data () {
    return {
      student: {}
    }
  },
  methods: {
    getStudent (id) {
      axios.get('http://34.82.81.113:3000/students/' + id).then(response => {
        this.student = response.data
      })
    }
  },
  mounted () {
    this.getStudent(this.id)
  }
}
</script>

<style>
@import '../assets/style.css';
</style>
