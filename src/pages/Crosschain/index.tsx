import * as React from 'react';
import { useEffect } from 'react';
import { Box } from 'grommet';
import { BaseContainer, PageContainer } from 'components';
import { observer } from 'mobx-react-lite';
import { useStores } from 'stores';
import * as styles from './styles.styl';
import { Exchange } from '../Exchange';
import { EXCHANGE_MODE, NETWORK_TYPE, TOKEN } from 'stores/interfaces';
import cn from 'classnames';
import { Button, Text } from 'components/Base';
import { WalletBalances } from './WalletBalances';
import { NETWORK_ICON, NETWORK_NAME } from '../../stores/names';
// import { ERC20Select } from '../Exchange/ERC20Select';
import { useMediaQuery } from 'react-responsive';

const ExchangeTitleContainer = observer(
  () => {
    const { exchange } = useStores();

    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

    return (
      <Box
        direction="column"
        align="center"
        justify="center"
        className={cn(
          styles.exchangeTitleContainer,
          styles.active,
          isMobile ? styles.mobile : '',
        )}
        gap="10px"
      >
        {exchange.network === NETWORK_TYPE.BINANCE ? (
          <>
          <Box direction="row" align="center">
            <Box direction="row" align="center">
              <img
                className={styles.imgToken}
                src={'binance.png'} />
              <Text size="large" className={styles.title}>
                {'Binance'}
              </Text>
            </Box>
            <Box direction="row" margin={{ horizontal: 'medium' }} align="center">
              <img src="/right.svg" />
            </Box>
            <Box direction="row" align="center">
              <img className={styles.imgToken} src="/eth.svg" />
              <Text size="large" className={styles.title}>   
                ETH 
              </Text>
            </Box>
          </Box><Text size="xsmall" color="#748695" className={styles.description}>
              {/*'(Metamask)'*/}
          </Text>
          </>

        ) : (   
          <>
          <Box direction="row" align="center">
            <Box direction="row" align="center">
              <img
                className={styles.imgToken}
                src="/eth.svg" />
              <Text size="large" className={styles.title}>
                ETH
              </Text>
            </Box>
            <Box direction="row" margin={{ horizontal: 'medium' }} align="center">
              <img src="/right.svg" />
            </Box>
            <Box direction="row" align="center">
              <img className={styles.imgToken} src={'binance.png'} />
              <Text size="large" className={styles.title}>
              {'Binance'}
              </Text>
            </Box>
          </Box><Text size="xsmall" color="#748695" className={styles.description}>
              {/*'(Metamask)'*/}
          </Text>
          </>
        )}
      </Box>
    );
  },
);

const NetworkButton = observer(({ type }: { type: NETWORK_TYPE }) => {
  const { exchange } = useStores();

  return (
    <Button
      className={cn()}
      style={{
        background: 'white',
        border:
          exchange.network === type
            ? '2px solid #00ADE8'
            : '2px solid rgba(0,0,0,0)',
        color: '#212e5e',
      }}
      onClick={() => {
        exchange.setNetwork(type);
        exchange.setMode(type === NETWORK_TYPE.BINANCE ? 
          EXCHANGE_MODE.BNB_TO_ETH : EXCHANGE_MODE.ETH_TO_BNB);
      }}
    >
      <img style={{ marginRight: 10, height: 20 }} src={NETWORK_ICON[type]} />
      {NETWORK_NAME[type]}
    </Button>
  );
});

export const Crosschain = observer((props: any) => {
  const { user, exchange, routing, userMetamask, tokens } = useStores();
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  useEffect(() => {
    tokens.init();
    tokens.fetch();
  }, []);

  useEffect(() => {
    if (props.match.params.token) {
      if (
        [
         // TOKEN.LINK,
          TOKEN.BUSD,
         // TOKEN.ERC20,
         // TOKEN.ETH,
        //  TOKEN.ERC721,
         // TOKEN.HRC20,
         // TOKEN.ONE,
        ].includes(props.match.params.token)
      ) {
        exchange.setToken(props.match.params.token);
        if (TOKEN.ETH === props.match.params.token) {
          user.setHRC20Token(process.env.ETH_HRC20);
          userMetamask.setTokenDetails({
            name: 'ETH',
            decimals: '18',
            erc20Address: '',
            symbol: 'ETH',
          });
        }
      } else {
        routing.push(TOKEN.BUSD);
      }
    }

    if (props.match.params.operationId) {
      exchange.setOperationId(props.match.params.operationId);
      exchange.sendOperation(props.match.params.operationId);
    }
  }, []);

  useEffect(() => {
    tokens.init();
    tokens.fetch();
  }, []);

  if (isMobile) {
    return (
      <BaseContainer>
        <PageContainer>
          <Box direction="column">
            <Box direction="column" margin={{ top: 'large' }}>
              {<Box direction="row" justify="start" gap="20px">
                <NetworkButton type={NETWORK_TYPE.BINANCE} />
                <NetworkButton type={NETWORK_TYPE.ETHEREUM} />
            </Box>}

              <WalletBalances />

              <Box
                direction="column"
                align="center"
                justify="center"
                className={styles.base}
              >
                <Box
                  direction="row"
                  justify="between"
                  width="560px"
                  margin={{ vertical: 'large' }}
                  wrap={true}
                >
                  <ExchangeTitleContainer />
                </Box>
                {<Exchange />}
              </Box>
            </Box>
          </Box>
        </PageContainer>
      </BaseContainer>
    );
  }

  return (
    <BaseContainer>
      <PageContainer>
        <Box
          direction="row"
          wrap={true}
          fill={true}
          justify="between"
          align="start"
        >
          <Box
            direction="column"
            align="center"
            justify="center"
            className={styles.base}
          >
  
            <Box
              direction="row"
              justify="between"
              width="560px"
              margin={{ vertical: 'large' }}
            >
              <ExchangeTitleContainer />
            </Box>

            <Exchange />

          </Box>

          <Box direction="column" margin={{ top: 'large' }}>
            {<Box direction="row" justify="start" gap="20px">
              <NetworkButton type={NETWORK_TYPE.ETHEREUM} />
              <NetworkButton type={NETWORK_TYPE.BINANCE} />
            </Box>}
            <WalletBalances />
          </Box>
        </Box>
      </PageContainer>
    </BaseContainer>
  );
});
