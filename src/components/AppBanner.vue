<template>

        <v-banner v-if="isOpen" :sticky="true" class="banner banner-gradient">
            <v-btn
                class="banner-close"
                icon
                flat
                size="x-small"
                @click="dismissBanner"
                aria-label="Dismiss banner"
            >
                <v-icon size="small">mdi-close</v-icon>
            </v-btn>
            <v-row align="end" class="banner-wrapper">
                <v-col cols="12" md="auto">
                    <p class="banner-overline mb-1">PRISM AACR 2026</p>
                    <p class="banner-caption mb-0">Visit the PRISM Team at AACR 2026 at booth 3017!
                    </p>
                </v-col>

                <v-col cols="12" md="auto" class="banner-action-col" v-if="showBtn">
                    <BaseButton
                        text="Details on LinkedIn"
                        href="https://www.linkedin.com/company/prism-cancer-cell-line-screening"
                        icon="mdi-open-in-new"
                    ></BaseButton>
                </v-col>
            </v-row>
        </v-banner>

        <v-badge
            v-else
            class="banner-reopen-badge"
            color="error"
            dot
            overlap
            offset-x="4"
            offset-y="4"
        >
            <v-btn
                icon="mdi-bell-outline"
                size="40"
                color="primary-base"
                variant="elevated"
                aria-label="Reopen announcement banner"
                @click="reopenBanner"
            >
            </v-btn>
        </v-badge>

</template>
<script setup>
import { ref } from 'vue';

const isOpen = ref(true);
const showBtn = true;

function dismissBanner() {
    isOpen.value = false;
}

function reopenBanner() {
    isOpen.value = true;
}
</script>
<style scoped>
.v-banner{
    padding: 0;
    border-bottom: 1px solid var(--v-primary-lighten-4) !important;
    top: var(--v-toolbar-height);
    z-index: 999;
}

.banner-gradient {
    background-image:
        radial-gradient(ellipse 70% 140% at 4%  30%, rgba(167, 220, 255, 0.35) 0%, transparent 65%),
        radial-gradient(ellipse 60% 120% at 90% 10%, rgba(130, 210, 240, 0.28) 0%, transparent 60%),
        radial-gradient(ellipse 55% 110% at 55% 95%, rgba(160, 230, 235, 0.28) 0%, transparent 58%),
        linear-gradient(148deg, #ffffff 0%, #f0f9fd 50%, #edf8f9 100%);
    border-bottom: 1px solid rgba(99, 182, 255, 0.15) !important;
}
/* 
.blue-light-banner{
    background: linear-gradient(120deg, var(--v-primary-lighten-6), var(--v-primary-lighten-5));
}
.frosted-banner {
    background: linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(235,240,255,0.9) 100%);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(99, 120, 255, 0.15) !important;
}
.frosted-teal-banner {
    background: linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(235, 249, 255, 0.879) 100%);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(99, 182, 255, 0.15) !important;
} 
.teal-banner {
    background: linear-gradient(135deg, rgba(224, 247, 250, 0.9) 0%, rgba(178, 235, 242, 0.9) 100%);
    border-bottom: 1px solid rgba(178, 235, 242, 0.5) !important;
}
.sunrise-banner{
    background: linear-gradient(120deg, #fff8e1 0%, #fce4ec 100%);
}
.blue-teal-accent-banner{
    background: linear-gradient(135deg, rgba(178, 235, 242, 0.9) 0%, rgba(128, 222, 234, 0.9) 100%);
    border-bottom: 1px solid rgba(128, 222, 234, 0.5) !important;
}
.blue-teal-light-banner{
    background: linear-gradient(135deg, #e3f2fd 0%, #e0f7fa 100%);
} */

.banner-wrapper {
    min-height: var(--v-banner-height);
    padding: 16px 24px 16px 60px;
}

.banner-overline {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--v-primary-darken-1);
}

.banner-title {
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.2;
    color: var(--v-grey-darken-4);
}

.banner-subtitle {
    font-size: 0.98rem;
    line-height: 1.4;
    color: var(--v-grey-darken-3);
}

.banner-caption {
    font-size: 1.1rem;
    line-height: 1.4;
    color: var(--v-grey-darken-3);
}

.banner-action-col {
    display: flex;
    justify-content: flex-start;
}


.banner-close {
    position: absolute;
    top: 8px;
    right: 8px;
    background: none !important;
    box-shadow: none !important;
    color: var(--v-grey-darken-2);
    z-index: 1;
}

.banner-reopen-badge {
    position: fixed;
    top: calc(var(--v-toolbar-height) + 8px);
    right: 16px;
    z-index: 1001;
}

@media (max-width: 959px) {
    .banner-wrapper {
        padding: 12px 16px 12px 48px;
    }

    .banner-action-col {
        margin-top: 0px;
        padding-top: 0px;
    }

    .banner-reopen-badge {
        top: calc(var(--v-toolbar-height) + 8px);
        right: 12px;
    }
}

</style>
  
