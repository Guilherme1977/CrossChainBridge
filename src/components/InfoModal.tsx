import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../stores';
import { useEffect } from 'react';
import { InfoNew, InfoNew2 } from './InfoNew';

export const InfoModal = observer(() => {
  const { user, exchange, actionModals } = useStores();

  useEffect(() => {
    exchange.getConfig();
  }, []);

  useEffect(() => {
    if (!user.isInfoNewReading) {
      actionModals.open(() => <InfoNew2 title="Important Notice" />, {
        title: 'Important Notice',
        applyText: 'Got it',
        closeText: '',
        noValidation: true,
        width: '800px',
        showOther: true,
        onApply: () => {
          user.setInfoNewReading();
          return Promise.resolve();
        },
      });
    }
  }, [user.isInfoNewReading]);

  return <></>;
});
