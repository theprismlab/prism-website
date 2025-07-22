<template>
    <v-card class="ml-6"  elevation="0">
        <v-card  v-for="(step, index) in steps" :key="index" class="mb-4" elevation="0">

            <div class=" text-body-2">
                <v-icon class="text-primary-base" style="float:left">mdi-numeric-{{ index + 1 }}-circle</v-icon>
                <div style="display: inline-block; width: calc(100% - 40px);">
                    <div v-html="step.text" class="ml-2"></div>
                </div>
            </div>
            <div class=" text-body-2 text-grey-darken-2 ma-2">
                <ul v-if="step.subSteps && step.subSteps.length" class="ml-12">
                    <li v-for="(subStep, subIndex) in step.subSteps" :key="subIndex" v-html="subStep.text"></li>
                </ul>
            </div>
            <v-divider></v-divider>
        </v-card>
    </v-card>
</template>
<script>
export default {
    name: "CollaborateSteps",
    data() {
        return {
            steps: [
                {
                    text: 'Complete the forms on the submission hub during our 2-3 week submission window <a href="https://www.theprismlab.org/portal/submissions" target="_blank" class="text-link">PRISM Submission Hub</a>.',
                },
                {
                text: "Approve and fund a quote for your PRISM submission",

                },
                {
                text: "Ship a stock solution of your test agent(s) to the PRISM lab before the submission window deadline",

                },

                {
                text: "Data will be released on the PRISM Portal approximately 4 months after the submission window closes"
                }
            ]
        }
    }
}
</script>
<style scoped>


</style>