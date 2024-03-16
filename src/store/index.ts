import IProjeto from '@/interface/IProjeto';
import { InjectionKey } from 'vue';
import { Store, createStore } from 'vuex';

interface Estado {
  projetos: IProjeto[];
}

export const storeKey: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projetos: [
      {
        id: new Date().toISOString(),
        nome: 'Vue',
      },
      {
        id: new Date().toISOString(),
        nome: 'TS',
      },
      {
        id: new Date().toISOString(),
        nome: 'Front-End',
      },
    ],
  },
});
