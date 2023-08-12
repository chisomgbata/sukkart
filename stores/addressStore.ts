interface Address {
  id: number;
  phoneNumber: string;
  lodge: string;
  area: string;
}

export const useAddressStore = defineStore("AddressStore", () => {
  const addresses = ref<Address[]>([]);

  const selectedAddress = ref<Address>(addresses.value[0]);

  const fetchAddresses = async () => {
    const { data } = await useFetch(`/api/addresses`, {});
    if (!data.value) return;
    addresses.value = data.value;
    selectedAddress.value = addresses.value[0];
  };
  
  const addAddress = async (address: Omit<Address, "id">) => {
    const response = await $fetch(`/api/addresses`, {
      method: "POST",
      body: address,
    });
    if (response) {
      addresses.value.push(response);
    }
    selectedAddress.value = response;
    return response;
  };

  return {
    addresses,
    fetchAddresses,
    addAddress,
    selectedAddress,
  };
});
