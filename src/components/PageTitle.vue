<template>
    <div class="flex flex-column xl:flex-row xl:align-items-center xl:justify-content-start mb-2 sm:mb-4">
        <h1 class="text-2xl sm:text-3xl font-light mb-2 xl:mb-0">{{ title }}</h1>
        <span class="hidden xl:inline mx-3 xl:text-3xl">|</span>
        <Breadcrumb :home="home" :model="pages" class="hidden sm:inline sm:text-base">
            <template #item="{ item }">
                <router-link v-if="item.label" :to="item.to" custom
                    v-slot="{ href, navigate, isActive, isExactActive }">
                    <a :href="href" @click="navigate" :class="{
                        'active-link': isActive, 'active-link-exact': isExactActive
                    }">{{ item.label }}</a>
                </router-link>
                <router-link v-else :to="item.to" custom v-slot="{ href, navigate, isActive, isExactActive }">
                    <a :href="href" @click="navigate" :class="{
                        'active-link': isActive, 'active-link-exact': isExactActive
                    }">
                        <i :class="{ 'pi pi-home': item.to === '/' }"></i>
                    </a>
                </router-link>
            </template>
        </Breadcrumb>
    </div>
</template>

<script>
import { ref } from 'vue';
export default {
    props: ['pages', 'title'],
    setup() {
        const home = ref({
            to: '/',
        });

        return {
            home,
        }
    }
}
</script>

<style scoped>

a {
    color: var(--primary-color);
}

.active-link-exact {
    color: #625F6E !important;
}

.p-breadcrumb {
    background: transparent;
    border: 0;
    border-color: transparent;
    padding: 0;
}
</style>