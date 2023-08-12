<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const { addAddress } = useAddressStore();

const isOpen = ref(false);

const formData = ref({
  lodge: "",
  phoneNumber: "",
  area: "",
});

const add = async () => {
  const valid = addressCheck.safeParse(formData.value);
  if (!valid.success) {
    console.error(valid.error);
    return;
  }

  const addedAddress = await addAddress(valid.data);
  if (addedAddress) {
    isOpen.value = false;
    formData.value = {
      lodge: "",
      phoneNumber: "",
      area: "",
    };
    useAddressStore().selectedAddress = addedAddress;
  }
};
</script>

<template>
  <div class="mt-4">
    <button
      type="button"
      @click="isOpen = true"
      class="py-2 text-orange-600 font-medium"
    >
      Add Address
    </button>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="isOpen = false" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>
        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Add Address
                </DialogTitle>
                <div class="mt-2">
                  <form @submit.prevent="add" class="flex flex-col gap-4">
                    <select
                      v-model="formData.area"
                      class="w-full rounded-lg"
                      placeholder="Area"
                    >
                      <option value="hilltop">Hilltop</option>
                      <option value="odenigwe">Odenigwe</option>
                      <option value="inside_school">Inside School</option>
                      <option value="behind_flat">Behind Flat</option>
                      <option value="odim">Odim</option>
                      <option value="green_house">Green House</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Lodge or Hostel"
                      v-model="formData.lodge"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      v-model="formData.phoneNumber"
                    />
                    <div class="mt-4">
                      <button
                        type="submit"
                        class="inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
