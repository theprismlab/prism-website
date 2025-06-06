<template>
    <v-card class="ml-6"  elevation="0">
        <v-card  v-for="(step, index) in steps" :key="index" class="mb-4" elevation="0">

            <div class=" text-body-2">
                <v-icon class="text-primary-lighten-2" style="float:left">mdi-numeric-{{ index + 1 }}-circle</v-icon>
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
                    text: "Get on our mailing list below to receive updates on our screen offerings and submission windows!"
                },
                {
                    text: 'Register for the screen by completing an online submission form on the <a href="https://www.theprismlab.org/portal/submissions" target="_blank" class="text-link">PRISM Submission Hub</a>.',
                    subSteps: [
                        {
                            text: "Forms can only be completed during our 2-3 week submission window periods (specific dates will be available on the Submission Hub)"
                        },
                        {
                            text: "As we have limited capacity for all of our screens, we encourage collaborators to submit their forms as soon as the window opens."
                        }
                    ]
                },
                {
                text: "Approve and fund a quote for your PRISM submission",
                subSteps: [
                    {
                    text: "An invoice will be sent after data is delivered"
                    }
                ]
                },
                {
                text: "Ship a stock solution of your test agent(s) to the PRISM lab before the submission window deadline",
                subSteps: [
                    {
                    text: "We will share additional shipping information once your submission form and funded quote are confirmed by a member of our team"
                    }
                ]
                },
                {
                text: 'Create an account on the <a href="https://www.theprismlab.org/portal/log-in" target="_blank" class="text-link">PRISM Portal</a>  to prepare for data delivery and give data access to others',
                },
                {
                text: "Receive your screening data on the PRISM Portal approximately 4 months after the submission window closes"
                }
            ]
        }
    }
}
</script>
<style scoped>


</style>