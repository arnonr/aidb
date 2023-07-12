<template>
    <div class="grid">
        <div class="col-12">
            <PageTitle title="ย้ายทะเบียนฟาร์ม" :pages="breadcrumb" />
            <div class="card lg:p-0">
                <div class="grid">
                    <div
                        class="col-12 lg:col-4 xl:col-3 border-bottom-1 lg:border-bottom-0 lg:border-right-1 border-300 mb-3 lg:mb-0 lg:pl-5 lg:pt-4 pb-4 lg:pb-0">
                        <Steps class="vertical" :model="steps" :readonly="true" />
                    </div>
                    <div class="col-12 lg:col-8 xl:col-9 lg:p-4">
                        <router-view v-slot="{ Component }" @prevPage="prevPage($event)" @nextPage="nextPage($event)">
                            <keep-alive>
                                <component :is="Component" />
                            </keep-alive>
                        </router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import PageTitle from '@/components/PageTitle.vue'

export default {
    components: {
        PageTitle
    },
    setup() {
        const router = useRouter()
        const route = useRoute()
        const breadcrumb = ref([
            { label: 'ทะเบียนฟาร์ม (ผท.3)', to: '/farm' },
            { label: 'ย้ายทะเบียนฟาร์ม', to: `/farm/move/${route.params.id}` },
        ])
        const steps = ref([
            {
                label: 'เลือกหน่วย',
                to: `/farm/move/${route.params.id}`
            },
            {
                label: 'เลือกฟาร์ม',
                to: `/farm/move/${route.params.id}/form-farm`,
            }
        ]);


        const nextPage = (event) => {
            router.push(steps.value[event.pageIndex + 1].to);
        };
        const prevPage = (event) => {
            router.push(steps.value[event.pageIndex - 1].to);
        };


        return {
            breadcrumb,
            steps,
            router,
            nextPage,
            prevPage
        }
    }
}
</script>

<style>
</style>