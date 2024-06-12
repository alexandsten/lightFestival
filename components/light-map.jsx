import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Platform, Linking } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Animated } from 'react-native';
import axios from 'axios';
import { styles } from './styles';
import { ImageBackground } from 'react-native';
import * as Location from 'expo-location'; 
import HTML from 'react-native-render-html';

export default function LightMap() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const translateY = useRef(new Animated.Value(300)).current;
  const windowWidth = useWindowDimensions().width;

  const [posts, setPosts] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [lineCoordinates, setLineCoordinates] = useState([]);

  useEffect(() => {
    // Define an async function to get user's location
    const getUserLocation = async () => {
      try {
        // Request permission to access device's location
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        // Get current location coordinates
        const location = await Location.getCurrentPositionAsync({});
        
        // Extract latitude and longitude from location object
        const { latitude, longitude } = location.coords;

        // Set userLocation state with current coordinates
        setUserLocation({ latitude, longitude });
      } catch (error) {
        console.error('Error getting user location:', error);
      }
    };

    // Call the function to get user's location
    getUserLocation();
  }, []);

  useEffect(() => {
    // Fetch WordPress posts
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://nobelweeklights.se/wp-json/wp/v2/installation?categories=55&_fields[]=artwork_name&_fields[]=artwork_description&_fields[]=location&_fields[]=location_lat&_fields[]=location_longitude&_fields[]=artwork_photo&_fields[]=artist_name&per_page=17');
        setPosts(response.data);
        
        // Transform posts into marker objects
        const transformedMarkers = response.data.map(post => ({
          title: post.artwork_name,
          picture: post.artwork_photo,
          description: post.artwork_description,
          artist: post.artist_name,
          location: post.location,
          coordinate: {
            latitude: parseFloat(post.location_lat), // Assuming location_lat is a string representing latitude
            longitude: parseFloat(post.location_longitude), // Assuming artwork_long is a string representing longitude
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

  useEffect(() => {
    if (isVisible) {
      Animated.timing(
        translateY,
        {
          toValue: 20, // Final position where you want it to appear from the bottom
          duration: 250, // Duration of the animation in milliseconds
          useNativeDriver: true // This improves animation performance
        }
      ).start();
    } else {
      Animated.timing(
        translateY,
        {
          toValue: 300, // Return to initial position below the screen
          duration: 150, // Duration of the animation in milliseconds
          useNativeDriver: true // This improves animation performance
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
            title={marker.title}
            description="Custom description here"
            image={require('../img/New_pin_2x.png')}
            onPress={() => handleMarkerPress(marker)}
          />
        ))}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Your Location"
            description="You are here"
          />
        )}
        {lineCoordinates.length > 0 && (
          <Polyline
            coordinates={lineCoordinates}
            strokeColor="#FF0000"
            strokeWidth={2}
          />
        )}
      </MapView>
      {!selectedMarker && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type here..."
            // Add any additional props or event handlers as needed
          />
        </View>
      )}
      {selectedMarker && (
        <Animated.View style={[
          styles.selectedMarkerContainer,
          { transform: [{ translateY }] }
        ]}>
          <TouchableOpacity  style={styles.columnContainer}>
            <ImageBackground
              source={{ uri: selectedMarker.picture }}
              style={styles.columnContainerPicture}
              resizeMode="cover"
            >
              <TouchableOpacity  style={styles.pictureContainerElements}>
                <Text style={styles.selectedMarkerTitle}>
                  {`${selectedMarker.title}`}
                </Text>
                <Text style={styles.selectedMarkerText}>
                  {`${selectedMarker.artist}`}
                </Text>
                <Text style={styles.selectedMarkerText}>
                  {`${selectedMarker.location}`}
                </Text>
              </TouchableOpacity>
            </ImageBackground>
             <View style={styles.descriptionContainer}>
            
              <HTML
                contentWidth={windowWidth}
                source={{ 
                  html: `<div style="color: white; min-height: 50px; max-height: 50px; overflow: hidden;">${selectedMarker.description}</div>` 
                }}
                tagsStyles={{ p: { margin: 0, padding: 0 } }}
              />

      
            </View>
            
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseButtonPress} style={styles.readMoreButton}>
            <Text style={styles.closeButtonText}>Read More</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenMapForDirections} style={styles.lineButton}>
            <Text style={styles.lineText}>Find way</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseButtonPress} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}
