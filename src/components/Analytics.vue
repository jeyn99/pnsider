<template>
  <div class="table">
    <div v-for="(ans , index) in answers" :key="index">
      <Props :score="ans" :questionLabel="questions[index]" />
    </div>
    <!-- <Props :score="answers" :question="2"/> -->
  </div>
</template>

<script>
import Props from "./Analyticsprops.vue";
import axios from "axios";
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
      answers: [],
      total: []
    };
  },
  components: {
    Props
  },
  mounted() {
    var i = 1;
    for (i; i < 13; i++) {
      axios
        .post("http://localhost:8081/admin/report/summary/" + i )
        .then(res => {
          this.total.push(res.data.data.length)
          this.answers.push(res.data.data);
        })
        .catch(err => {
          console.log("Ni error", err);
        });
    }
  }
};
</script>