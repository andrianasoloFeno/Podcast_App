import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

// Import des composants d'écran
import CustomHeader from './CustomHeader';
import SearchScreen from './src/menu/searchScreen';
import PodcastListScreen from './src/menu/PodcastlistScreen';
import ListenNowScreen from './src/menu/listenNowScreen';
import PodcastDetailsScreen from './src/menu/PodcastDetailsScreen';
import RecordAudioScreen from './src/composants/RecordAudioScreen';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PodcastList"
        screenOptions={{
          header: ({ navigation }) => (
            <CustomHeader navigation={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#007FFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="PodcastList" component={PodcastListScreen} />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerStyle: {
              backgroundColor: '#00BFFF',
            },
          }}
        />
        <Stack.Screen
          name="PodcastDetails"
          component={PodcastDetailsScreen}
        />
        <Stack.Screen
          name="ListenNow"
          component={ListenNowScreen}
          options={{
            headerStyle: {
              backgroundColor: '#00BFFF',
            },
          }}
        />
        <Stack.Screen
          name="RecordAudio"
          component={RecordAudioScreen}
          options={{
            headerStyle: {
              backgroundColor: '#00BFFF',
            },
            title: 'Record Audio', // titre de l'écran
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
