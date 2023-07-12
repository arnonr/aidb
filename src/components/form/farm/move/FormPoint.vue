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
                    <Dropdown class="w-full" placeholder="เลือกหน่วยต้นทาง" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        เลือกหน่วยปลายทาง</label>
                    <Dropdown class="w-full" placeholder="เลือกหน่วยปลายทาง" />
                </div>
            </div>
        </div>
        <div class="col-12 text-right mt-5">
            <Button label="ต่อไป" @click="nextPage()" icon="pi pi-angle-right" iconPos="right" />
        </div>
    </form>
</template>

<script>
export default {
    emits: ['next-page', 'prev-page'],
    setup(_, { emit }) {
        const nextPage = () => {
            emit('next-page', {
                pageIndex: 0
            });
        }

        return {
            nextPage
        }
    }
}
</script>

<style scoped>
</style>