import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { Provider as ProviderPaper } from 'react-native-paper'
import store from './store';
import NavigationApp from './src/components/NavigationApp';

export default function App() {
      return (
        <Provider store={store}>
            <ProviderPaper>
                <NavigationApp/>
            </ProviderPaper>
        </Provider>
      )
}
