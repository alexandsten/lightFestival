import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LightMap from './components/light-map';
import * as Font from 'expo-font';

Font.loadAsync({
  'AlfredSans-Regular': require('./assets/fonts/AlfredSans-Regular.ttf'),
});




export default function App() {
  
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Alfred Sans Regular': require('./assets/fonts/AlfredSans-Regular.ttf'),
      });
    }
    loadFonts();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Light festival</Text>
      <StatusBar style="auto" />
      <LightMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
