<template>
    <v-btn
        :class="`${style} button-link`"
        :href="href"
        :target="target"
        rel="noopener noreferrer"
        variant="outlined"
        rounded
        size="large"

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
        },
        style: {
            type: String,
            default: "primary"
        }
    }
}
</script>

<style scoped>
.button-link {
    font-weight: 600;
    text-decoration: none !important;
    text-transform: none !important;
    font-family: 'Inter', sans-serif !important;
    background-color: transparent !important;
    letter-spacing: normal !important;

}
.primary{
    border-color: var(--v-primary-base) !important;
     color: var(--v-primary-darken-1) !important;
         transition: background-color 0.15s ease, border-color 0.15s ease;
}
.primary-gradient {
    position: relative;
    border: none !important;
    background-image: linear-gradient(135deg, var(--v-primary-accent-2) 5%, var(--v-primary-base) 50%, var(--v-primary-darken-2) 100%) !important;
    -webkit-background-clip: text !important;
    background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
}
.primary-gradient :deep(.v-icon) {
    background-image: linear-gradient(135deg, var(--v-primary-accent-2) 5%, var(--v-primary-base) 50%, var(--v-primary-darken-2) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
.primary-gradient::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, var(--v-primary-accent-2) 5%, var(--v-primary-base) 50%, var(--v-primary-darken-2) 100% );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
}

.button-link:hover {
    background: var(--v-primary-lighten-7);
    border-color: var(--v-primary-lighten-2);
}
.primary-gradient:hover {
    opacity: 0.8;
}

.button-link:focus-visible {
    outline: 2px solid var(--v-primary-lighten-2);
    outline-offset: 2px;
}
</style>
