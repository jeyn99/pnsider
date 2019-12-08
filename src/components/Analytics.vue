<template>
  <div class="table">
    <div v-for="(ans , index) in answers" :key="index">
      <Props :score="ans"/>
    </div>
    <!-- <Props :score="answers2" :question="2"/> -->
  </div>
</template>

<script>
import Props from "./Analyticsprops.vue";
// import axios from "axios"
export default {
  name: "Analytics",
  data() {
    return {
      answers: []
      //   answers2: [{ num: "Jisoo", num: "Baby", num: "Kalabaw" }],
      //   answers3: []
    };
  },
  components: {
    Props
  },
  mounted() {
    for (let i = 0; i < 12; i++) {
      this.answers.push([
        { num: "Jane" },
        { num: "Repollo" },
        { num: "Self" },
        { num: "Jisoo" },
        { num: "Baby" },
        { num: "Kalabaw" }
      ]);
    }
  }

  // mounted() {
  //   var index = 1;
  //   while (index <= 3) {
  //     axios
  //       .post("http://localhost:5000/staff/summary/" + index)
  //       .then(res => {
  //         // for (let i= 0; i < res.data.length ; i++) {
  //         //   console.log(index, "here")
  //         //   this.answers1.push(res.data[i])
  //         // }
  //         this.answers.push(res.data)
  //         index++;
  //         // console.log(this.answers[index], "answers")
  //       })
  //       .catch(err => {
  //         console.log("Ni error", err);
  //         index = 3;
  //       });

  //   }
  // }

  // data:
  //     [{ num: "Jane" },
  //     { num: "Repollo" },
  //     { num: "Self" },
  //     { num: "Jisoo" },
  //     { num: "Baby" },
  //     { num: "Kalabaw" }]
};
</script>