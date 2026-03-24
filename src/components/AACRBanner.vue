<template>
        <v-banner v-if="isOpen" :sticky="true" class="banner banner-gradient open-banner">
            <v-btn
                class="banner-close"
                icon
                flat
                size="small"
                @click="dismissBanner"
                aria-label="Dismiss banner"
            >
                <v-icon size="small">mdi-close</v-icon>
            </v-btn>
            <container-sm>
                <v-row align="center" justify="space-around" class="banner-wrapper">

                    <div class="text-h4">Visit the <span class="text-gradient">PRISM Team at AACR 2026</span> at booth 3017!
                    </div>


                    <BaseButton
                        text="Follow updates LinkedIn"
                        href="https://www.linkedin.com/company/prism-cancer-cell-line-screening"
                        icon="mdi-open-in-new"
                        class="primary-gradient"
                    ></BaseButton>
                </v-row>

                  
   
            </container-sm>

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
.text-gradient{
    font-weight: 600;
    background: -webkit-linear-gradient(var(--v-primary-lighten-1), var(--v-primary-base), var(--v-primary-darken-2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}


.banner-wrapper {
    min-height: var(--v-banner-height);

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
  
