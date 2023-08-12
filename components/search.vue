<script setup lang="ts">
const { search } = useSearch();
const show = useSearch().open;
let term = ref("");
let loading = ref(false);
let results = ref();
watchEffect(async () => {
  if (term.value.length < 1) {
    results.value = null;
    return;
  }
  loading.value = true;
  results.value = await search(term.value);
  loading.value = false;
});

const doneSearching = () => {
  term.value = "";
  loading.value = false;
  show.value = false;
};
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="-translate-y-full translate-x-full"
    enter-to-class="translate-y-0"
    leave-active-class="transition-all duration-500 ease-out"
    leave-from-class="translate-y-0"
    leave-to-class="-translate-y-full translate-x-full"
  >
    <div v-if="show" class="fixed inset-0 flex z-80 md:justify-end">
      <div class="md:max-w-md w-full h-full bg-white">
        <div class="flex gap-2 items-center p-2 w-full">
          <input
            :value="term"
            @input="e => term = (e.target as HTMLInputElement).value"
            autocomplete="off"
            name="search"
            placeholder="search for products"
            class="border-orange-500 border-2 appearance-none outline-none p-2 rounded-tr-xl rounded-bl-xl placeholder:text-orange-300 text-orange-400 w-full"
          />
          <div v-if="loading" class="absolute right-16">
            <Icon
              name="fontisto:spinner"
              class="animate-spin text-orange-500"
            />
          </div>

          <button
            @click="show = false"
            class="rounded-tr-xl rounded-bl-xl bg-orange-500 p-2 text-orange-100 w-10"
          >
            <Icon name="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>
        <!-- Top section demakation -->

        <div
          class="p-3 flex flex-col gap-4 absolute w-full h-full"
          v-if="results"
        >
          <div
            v-if="results.length == 0"
            class="flex flex-col justify-center px-8 py-20 gap-2 items-center"
          >
            <div class="w-2/3 opacity-50">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 647.63626 632.17383"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <path
                  d="M687.3279,276.08691H512.81813a15.01828,15.01828,0,0,0-15,15v387.85l-2,.61005-42.81006,13.11a8.00676,8.00676,0,0,1-9.98974-5.31L315.678,271.39691a8.00313,8.00313,0,0,1,5.31006-9.99l65.97022-20.2,191.25-58.54,65.96972-20.2a7.98927,7.98927,0,0,1,9.99024,5.3l32.5498,106.32Z"
                  transform="translate(-276.18187 -133.91309)"
                  fill="#f2f2f2"
                />
                <path
                  d="M725.408,274.08691l-39.23-128.14a16.99368,16.99368,0,0,0-21.23-11.28l-92.75,28.39L380.95827,221.60693l-92.75,28.4a17.0152,17.0152,0,0,0-11.28028,21.23l134.08008,437.93a17.02661,17.02661,0,0,0,16.26026,12.03,16.78926,16.78926,0,0,0,4.96972-.75l63.58008-19.46,2-.62v-2.09l-2,.61-64.16992,19.65a15.01489,15.01489,0,0,1-18.73-9.95l-134.06983-437.94a14.97935,14.97935,0,0,1,9.94971-18.73l92.75-28.4,191.24024-58.54,92.75-28.4a15.15551,15.15551,0,0,1,4.40966-.66,15.01461,15.01461,0,0,1,14.32032,10.61l39.0498,127.56.62012,2h2.08008Z"
                  transform="translate(-276.18187 -133.91309)"
                  fill="#3f3d56"
                />
                <path
                  d="M398.86279,261.73389a9.0157,9.0157,0,0,1-8.61133-6.3667l-12.88037-42.07178a8.99884,8.99884,0,0,1,5.9712-11.24023l175.939-53.86377a9.00867,9.00867,0,0,1,11.24072,5.9707l12.88037,42.07227a9.01029,9.01029,0,0,1-5.9707,11.24072L401.49219,261.33887A8.976,8.976,0,0,1,398.86279,261.73389Z"
                  transform="translate(-276.18187 -133.91309)"
                  fill="#ea580c"
                />
                <circle cx="190.15351" cy="24.95465" r="20" fill="#ea580c" />
                <circle cx="190.15351" cy="24.95465" r="12.66462" fill="#fff" />
                <path
                  d="M878.81836,716.08691h-338a8.50981,8.50981,0,0,1-8.5-8.5v-405a8.50951,8.50951,0,0,1,8.5-8.5h338a8.50982,8.50982,0,0,1,8.5,8.5v405A8.51013,8.51013,0,0,1,878.81836,716.08691Z"
                  transform="translate(-276.18187 -133.91309)"
                  fill="#e6e6e6"
                />
                <path
                  d="M723.31813,274.08691h-210.5a17.02411,17.02411,0,0,0-17,17v407.8l2-.61v-407.19a15.01828,15.01828,0,0,1,15-15H723.93825Zm183.5,0h-394a17.02411,17.02411,0,0,0-17,17v458a17.0241,17.0241,0,0,0,17,17h394a17.0241,17.0241,0,0,0,17-17v-458A17.02411,17.02411,0,0,0,906.81813,274.08691Zm15,475a15.01828,15.01828,0,0,1-15,15h-394a15.01828,15.01828,0,0,1-15-15v-458a15.01828,15.01828,0,0,1,15-15h394a15.01828,15.01828,0,0,1,15,15Z"
                  transform="translate(-276.18187 -133.91309)"
                  fill="#3f3d56"
                />
                <path
                  d="M801.81836,318.08691h-184a9.01015,9.01015,0,0,1-9-9v-44a9.01016,9.01016,0,0,1,9-9h184a9.01016,9.01016,0,0,1,9,9v44A9.01015,9.01015,0,0,1,801.81836,318.08691Z"
                  transform="translate(-276.18187 -133.91309)"
                  fill="#ea580c"
                />
                <circle cx="433.63626" cy="105.17383" r="20" fill="#ea580c" />
                <circle
                  cx="433.63626"
                  cy="105.17383"
                  r="12.18187"
                  fill="#fff"
                />
              </svg>
            </div>
            <p class="text-gray-600 text-lg mt-6">No Result Found For Search</p>
          </div>
          <div v-else class="w-full flex flex-col gap-2 mt-2">
            <NuxtLink
              @click="doneSearching"
              v-for="searchResult in results"
              class="w-full flex items-center p-3 rounded-lg bg-orange-100 text-orange-700"
              :to="`/product/${searchResult.slug}`"
            >
              <div class="w-8 h-8 bg-white rounded-lg overflow-clip">
                <NuxtImg
                  width="32"
                  height="32"
                  :src="`/images/products/${searchResult.image}`"
                  class="w-full h-full"
                  :alt="searchResult.name"
                />
              </div>
              <p class="ml-3">{{ searchResult.name }}</p>
            </NuxtLink>
          </div>
          <NuxtLink
            to="/request"
            class="text-orange-600 flex flex-col gap-2 items-center mt-auto mb-20"
            @click="doneSearching"
          >
            <span>Don't see what you're looking for?</span>
            <span
              class="bg-orange-500 rounded-tr-xl rounded-bl-xl text-orange-100 p-2"
              >Suggest a product</span
            >
          </NuxtLink>
        </div>
        <div v-else class="absolute h-60 w-full flex justify-center opacity-20">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            width="709.53268"
            height="558.59384"
            class="w-3/4"
            viewBox="0 0 709.53268 558.59384"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <rect
              x="0.27492"
              y="0.36501"
              width="643.86162"
              height="412.35762"
              fill="#e6e6e6"
            />
            <rect
              x="18.68599"
              y="52.08494"
              width="607.03947"
              height="336.24257"
              fill="#fff"
            />
            <rect width="643.86163" height="27.3536" fill="#ea580c" />
            <circle cx="20.327" cy="13.98461" r="5.06978" fill="#fff" />
            <circle cx="39.57061" cy="13.98461" r="5.06978" fill="#fff" />
            <circle cx="58.81422" cy="13.98461" r="5.06978" fill="#fff" />
            <rect
              x="73.84385"
              y="86.97284"
              width="155.98055"
              height="266.46677"
              fill="#e6e6e6"
            />
            <rect
              x="256.7496"
              y="86.97284"
              width="129.9838"
              height="73.34799"
              fill="#ea580c"
            />
            <rect
              x="256.7496"
              y="180.74686"
              width="129.9838"
              height="78.91873"
              fill="#e6e6e6"
            />
            <rect
              x="256.7496"
              y="280.09161"
              width="129.9838"
              height="73.34799"
              fill="#e6e6e6"
            />
            <rect
              x="414.58707"
              y="86.97284"
              width="155.98056"
              height="116.12476"
              fill="#e6e6e6"
            />
            <rect
              x="414.58707"
              y="237.31485"
              width="155.98056"
              height="116.12476"
              fill="#e6e6e6"
            />
            <path
              d="M755.71223,382.14309v-25a33.5,33.5,0,1,1,67,0v25a4.50508,4.50508,0,0,1-4.5,4.5h-58A4.50508,4.50508,0,0,1,755.71223,382.14309Z"
              transform="translate(-245.23366 -170.70308)"
              fill="#2f2e41"
            />
            <polygon
              points="593.514 536.786 581.698 540.056 563.462 496.038 580.901 491.212 593.514 536.786"
              fill="#ffb8b8"
            />
            <path
              d="M819.38459,708.28158h23.64387a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H804.49773a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,819.38459,708.28158Z"
              transform="translate(-406.29299 74.94457) rotate(-15.46951)"
              fill="#2f2e41"
            />
            <polygon
              points="470.328 545.875 458.068 545.875 452.235 498.587 470.33 498.587 470.328 545.875"
              fill="#ffb8b8"
            />
            <path
              d="M449.31065,542.37161h23.64387a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H434.42379a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,449.31065,542.37161Z"
              fill="#2f2e41"
            />
            <path
              d="M700.77825,452.301a10.0558,10.0558,0,0,0,15.392.91737l32.59018,14.65807L745.796,449.54488l-30.4937-11.10914a10.11028,10.11028,0,0,0-14.524,13.86524Z"
              transform="translate(-245.23366 -170.70308)"
              fill="#ffb8b8"
            />
            <path
              d="M768.49246,562.53911c-10.23925,0-20.83911-1.52539-29.74878-6.06152a38.41551,38.41551,0,0,1-19.70874-23.56543c-4.64233-14.69922,1.21094-29.14014,6.87134-43.105,3.50757-8.65381,6.82056-16.82715,7.68018-24.88379l.30029-2.86036c1.33887-12.84765,2.49512-23.94335,8.897-28.105,3.31836-2.15722,7.77979-2.28027,13.64063-.377l55.04492,17.88135-2.02393,104.49023-.33447.11182C808.82279,556.16118,789.41824,562.53911,768.49246,562.53911Z"
              transform="translate(-245.23366 -170.70308)"
              fill="#2f2e41"
            />
            <path
              d="M755.46218,401.05127s27-8,48-5c0,0-12,66-8,88s-69.5,8.5-54.5-12.5l5-25s-10-10-1-22Z"
              transform="translate(-245.23366 -170.70308)"
              fill="#ea580c"
            />
            <path
              d="M742.18192,560.55815l-33.27637-6.23926,11.61768-89.40673c.78125-2.4961,18.77807-59.14307,26.95166-62.208a139.51716,139.51716,0,0,1,18.16626-5.04688l1.18383-.23681-6.67236,10.00879-26.56445,63.65429Z"
              transform="translate(-245.23366 -170.70308)"
              fill="#2f2e41"
            />
            <path
              d="M724.84329,705.62163l-42.99487-7.16553,24.12817-98.52392,35.90332-134.73731.35425,2.39258c.02808.17822,3.38208,17.77978,53.15064,9.96973l.43774-.06836.12085.42627,60.1521,212.53759-48.99048,8.165L762.42215,543.55083Z"
              transform="translate(-245.23366 -170.70308)"
              fill="#2f2e41"
            />
            <path
              d="M784.43558,577.2896l.02685-.75635c.03-.83984,2.988-84.37256,2-117.96729-.99145-33.709,9.92188-62.90087,10.03223-63.19189l.08887-.23438.24121-.06933c14.11963-4.03369,26.3689,8.00537,26.491,8.12744l.17211.17188-4.02124,33.17626,17.21607,120.64161Z"
              transform="translate(-245.23366 -170.70308)"
              fill="#2f2e41"
            />
            <circle cx="537.09466" cy="190.79701" r="24.56103" fill="#ffb8b8" />
            <path
              d="M747.78694,359.14309a26.53,26.53,0,0,1,26.5-26.5h5.00024a26.52977,26.52977,0,0,1,26.49976,26.5v.5H795.22029l-3.604-10.09179-.7207,10.09179h-5.46094l-1.81836-5.09179-.36377,5.09179H747.78694Z"
              transform="translate(-245.23366 -170.70308)"
              fill="#2f2e41"
            />
            <path
              d="M779.91118,389.45438a4.43341,4.43341,0,0,1-.3523-4.707c5.29859-10.07813,12.71729-28.7002,2.87012-40.18457l-.70776-.8252h28.5874V386.6575l-25.96948,4.582a4.59632,4.59632,0,0,1-.79639.07032A4.48193,4.48193,0,0,1,779.91118,389.45438Z"
              transform="translate(-245.23366 -170.70308)"
              fill="#2f2e41"
            />
            <path
              d="M664.81368,212.24945a135.01972,135.01972,0,1,0,7.65509,199.4028L838.08687,551.4a12.44209,12.44209,0,0,0,16.06592-19.00287l-.01831-.01544L688.51631,392.63391A135.02729,135.02729,0,0,0,664.81368,212.24945ZM654.13692,379.17712a101.15765,101.15765,0,1,1-12.0766-142.54788l.00006,0A101.15764,101.15764,0,0,1,654.13692,379.17712Z"
              transform="translate(-245.23366 -170.70308)"
              fill="#3f3d56"
            />
            <path
              d="M511.589,391.25375a101.16315,101.16315,0,0,1-17.16559-135.989q-2.90121,2.92177-5.60938,6.1199A101.15767,101.15767,0,1,0,643.43849,391.85605q2.702-3.20224,5.089-6.559A101.163,101.163,0,0,1,511.589,391.25375Z"
              transform="translate(-245.23366 -170.70308)"
              opacity="0.3"
              style="isolation: isolate"
            />
            <path
              d="M790.214,495.239a10.05578,10.05578,0,0,0,12.42386-9.13254l34.433-9.55748L823.074,464.34553l-30.55233,10.94686A10.11027,10.11027,0,0,0,790.214,495.239Z"
              transform="translate(-245.23366 -170.70308)"
              fill="#ffb8b8"
            />
            <path
              d="M804.52567,490.18022,802.43021,470.274l28.76245-15.86914-18.75244-22.70019L815.5,406.20512l7.61987-3.26562.23707.30469c3.593,4.62011,35.10522,45.28076,35.10522,50.30713,0,5.16259-6.02856,20.32324-14.27637,24.44726-7.95581,3.978-37.83081,11.70947-39.09863,12.03711Z"
              transform="translate(-245.23366 -170.70308)"
              fill="#2f2e41"
            />
            <path
              d="M953.76634,729.29692h-381a1,1,0,1,1,0-2h381a1,1,0,0,1,0,2Z"
              transform="translate(-245.23366 -170.70308)"
              fill="#ccc"
            />
          </svg>
        </div>
      </div>
    </div>
  </Transition>
</template>
