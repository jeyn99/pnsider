<template>
  <div class="table">
    <div v-for="(ans , index) in answers" :key="index">
      <Props :score="ans" :questionLabel="questions[index]"/>
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
      questions: [
        "How do you feel in the center?",
        "How was your relationship to your co-scholar?",
        "How was your relationship with PN Staff?",
        "How was your overall performance and collaboration of the tasking team?",
        "What PN core values did you experience this week?",
        "What soft skill or behavior that you want to improve?", //Academic
        "Which educational activities do you prefer?",
        "What subject do you find difficult?",
        "How do you deal with your difficulties?",
        "How was your relationship with your teacher?",
        "What academic skill that you want to improve?",
        "What challenges have you encounter during class?"
      ],
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