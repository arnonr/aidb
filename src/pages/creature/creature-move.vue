<template>
    <div class="grid">
        <div class="col-12">
            <PageTitle title="ย้ายทะเบียนสัตว์" :pages="breadcrumb" />
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
import { useRouter } from 'vue-router';

import PageTitle from '@/components/PageTitle.vue'

export default {
    components: {
        PageTitle
    },
    setup() {
        const breadcrumb = ref([
            { label: 'กิจกรรมย้ายฝากตัวอ่อน', to: '/creature' }, ///activity/abortion/all
            { label: 'แก้ไขกิจกรรมย้ายฝากตัวอ่อน', to: '/creature/move/step1' }, ///activity/abortion/add
        ])
        const router = useRouter()
        const steps = ref([
            {
                label: "เลือกหน่วยและฟาร์ม",
                to: "/creature/move/step1",
            },
            {
                label: "ข้อมูลฟาร์ม",
                to: "/creature/move/step2",
            },
        ]);


        const nextPage = (event) => {
            router.push(steps.value[event.pageIndex].to);
        };
        const prevPage = (event) => {
            router.push(steps.value[event.pageIndex].to);
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