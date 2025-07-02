import { createPinia } from 'pinia'
import { PiniaStoreHelper } from '../../helpers/utils/pinia/piniaHelper.ts'
import type { App } from 'vue'

// Create Pinia instance
const pinia = createPinia()

pinia.use((context) => {
  const storeID = context.store.$id
  console.log('Pinia store id : ' + storeID)

  // switch (storeID) {
  //   case 'userdetails':
  //     let fromLocalAuthStorage = PiniaStoreHelper.getDataFromLocalStore(storeID)
  //     if (fromLocalAuthStorage) {
  //       context.store.$patch(fromLocalAuthStorage)
  //     }
  //     // listen to changes and update local storage
  //     PiniaStoreHelper.syncDataToLocalStore(context, storeID)
  //   // case 'globalStore':
  //   //   let fromLocalGlobalStorage = PiniaStoreHelper.getDataFromLocalStore(storeID)
  //   //   if (fromLocalGlobalStorage) {
  //   //     context.store.$patch(fromLocalGlobalStorage)
  //   //   }
  //   //   // listen to changes and update local storage
  //   //   PiniaStoreHelper.syncDataToLocalStore(context, storeID)
  //   break
  // }
})

// Plugin function to register Pinia
export default function installPinia(app: App) {
  app.use(pinia)
}
