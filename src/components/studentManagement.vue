<template>
  <div id="app1">
    <v-app>
      <v-data-table :headers="headers" :items="student" :search="search" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>STUDENT LIST</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" class="xs-2 ma-4" v-on="on">ADD STUDENT</v-btn>
                <v-btn color="primary" @click="initialize" class="xs-2 ma-4">RESET</v-btn>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  label="Search"
                  append-icon="mdi-magnify"
                  single-line
                  hide-details
                ></v-text-field>
              </template>

              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="editedusername._id" label="ID" style="display:none"></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field v-model="editedusername.username" label="username"></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field v-model="editedusername.password" label="password"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedusername.firstname"
                          type="string"
                          label="firstname"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedusername.lastname"
                          type="string"
                          label="lastname"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="editedusername.gender" type="string" label="gender"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="editedusername.batch" type="Number" label="batch"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedusername.date"
                          type="datetime"
                          label="DATE"
                          disabled
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editusername(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteusername(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>
 
<script>
/* eslint-disable */

import axios from "axios";
export default {
  name: "Students",
  data: () => ({
    search: "",
    dialog: false,
    headers: [
      {
        text: "Username",
        align: "left",
        sortable: false,
        value: "username"
      },
      { text: "Firstname", value: "firstname" },
      { text: "Lastname", value: "lastname" },
      { text: "Batch", value: "batch" },
      { text: "Gender", value: "gender" },
      { text: "Date", value: "dateCreated" },
      { text: "Actions", value: "action", sortable: false }
    ],
    student: [],
    totalAmount: 0,
    editedIndex: -1,
    editedusername: {
      _id: null,
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      gender: "",
      batch: null,
      dateCreated: new Date()
    },
    defaultusername: {
      _id: null,
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      gender: "",
      batch: null,
      dateCreated: new Date()
    },
    checkerusername: {
      _id: null,
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      gender: "",
      batch: null,
      dateCreated: new Date()
    },
    url: "http://localhost:8081/"
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "STUDENT DETAILS" : "EDIT STUDENT";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
    this.getAll();
  },

  methods: {
    initialize() {
      this.student = [];
    },
    getAll() {
      axios
        .get(this.url + "admin/students")
        .then(res => {
          this.student = res.data;
          this.totalAmount = this.totalAmount + Number(res.data.amount);
          console.log(this.student);
          //trouble in adding all
        })
        .catch(err => {
          alert(err);
        });
    },
    editusername(item) {
      this.editedIndex = this.student.indexOf(item);
      this.editedusername = Object.assign({}, item);
      this.dialog = true;
      this.checkID(item._id);
    },

    deleteusername(item) {
      const index = this.student.indexOf(item);
      console.log(item)
      confirm("Are you sure you want to delete this username?") &&
        axios
          .post(
            this.url +
              "admin/student/delete/" +
              item._id
          )
          .then(res => {
            alert("Succesfully Deleted!");
            this.student.splice(index, 1);
          })
          .catch(err => {
            alert(err);
          });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedusername = Object.assign({}, this.defaultusername);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.student[this.editedIndex], this.editedusername);
        //isave sa database update
        console.log(this.student[this.editedIndex]._id);
        axios
          .post(
            this.url +
              "admin/student/update/" +
              this.student[this.editedIndex]._id,
            this.student[this.editedIndex]
          )
          .then(res => {
            console.log(res.data, "Here is the updated data send");
            //   alert("Succesfully Updated!");
          })
          .catch(err => {
            alert(err);
          });
      } else {
        this.student.push(this.editedusername);
        //save for the first time
        axios
          .post(this.url + "admin/student/create", this.editedusername)
          .then(res => {
            alert(res.data.message);
            this.checkerusername = res.data;
            this.getAll();
          })
          .catch(err => {
            alert(err);
          });
      }
      this.close();
    },
    checkID(id) {
      //retrieve by id
      axios
        .post(this.url + "admin/student/update/" + id)
        .then(res => {
          this.checkerusername = res.data;
        })
        .catch(err => {
          alert(err);
        });
    }
  }
};
</script>
<style>
#app1 {
  max-width: 90% !important;
  margin-left: 5% !important;
  margin-top: 5%;
}
</style>
