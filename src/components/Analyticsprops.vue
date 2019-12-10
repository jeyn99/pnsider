<template>
  <div id="table" class="spacer">
    <v-data-table :headers="headers" :items="score" hide-default-footer class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>
            <i>{{questionLabel}}</i>
          </v-toolbar-title>
          {{ question }}
          <v-divider class="mx-4" inset vertical></v-divider>
          <div class="my-2">
            <v-btn small class="button">See Students</v-btn>
          </div>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small @click="seeStudentWhoAnswered(item)">mdi-account-multiple</v-icon>
      </template>
    </v-data-table>
    <hr>
  </div>
</template>



<script>
import axios from "axios";

export default {
  props: {
    score: {
      type: Array,
      required: true
    },
    question: Number,
    questionLabel: String
  },
  data() {
    return {
      headers: [
        // { text: "Number of Answers", value: "description" },
        {
          text: "Category",
          align: "left",
          value: "_id"
        },
        { text: "Number of Answers", value: "answers" },
        { text: "Action", value: "action", sortable: false }
      ],
      answers: [],
      students: [],
      dialog: false
    };
  },
  methods: {
    seeStudentWhoAnswered(item) {
      console.log(item._id);
      axios
        .get(
          "http://localhost:8081/admin/report/summary/" +
            item.description +
            "/" +
            item._id
        )
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            this.students.push(res.data);
            console.log(
              res.data[i].studentID.firstname,
              res.data[i].studentID.lastname
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.table {
  margin-left: 10%;
  max-width: 80%;
  background-color: #ffffff;
  padding: 20px;
  text-align: center;
}
.spacer {
  margin: 10%;
}
</style>