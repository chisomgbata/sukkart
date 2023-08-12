<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  name: string;
  placeholder: string;
  icon: string;
  type: string;
}>();
const emit = defineEmits(["update:modelValue"]);
const updateValue = (value: string) => {
  emit("update:modelValue", value);
};
</script>

<template>
  <div class="mx-4">
    <div
      class="rounded-lg border-gray border-2 w-full pl-4 flex gap-3 items-center"
    >
      <Icon :name="icon" class="w-5 h-5" />

      <input
        :name="name"
        :value="modelValue"
        @input="updateValue(($event.target as HTMLInputElement).value)"
        :type="type"
        :placeholder="placeholder"
        class="placeholder-gray outline-none pr-4 py-3 w-full rounded-lg bg-transparent"
      />
    </div>
  </div>
</template>
