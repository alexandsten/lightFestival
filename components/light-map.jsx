import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Platform, Linking, ScrollView, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Animated } from 'react-native';
import axios from 'axios';
import { styles } from './styles';
import { ImageBackground } from 'react-native';
import * as Location from 'expo-location'; 
import HTML from 'react-native-render-html';
import Logo from '../img/LOGO_2_ROW.png';
import Burger from '../img/hamburger-menu.png';

export default function LightMap() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReadMore, setReadMore] = useState(false);
  const translateY = useRef(new Animated.Value(300)).current;
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const [posts, setPosts] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [lineCoordinates, setLineCoordinates] = useState([]);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        setUserLocation({ latitude, longitude });
      } catch (error) {
        console.error('Error getting user location:', error);
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://nobelweeklights.se/wp-json/wp/v2/installation?categories=55&_fields[]=artwork_name&_fields[]=artwork_description&_fields[]=location&_fields[]=location_lat&_fields[]=location_longitude&_fields[]=artwork_photo&_fields[]=artist_name&per_page=17');
        setPosts(response.data);
        
        const transformedMarkers = response.data.map(post => ({
          title: post.artwork_name,
          picture: post.artwork_photo,
          description: post.artwork_description,
          artist: post.artist_name,
          location: post.location,
          coordinate: {
            latitude: parseFloat(post.location_lat),
            longitude: parseFloat(post.location_longitude),
          },
        }));
        
        setMarkers(transformedMarkers);
      } catch (error) {
        console.error('Error fetching WordPress posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const readMore = () => {
    setReadMore(!isReadMore);
  };

  useEffect(() => {
    if (isVisible) {
      Animated.timing(
        translateY,
        {
          toValue: 20,
          duration: 250,
          useNativeDriver: true,
        }
      ).start();
    } else {
      Animated.timing(
        translateY,
        {
          toValue: 300,
          duration: 150,
          useNativeDriver: true,
        }
      ).start();
    }
  }, [isVisible]);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setIsVisible(true);
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
    <View style={styles.container}>
      <MapView
        onPress={handleCloseButtonPress}
        style={styles.map}
        showsUserLocation={true} 
        initialRegion={{
          latitude: 59.3293,
          longitude: 18.0686,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            image={require('../img/Pin_Update_2x.png')}
            onPress={() => handleMarkerPress(marker)}
            calloutAnchor={{ x: 0.5, y: 0.5 }}
            calloutStyle={styles.calloutContainer}
            calloutTextStyle={styles.calloutText}
          />
        ))}
        {lineCoordinates.length > 0 && (
          <Polyline
            coordinates={lineCoordinates}
            strokeColor="#FF0000"
            strokeWidth={2}
          />
        )}
      </MapView>
      {!selectedMarker && (
      <View style={styles.bottomMenuContainer}>
        <View style={styles.bottomMenu}>
          <Image source={Logo} style={styles.logo} />
          <Image source={Burger} style={styles.burger} />
        </View>
      </View>
      )}
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

            {isReadMore ? (
              <View style={styles.readMoreDescriptionContainer}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                  <HTML
                    contentWidth={windowWidth}
                    source={{ html: `<div style="color: white;">${selectedMarker.description}</div>` }}
                    tagsStyles={{ p: { margin: 5, padding: 5 } }}
                  />
                </ScrollView>
              </View>
            ) : (
              <View style={styles.descriptionContainer}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                  <HTML
                    contentWidth={windowWidth}
                    source={{ html: `<div style="color: white;">${selectedMarker.description}</div>` }}
                    tagsStyles={{ p: { margin: 5, padding: 5 } }}
                  />
                </ScrollView>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={readMore} style={styles.readMoreButton}>
            <Text style={styles.closeButtonText}>Read More</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenMapForDirections} style={styles.lineButton}>
            <Text style={styles.lineText}>Directions</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseButtonPress} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}