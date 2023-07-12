<template>
    <div class="mb-5">
        <h1 class="text-xl mb-2 font-light">ย้ายทะเบียนฟาร์ม</h1>
    </div>
    <form class="grid">
        <div class="col-12 lg:col-12">
            <div class="formgrid grid">
                <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        เลือกหน่วยต้นทาง</label>
                    <InputText type="text" class="w-full" value="000001 , หน่วยนี้อกหัก ใจผมแตกสลายฮะ" disabled />
                </div>
                <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        เลือกหน่วยปลายทาง</label>
                    <InputText type="text" class="w-full" value="000002 , หน่วยนคลั่งน้ำตา เพราะคลั่งรักมากไป"
                        disabled />
                </div>
                <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        เลือกฟาร์มที่ต้องการย้าย</label>
                    <Dropdown class="w-full" placeholder="เลือกฟาร์มที่ต้องการย้าย" />
                </div>
            </div>
        </div>
        <div class="col-12 text-right mt-5 flex justify-content-between">
            <Button label="ย้อนกลับ" @click="prevPage()" icon="pi pi-angle-left"
                class="p-button-outlined p-button-secondary" />
            <Button label="บันทึก" @click="nextPage()" icon="pi pi-save" iconPos="left" />
        </div>
    </form>
</template>

<script>
export default {
    emits: ['next-page', 'prev-page'],
    setup(_, { emit }) {
        const nextPage = () => {
            emit('next-page', { pageIndex: 0 });
        }

        const prevPage = () => {
            emit('prev-page', { pageIndex: 1 });
        }

        return {
            nextPage,
            prevPage
        }
    }
}
</script>

<style scoped>
</style>