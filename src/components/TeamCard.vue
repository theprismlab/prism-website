<template>
    <v-card elevation="0" class="fill-height" align="center" justify="center" >
        <v-card-item>
            <div class="avatar-bg" :class="gradientClass">
                <v-img :src="image" height="auto" width="90%" aspect-ratio="1/1" class="rounded-circle"></v-img>
            </div>
            <h3 class="text-h5 mt-2">{{ name }}</h3>
            <p class="v-card-subtitle">{{ title }}</p>
        </v-card-item>
    </v-card>
  </template>
  
<script>


export default {
    name: "TeamCard",
    props: {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        bio: {
            type: String,
            required: false
        },
        index: {
            type: Number,
            required: false
        }
    },
    computed: {
        gradientClass() {
            const gradients = [
                "gradient-sunrise",
                "gradient-ocean",
                "gradient-ember",
                "gradient-aurora",
                "gradient-lagoon",
                "gradient-orchid",
                "gradient-citrus"
            ];
            const safeIndex = Number.isInteger(this.index) ? this.index : 0;
            return gradients[Math.abs(safeIndex) % gradients.length];
        }
    }
}
</script>

<style scoped>
.v-card{
    max-width: 300px;
    min-width: 200px;
}
.v-card-title{
    font-size: 1.15rem !important;
}
.v-card-subtitle{
    font-size: 0.9rem !important;
    line-height: 1.3rem !important;
    margin-top:4px;
}

.avatar-bg{
    width: 90%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    padding: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.12);
}

.gradient-sunrise{
    background: linear-gradient(135deg, #ffb366 0%, #ff6f61 45%, #9b59ff 100%);
}

.gradient-ocean{
    background: linear-gradient(135deg, #7bdff2 0%, #3a86ff 50%, #2ec4b6 100%);
}

.gradient-ember{
    background: linear-gradient(135deg, #ff9f1c 0%, #ff4d6d 55%, #c1121f 100%);
}

.gradient-aurora{
    background: linear-gradient(135deg, #7bf1a8 0%, #22d3ee 55%, #38bdf8 100%);
}

.gradient-lagoon{
    background: linear-gradient(135deg, #5ad7ff 0%, #3b82f6 50%, #1e40af 100%);
}

.gradient-orchid{
    background: linear-gradient(135deg, #f0abfc 0%, #c084fc 45%, #7c3aed 100%);
}

.gradient-citrus{
    background: linear-gradient(135deg, #fde68a 0%, #f59e0b 50%, #f97316 100%);
}

</style>