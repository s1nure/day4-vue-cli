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
          <th>Практика</th>
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="student in students"
          :key="student.id"
          :class="{
            highlighted: student.name && student.name.includes(search) && search !== '',
          }"
        >
          <td>{{ student.name }}</td>
          <td>{{ student.group }}</td>
          <td>
            <input type="checkbox" v-model="student.isDonePr" />
          </td>
          <td>
            <button v-show="!student.isEditing" @click="editingMode(student._id)" class="button_edit tooltip"><ion-icon name="create-outline"></ion-icon></button>
            <button v-show="student.isEditing" @click="editingModePush(student._id)" class="button_done tooltip"><ion-icon name="checkmark-outline"></ion-icon></button>
            <button class="button_del tooltip" @click="deleteStudent(student._id)">Видалити</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="push-student">
      <table class="styled-table">
        <thead>
          <th>ПІБ</th>
          <th>Група</th>
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
    <h1>{{ student }}</h1>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  data () {
    return {
      students: [],
      search: '',
      student: { _id: '', name: ' ', group: '', photo: '', mark: 5, isDonePr: false, __v: 0, isEditing: false }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      axios.get('http://34.82.81.113:3000/students').then((res) => {
        this.students = res.data
      })
    },
    addStudent () {
      axios.post('http://34.82.81.113:3000/students', {
        name: this.student.name,
        group: this.student.group,
        photo: this.student.photo,
        mark: this.student.mark,
        isDonePr: this.student.isDonePr
      })
        .then(data => {
          console.log(data)
          this.getData()
        })
      this.student = { _id: '', name: '', isDonePr: false, group: '' }
    },
    deleteStudent (studId) {
      axios.delete(`http://34.82.81.113:3000/students/${studId}`).then((data) => {
        console.log(data)
        this.getData()
      })
    },
    editingMode (_id) {
      const editStudentIndex = this.students.findIndex(student => student._id === _id)

      if (editStudentIndex === -1) return
      this.students[editStudentIndex].isEditing = true

      const editStudent = { ...this.students.find(student => student._id === _id) }
      this.student = editStudent
    },
    editingModePush (_id) {
      const editStudentIndex = this.students.findIndex(student => student._id === _id)

      this.students[editStudentIndex] = this.student
      this.student = { _id: '', name: '', isDonePr: false, group: '' }
      this.students[editStudentIndex].isEditing = false
    }
  }
}

</script>

<style>
  @import '../assets/style.css';
</style>
