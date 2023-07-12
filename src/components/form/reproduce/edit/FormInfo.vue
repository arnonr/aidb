<template>
    <div class="mb-5">
        <h1 class="text-xl mb-2 font-light">ข้อมูลกระบือ</h1>
        <p class="p-0 m-0 text-500">ป้อนรายละเอียดกระบือของคุณ</p>
    </div>
    <form class="grid">
        <div class="col-12 lg:col-12">
            <div class="formgrid grid">
                <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        หมายเลขประจำตัวกระบือ</label>
                    <InputText type="text" class="w-full" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        ชื่อกระบือ</label>
                    <InputText type="text" class="w-full"  />
                </div>
                <div class="field col-12 sm:col-6">
                 <label for="dateRange" class="block text-600 text-sm font-bold mb-2">
                            วัน-เดือน-ปีเกิด (อายุ)</label>
                        <Calendar class="w-full" id="dateRange" v-model="birthdate"
                            :manualInput="false" placeholder="" :showIcon="true"/>
                </div>
                <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        รอบการให้นมครั้งที่</label>
                    <InputText type="text" class="w-full"/>
                </div>
                <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                       ครั้งที่ผสม</label>
                    <InputText type="text" class="w-full" />
                </div>
                <div class="field col-12 sm:col-6">
                     <label for="dateRange" class="block text-600 text-sm font-bold mb-2">
                           วันที่คลอด/แท้ง ล่าสุด</label>
                        <Calendar class="w-full" id="dateRange" v-model="date"
                            :manualInput="false" placeholder="" :showIcon="true"/>
                </div>
                <div class="field col-12 sm:col-12">
                    <label class="block text-600 text-sm font-bold mb-2">
                        ประวัติการคลอด</label>
                    <InputText type="text" class="w-full" />
                </div>
                
            </div>
        </div>
        <div class="col-12 text-right mt-5">
            <Button label="ต่อไป" @click="nextPage()" icon="pi pi-angle-right" iconPos="right" />
        </div>
    </form>
</template>

<script>
import {  ref } from 'vue'
export default {
    emits: ['next-page', 'prev-page'],
    setup(_, { emit }) {
        const nextPage = () => {
            emit('next-page', {
                pageIndex: 1
            });
        }
         const birthdate = ref()
         const date = ref()
        return {
            nextPage,
            birthdate,
            date
        }
    }
}
</script>

<style lang="scss" scoped>
</style>