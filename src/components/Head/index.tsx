import * as React from 'react';
import styled, { withTheme } from 'styled-components';
import { Box, BoxProps, Text } from 'grommet';
import { useHistory } from 'react-router';
import { observer } from 'mobx-react-lite';
import { IStyledChildrenProps } from 'interfaces';
import { Title } from '../Base/components/Title';
import { useStores } from '../../stores';
import * as styles from './styles.styl';
import cn from 'classnames';
import { TOKEN } from '../../stores/interfaces';
import { useMediaQuery } from 'react-responsive';

const MainLogo = styled.img`
  width: auto;
  height: 32px;
  margin-bottom: 4px;
`;

export const Head: React.FC<IStyledChildrenProps<BoxProps>> = withTheme(
  observer(({ theme, ...props }: IStyledChildrenProps<BoxProps>) => {
    const history = useHistory();
    const { routing, user, exchange, actionModals } = useStores();
    const { palette, container } = theme;
    const { minWidth, maxWidth } = container;

    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

    const isExplorer = history.location.pathname === '/explorer';
    const isTokens = history.location.pathname === '/tokens';
    const isGetTokens = history.location.pathname === '/get-tokens';
    const isFaq = history.location.pathname === '/faq';
    const isInfo = history.location.pathname === '/info';

    const goToBridge = () => {
      if (exchange.operation && exchange.operation.id) {
        routing.push(
          `/${exchange.token || TOKEN.BUSD}/operations/${
            exchange.operation.id
          }`,
        );
      } else {
        routing.push(`/${exchange.token || TOKEN.BUSD}`);
      }
    };

    return (
      <Box
        style={{
          background: palette.StandardWhite,
          overflow: 'visible',
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: 100,
        }}
      >
        <Box
          direction={isMobile ? 'column' : 'row'}
          align="center"
          justify="between"
          style={{
            minWidth,
            maxWidth,
            margin: '0 auto',
            padding: isMobile ? '0px' : '0px 30px',
            height: isMobile ? 'auto' : 100,
            minHeight: 100,
            width: '100%',
          }}
        >
          <Box
            direction="row"
            align="center"
            margin={{ vertical: isMobile ? '15px' : '0px' }}
          >
            <Box
              align="center"
              margin={{ right: 'small' }}
              onClick={goToBridge}
            >
              <MainLogo src="/one.svg" />
            </Box>
            <Box>
              <Title size={isMobile ? 'small' : 'medium'} color="BlackTxt" bold>
                Endless by Harmony
              </Title>
            </Box>
          </Box>

          <Box
            direction="row"
            align="center"
            gap={isMobile ? '10px' : '15px'}
            margin={{ bottom: isMobile ? '10px' : '0px' }}
          >

            <Box
              className={cn(
                styles.itemToken,
                !isInfo && !isFaq && !isExplorer && !isGetTokens && !isTokens
                  ? styles.selected
                  : '',
              )}
              onClick={goToBridge}
            >
              <Text>Crosschain</Text> 
            </Box>

          </Box>
        </Box>
      </Box>
    );
  }),
);
