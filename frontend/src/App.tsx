import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import AuthProvider from './contexts/AuthContext';
import AppRouter from './routers/AppRouter';

const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      body: {
        fontFamily: 'body',
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('gray.50', 'gray.900')(props),
        lineHeight: 'base',
      },
    }),
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
