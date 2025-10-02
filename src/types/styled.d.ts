import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    selectedProfile: 'RD' | 'AD';
  }
}