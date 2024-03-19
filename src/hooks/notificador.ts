import { INotificacao, TipoNotificacao } from '@/interface/INotificacao';
import { store } from '@/store';
import { NOTIFICAR } from '@/store/tipo-mutations';

type Notificador = {
  notificar: (tipo: TipoNotificacao, titulo: string, texto: string) => void;
};

export default (): Notificador => {
  const notificar = (
    tipo: TipoNotificacao,
    titulo: string,
    texto: string
  ): void => {
    store.commit(NOTIFICAR, {
      titulo,
      texto,
      tipo,
    } as INotificacao);
  };

  return {
    notificar,
  };
};
