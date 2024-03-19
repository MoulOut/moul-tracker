import { INotificacao, TipoNotificacao } from '@/interface/INotificacao';
import { NOTIFICAR } from '@/store/tipo-mutations';
import { store } from '@/store';

export const notificacaoMixin = {
  methods: {
    notificar(tipo: TipoNotificacao, titulo: string, texto: string): void {
      store.commit(NOTIFICAR, {
        titulo,
        texto,
        tipo,
      } as INotificacao);
    },
  },
};
