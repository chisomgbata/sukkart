<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from "@headlessui/vue";
const addressStore = useAddressStore();
await addressStore.fetchAddresses();
const addresses = computed(() => addressStore.addresses);
</script>

<template>
  <div class="w-full py-6">
    <RadioGroup v-model="useAddressStore().selectedAddress">
      <RadioGroupLabel class="sr-only">Address</RadioGroupLabel>
      <div class="space-y-2">
        <RadioGroupOption
          as="template"
          v-for="address in addresses"
          :key="address.id"
          :value="address"
          v-slot="{ active, checked }"
        >
          <div
            :class="[
              active
                ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-orange-300'
                : '',
              checked
                ? 'bg-orange-600 bg-opacity-75 text-white '
                : 'bg-white  ',
            ]"
            class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"
          >
            <div class="flex w-full items-center justify-between">
              <div class="flex items-center">
                <div class="text-sm">
                  <RadioGroupLabel
                    as="p"
                    :class="checked ? 'text-white' : 'text-gray-900 '"
                    class="font-medium"
                  >
                    {{ address.lodge }}
                  </RadioGroupLabel>
                  <RadioGroupDescription
                    as="span"
                    :class="checked ? 'text-orange-100' : 'text-gray-500'"
                    class="inline"
                  >
                    <span> {{ address.area }}</span>
                    <span aria-hidden="true"> &middot; </span>
                    <span>{{ address.phoneNumber }}</span>
                  </RadioGroupDescription>
                </div>
              </div>
              <div v-show="checked" class="shrink-0 text-white">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="12"
                    fill="#fff"
                    fill-opacity="0.2"
                  />
                  <path
                    d="M7 13l3 3 7-7"
                    stroke="#fff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>

    <!-- add address button -->
    <AtomsAddAddress />
  </div>
</template>
