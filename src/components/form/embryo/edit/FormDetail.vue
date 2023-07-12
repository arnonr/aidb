<template>
    <div class="mb-5">
        <h1 class="text-xl mb-2 font-light">รายละเอียดย้ายฝากตัวอ่อน</h1>
        <p class="p-0 m-0 text-500">ป้อนรายละเอียดการย้ายฝากตัวอ่อนของคุณ</p>
    </div>
    <form class="grid">
        <div class="col-12 lg:col-12">
            <div class="formgrid grid">
                <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        รอบการให้นม</label>
                    <InputText type="text" class="w-full" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        ครั้งที่ผสม</label>
                    <InputText type="text" class="w-full" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label for="dateRange" class="block text-600 text-sm font-bold mb-2">
                        วันที่ผสม</label>
                    <Calendar class="w-full" id="dateRange" v-model="birthdate" :manualInput="false" placeholder=""
                        :showIcon="true" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        หมายเลขทะเบียนตัวอ่อน</label>
                    <InputText type="text" class="w-full" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        รหัสเจ้าหน้าที่ผู้ผสมเทียม</label>
                    <InputText type="text" class="w-full" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        ชื่อเจ้าหน้าที่ผู้ผสมเทียม</label>
                    <InputText type="text" class="w-full" />
                </div>
            </div>
        </div>
        <div class="col-12 text-right mt-5 flex justify-content-between">
            <Button label="ย้อนกลับ" @click="prevPage()" icon="pi pi-angle-left"
                class="p-button-outlined p-button-secondary" />
            <Button label="บันทึก" @click="save()" icon="pi pi-save" class="p-button p-button-success" />
        </div>
    </form>
</template>

<script>
import { ref } from 'vue'
export default {
    emits: ['next-page', 'prev-page'],
    setup(_, { emit }) {
        const prevPage = () => {
            emit('prev-page', { pageIndex: 1 });
        }
        const birthdate = ref()
        const date = ref()
        return {
            prevPage,
            birthdate,
            date
        }
    }
}
</script>

<style lang="scss" scoped>
</style>