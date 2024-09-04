import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Platform, Linking, ScrollView, Image, Pressable, FlatList } from 'react-native';
import MapView, { Marker, Polyline, UrlTile } from 'react-native-maps';
import { Animated } from 'react-native';
import axios from 'axios';
import { styles } from './styles';
import { ImageBackground } from 'react-native';
import * as Location from 'expo-location'; 
import HTML from 'react-native-render-html';
import Logo from '../img/LOGO_2_ROW.png';
import Burger from '../img/hamburger-menu.png';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

Font.loadAsync({
  'AlfredSans-Regular': require('../assets/fonts/AlfredSans-Regular.ttf'),
});


export default function ArtWorkDrawer({selectedMarker, setSelectedMarker, isVisible, isReadMore, setReadMore, menuDrawer,  userLocation , setIsVisible}) {
//   const [selectedMarker, setSelectedMarker] = useState(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const [isReadMore, setReadMore] = useState(false);
//   const [menuDrawer, setMenuDrawer] = useState(false);
//   const [isDrawerVisible, setDrawerIsVisible] = useState(false);
  const translateY = useRef(new Animated.Value(300)).current;
  const windowWidth = useWindowDimensions().width;



  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'AlfredSans-Regular': require('../assets/fonts/AlfredSans-Regular.ttf'),
      });
    }
    loadFonts();
  }, []);

  const openBooking = () => {
    Linking.openURL('https://nobelweeklights.se/?lang=en');
  };


  const readMore = () => {
    setReadMore(!isReadMore);
  };

  useEffect(() => {
    let toValue;
    let duration;

    if (menuDrawer) {
      toValue = 30;
      duration = 200;
    } else if (isVisible) {
      toValue = 20;
      duration = 250;
    } else {
      toValue = 300;
      duration = 150;
    }

    Animated.timing(translateY, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  }, [isVisible, menuDrawer]);


//   const handleMarkerPress = (marker) => {
//     setSelectedMarker(marker);
//     setIsVisible(true);
//   };
const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleCloseButtonPress = () => {
    toggleVisibility();
    setTimeout(() => {
      setSelectedMarker(null);
      setReadMore(false)
    }, 200);
  };

  const handleOpenMapForDirections = () => {
    if (selectedMarker && userLocation) {
      const userLatitude = userLocation.latitude;
      const userLongitude = userLocation.longitude;
      const markerLatitude = selectedMarker.coordinate.latitude;
      const markerLongitude = selectedMarker.coordinate.longitude;

      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLatitude},${userLongitude}&destination=${markerLatitude},${markerLongitude}&travelmode=driving`;
      const appleMapsUrl = `http://maps.apple.com/?saddr=${userLatitude},${userLongitude}&daddr=${markerLatitude},${markerLongitude}&dirflg=d`;

      const url = Platform.OS === 'ios' ? appleMapsUrl : googleMapsUrl;
      Linking.openURL(url);
    }
    handleCloseButtonPress();
  };

  

  return (
    <>
      
     
      {selectedMarker && (        
        <Animated.View style={[
          styles.selectedMarkerContainer,
          { transform: [{ translateY }] }
        ]}>
          <View activeOpacity={1} style={isReadMore ? styles.readMoreContainer : styles.columnContainer}>
            
            <ImageBackground
              source={{ uri: selectedMarker.picture }}
              style={styles.columnContainerPicture}
              resizeMode="cover"
            >
              <LinearGradient
                  colors={['transparent', 'black']}
                  style={StyleSheet.absoluteFill}
                />
              <View activeOpacity={1} style={styles.pictureContainerElements}>
                <Text style={styles.selectedMarkerTitle}>
                  {selectedMarker.title}
                </Text>
                <Text style={styles.selectedMarkerText}>
                  {selectedMarker.artist}
                </Text>
                <Text style={styles.selectedMarkerText}>
                  {selectedMarker.location}
                </Text>
              </View>
              
            </ImageBackground>
            { selectedMarker.isEvent && isReadMore && (
                <View style={styles.bookingContainer}>
                  <TouchableOpacity onPress={openBooking} style={styles.bookingButton}>
                    <Text style={styles.selectedMarkerText}>Book now</Text>
                  </TouchableOpacity>
                </View>        
                )
            }
            {isReadMore ? (
              <View style={styles.readMoreDescriptionContainer}>
               
                <ScrollView contentContainerStyle={styles.scrollContent}>
                  <HTML
                    contentWidth={windowWidth}
                    source={{ html: `<div style="color: white; font-family: 'AlfredSans-Regular'; ">${selectedMarker.description}</div>` }}
                    tagsStyles={{ p: { margin: 5, padding: 5, marginTop: 0, paddingTop: 0 } }}
                  />
                </ScrollView>
              </View>
            ) : (
              <View style={styles.descriptionContainer}>
              
                <ScrollView contentContainerStyle={styles.scrollContent}>
                  
                  <HTML
                    contentWidth={windowWidth}
                    source={{ html: `<div style="color: white;">${selectedMarker.description}</div>` }}
                    tagsStyles={{ p: { margin: 5, padding: 5, marginTop: 0, paddingTop: 0 } }}
                  />
                </ScrollView>
              </View>
            )}
          </View>
          
          <TouchableOpacity onPress={readMore} style={styles.readMoreButton}>
            <Text style={styles.closeButtonText}>Expand</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenMapForDirections} style={styles.lineButton}>
            <Text style={styles.lineText}>Directions</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseButtonPress} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
}