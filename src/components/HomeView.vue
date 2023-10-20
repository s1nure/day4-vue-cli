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
          v-for="student, index in students"
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
            <button v-show="!student.isEditing" :disabled="this.student.isEditing" @click="editingMode(index)" class="button_edit tooltip"><ion-icon name="create-outline"></ion-icon></button>
            <button v-show="student.isEditing" @click="updateStudent(student._id, index)" class="button_done tooltip"><ion-icon name="checkmark-outline"></ion-icon></button>
            <button :disabled="this.student.isEditing" class="button_del tooltip" @click="deleteStudent(student._id, index)">Видалити</button>
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
      <button :disabled="this.student.isEditing"  @click="addStudent()" class="button_view button_push">
        Додати студента
      </button>
    </div>
    <button :disabled="this.student.isEditing" class="button_redirect" @click="this.$router.push('/exchange-rates')">ExchangeRates</button>
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
        .then(response => {
          console.log(response.data)
          if (response.status === 200) this.students.push(response.data)
        })
      this.student = { _id: '', name: '', isDonePr: false, group: '' }
    },

    deleteStudent (_id, index) {
      axios.delete(`http://34.82.81.113:3000/students/${_id}`).then((response) => {
        console.log(response.data)
        if (response.status === 200) this.students.splice(index, 1)
      })
    },

    editingMode (index) {
      if (index === -1) return
      this.students[index].isEditing = true
      this.student = { ...this.students[index] }
    },

    updateStudent (_id, index) {
      this.students[index] = this.student
      axios.put(`http://34.82.81.113:3000/students/${_id}`, this.student).then((response) => {
        this.students[index] = response.data
        this.students[index].isEditing = false
      })
      this.student = { _id: '', name: '', isDonePr: false, group: '' }
    }
  }
}

</script>

<style>
  @import '../assets/style.css';
</style>
