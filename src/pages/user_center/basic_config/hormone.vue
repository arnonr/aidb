<template>
    <div class="grid">
        <!-- start main page -->
        <div class="col-12">
            <PageTitle title="ข้อมูลฮอร์โมน" :pages="breadcrumb" />

            <div class="card row col bg-primary pb-6">
                <h1 class="text-center text-white">ค้นหา</h1>
                <span class="p-input-icon-right w-full px-5">
                    <i class="pi pi-search  px-5" />
                    <InputText class="w-full" type="text" v-model="search" placeholder="ค้นหา" />
                </span>
            </div>
            <div class="mt-5 card">
                <div class="grid flex align-items-center mb-5">
                    <div class="col-12 md:col-6">
                        <h1 class="text-2xl mb-0 text-600">ข้อมูลฮอร์โมน</h1>
                    </div>
                    <div class="col-12 md:col-6 md:text-right">
                        <Button @click="openAddModal" label="เพิ่มข้อมูล" icon="pi pi-plus" class="p-button-primary" />
                    </div>
                </div>
                <DataTable class="text-sm" :value="data" :paginator="true" :rows="10"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                    <Column field="id" header="ลำดับ" class="text-center"></Column>
                    <Column field="farm" header="ชื่อฮอร์โมน" class="text-center"></Column>
                    <Column field="status" header="สถานะ" class="text-center">
                        <template #body="slotProps">
                            <div v-if="slotProps.data.status === 'ใช้งาน'">
                                <Tag class="w-full" severity="success" :value="slotProps.data.status"></Tag>
                            </div>
                            <div v-else>
                                <Tag class="w-full bg-gray-500" :value="slotProps.data.status"></Tag>
                            </div>
                        </template>
                    </Column>
                    <Column header="จัดการ" class="text-center">
                        <template #body>
                            <SplitButton label="แก้ไข" icon="pi pi-pencil" @click="openEditModal"
                                class="p-button-sm p-button-outlined p-button-warning" :model="items">
                            </SplitButton>
                        </template>
                    </Column>
                </DataTable>
            </div>

        </div>
        <!-- end main page -->
        <!-- Add Dialog -->
        <Dialog header="เพิ่มข้อมูลฮอร์โมน" v-model:visible="displayAddModal" :style="{ width: '50vw' }" :modal="true">
            <form class="grid mt-2">
                <div class="col-12 lg:col-12">
                    <div class="formgrid grid">
                        <div class="field col-12 sm:col-12">
                            <label class="block text-600 text-sm font-bold mb-2">
                                รหัส</label>
                            <InputText type="text" class="w-full" />
                        </div>
                        <div class="field col-12 sm:col-12">
                            <label class="block text-600 text-sm font-bold mb-2">
                                ข้อมูลฮอร์โมน
                            </label>
                            <InputText type="text" class="w-full" />
                        </div>
                        <div class="field col-12 sm:col-12 lg:col-12">
                            <div class="text-xl">สถานะ</div>
                            <div class="field-radiobutton">
                                <RadioButton value="1" v-model="form_data.status" />
                                <label class="mr-5">เปิดการใช้งาน</label>
                                <RadioButton value="0" v-model="form_data.status" class="ml-5" />
                                <label>ปิดการใช้งาน</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 text-center mt-5 flex justify-content-between">
                    <Button label="ยกเลิก" class="p-button-secondary w-full mr-3" @click="closeAddModal" />
                    <Button label="บันทึกข้อมูล" class="ml-3 p-button-info w-full" @click="closeAddModal" />
                </div>
            </form>
        </Dialog>
        <!-- End Add Dialog -->
        <!-- EDIT Dialog -->
        <Dialog header="แก้ไขข้อมูลฮอร์โมน" v-model:visible="displayEditModal" :style="{ width: '50vw' }" :modal="true">
            <form class="grid mt-2">
                <div class="col-12 lg:col-12">
                    <div class="formgrid grid">
                        <div class="field col-12 sm:col-12">
                            <label class="block text-600 text-sm font-bold mb-2">
                                รหัส</label>
                            <InputText type="text" class="w-full" />
                        </div>
                        <div class="field col-12 sm:col-12">
                            <label class="block text-600 text-sm font-bold mb-2">
                                ข้อมูลฮอร์โมน
                            </label>
                            <InputText type="text" class="w-full" />
                        </div>
                        <div class="field col-12 sm:col-12 lg:col-12">
                            <div class="text-xl">สถานะ</div>
                            <div class="field-radiobutton">
                                <RadioButton value="1" v-model="form_data.status" />
                                <label class="mr-5">เปิดการใช้งาน</label>
                                <RadioButton value="0" v-model="form_data.status" class="ml-5" />
                                <label>ปิดการใช้งาน</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 text-center mt-5 flex justify-content-between">
                    <Button label="ยกเลิก" class="p-button-secondary w-full mr-3" @click="closeAddModal" />
                    <Button label="บันทึกข้อมูล" class="ml-3 p-button-info w-full" @click="closeAddModal" />
                </div>
            </form>
        </Dialog>
        <!-- End EDIT Dialog -->
        <!-- Start Delete Dialog -->
        <Dialog header="ตรวจสอบข้อมูล" v-model:visible="displaydelete" :style="{ width: '350px' }" :modal="true">
            <div class="confirmation-content text-center">
                <i class="pi pi-trash" style="font-size: 5rem" />
                <br>
                <span class="text-xl">คุณต้องการลบข้อมูลฮอร์โมนลำดับที่ 1 ใช่หรือไม่</span>
            </div>
            <template #footer>
                <div class="col-12 text-center flex justify-content-between">
                    <Button label="ยกเลิก" @click="closeConfirmation" class="p-button-secondary w-full mr-3" />
                    <Button label="ยืนยัน" @click="closeConfirmation" class="p-button-danger w-full ml-3" />
                </div>
            </template>
        </Dialog>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'

import PageTitle from '@/components/PageTitle.vue'

export default {
    components: {
        PageTitle
    },
    setup() {
        const breadcrumb = ref([
            { label: 'ข้อมูลพื้นฐานระบบ', to: '/user_center/dashboard' },
            { label: 'ข้อมูลฮอร์โมน', to: '' },
        ])
        const data = reactive([
            {
                "id": "1",
                "farm": "Hormone",
                "status": "ใช้งาน",
            },
        ])
        const items = ref([
            {
                label: 'ลบ',
                icon: 'pi pi-trash',
                command: () => {
                    opendisplaydelete()
                }
            },
        ]);
        const form_data = reactive({
            id: null,
            detail: null,
            status: null,
        })
        const displayAddModal = ref(false)
        const openAddModal = () => {
            displayAddModal.value = true
        };
        const closeAddModal = () => {
            displayAddModal.value = false
        };

        const displayEditModal = ref(false)
        const openEditModal = () => {
            displayEditModal.value = true
        };
        const closeEditModal = () => {
            displayEditModal.value = false
        };
        const displaydelete = ref(false)
        const opendisplaydelete = () => {
            displaydelete.value = true
        }
        const closeConfirmation = () => {
            displaydelete.value = false
        }
        const search = ref()
        return {
            data,
            search,
            items,
            breadcrumb,
            displayAddModal,
            openAddModal,
            closeAddModal,
            displayEditModal,
            openEditModal,
            closeEditModal,
            displaydelete,
            opendisplaydelete,
            closeConfirmation,
            form_data
        }
    },
}
</script>

<style>
.p-datatable .p-column-header-content {
    justify-content: center;
}
</style>