import * as React from 'react';
import { View,Text,StatusBar,Button} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AccountDetail from './AccountDetail'
import BetDetails from './BetDetails'

const Stack = createStackNavigator();

function HomeScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
            title="Go BACK"
            onPress={() => navigation.goBack()}
        />
      </View>
    );
  }
const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Account" component={AccountDetail} options={{
            transitionSpec: {
            open: config,
            close: config,
            },
        }} />
        <Stack.Screen name="Details" component={BetDetails} options={{
            transitionSpec: {
            open: config,
            close: config,
            },
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const AccApp = React$Node  => {
    return (
      <>
        <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent={true}></StatusBar>
        <App></App>
      </>
    );
  };
export default AccApp;