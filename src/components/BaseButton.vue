<template>
    <v-btn
        class="button-link"
        :href="href"
        :target="target"
        rel="noopener noreferrer"
        variant="outlined"
        rounded

        color="primary"
    >
        {{ text }}
        <v-icon v-if="icon" size="small" class="ml-1">{{ icon }}</v-icon>
    </v-btn>
</template>
<script>
export default {
    name: "BaseButton",
    props:{
        text: String,
        icon: { 
            type: String, 
            default: ""
        },
        href: String,
        target: {
            type: String,
            default: "_blank"
        }
    }
}
</script>

<style scoped>
.button-link {
    /* display: inline-flex;
    align-items: center; */
    font-weight: 600;
    /* font-size: 0.875rem !important; */
    color: var(--v-primary-darken-1) !important;
    text-decoration: none !important;
    text-transform: none !important;
    /* border: 1px solid var(--v-primary-accent-1); */
    font-family: 'Inter', sans-serif !important;
     /* background-color: var(--v-primary-lighten-5) !important; */
     background-color: transparent !important;
     letter-spacing: normal !important;
    /* border-radius: 999px;
    padding: 8px 14px; */
    transition: background-color 0.15s ease, border-color 0.15s ease;

}

.button-link:hover {
    background: var(--v-primary-lighten-7);
    border-color: var(--v-primary-lighten-2);
}

.button-link:focus-visible {
    outline: 2px solid var(--v-primary-lighten-2);
    outline-offset: 2px;
}
</style>
