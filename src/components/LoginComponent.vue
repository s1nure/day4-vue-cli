<template>
  <div>
    <div>
      <table>
        <tbody>
          <tr v-for="student in students">
            <td>{{ student.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <input v-model="input" type="text" placeholder="ім'я студента" required />
    <button @click="login">Ввійти</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      input: "",
      students: [],
    };
  },
  methods: {
    login() {
      axios
        .get("http://34.82.81.113:3000/students/name/" + this.input)
        .then((response) => {
          if (response.data === null || response.data.name == "CastError") {
            return;
          }
          this.$store.commit("setUser", response.data);
          this.$router.push("/");
        });
    },
    getData() {
      axios.get("http://34.82.81.113:3000/students").then((res) => {
        this.students = res.data;
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
