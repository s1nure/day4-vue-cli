<template>
  <div class="home">
    <input
      v-model="search"
      type="text"
      class="search_input"
      placeholder="Пошук за прізвищем"
    />
    <table class="styled-table">
      <thead>
        <tr>
          <th>ПІБ</th>
          <th>Група</th>
          <th>Рік народження</th>
          <th>Практика</th>
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="student in students"
          :key="student.id"
          :class="{
            highlighted: student.name.includes(search) && search !== '',
          }"
        >
          <td>{{ student.name }}</td>
          <td>{{ student.group }}</td>
          <td>{{ student.birthOfYear }}</td>
          <td>
            <input type="checkbox" v-model="student.isDonePr" />
          </td>
          <td>
            <button @click="deleteStudent(student._id)">Видалити</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="push-student">
      <table class="styled-table">
        <thead>
          <th>ПІБ</th>
          <th>Група</th>
          <th>Рік народження</th>
          <th>Практика</th>
        </thead>
        <tbody>
          <td>
            <input v-model.trim="student.name" type="text" class="push_input" />
          </td>
          <td>
            <select v-model="student.group" class="push_input">
              <option value="RPZ 20 1/9">RPZ 20 1/9</option>
              <option value="RPZ 20 2/9">RPZ 20 2/9</option>
            </select>
          </td>
          <td>
            <input
              v-model.number="student.birthOfYear"
              type="number"
              class="push_input"
            />
          </td>
          <td>
            <input
              v-model="student.isDonePr"
              class="shorter_input push_input"
              type="checkbox"
              name="practitce"
              id="checkbox_practice"
            />
          </td>
        </tbody>
      </table>
      <button @click="addStudent()" class="button_view button_push">
        Додати студента
      </button>
    </div>
    <button @click="this.$router.push('/exchange-rates')">ExchangeRates</button>
    <h1>{{ students }}</h1>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  data () {
    return {
      students: [],
      search: '',
      student: { _id: '', name: '', isDonePr: false, group: '', birthOfYear: 1990 }
    }
  },
  mounted: function () {
    axios.get('http://34.82.81.113:3000/students').then((res) => {
      this.students = res.data
    })
  },
  methods: {
    deleteStudent (studId) {
      this.students = this.students.filter((elem) => {
        return elem._id !== studId
      })
    },
    addStudent () {
      this.student._id = this.students.length + 1
      this.students.push({ ...this.student })
    }
  }
}

</script>

<style>
  @import '../assets/style.css';
</style>
