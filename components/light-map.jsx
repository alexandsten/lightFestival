import React, { useState, useRef, useEffect  } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Animated } from 'react-native';
import axios from 'axios';
import { styles } from './styles';
import { ImageBackground } from 'react-native';

export default function LightMap() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const translateY = useRef(new Animated.Value(300)).current;

    const [posts, setPosts] = useState([]);

    const [markers, setMarkers] = useState([]);

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
    toggleVisibility()
  };

  const handleCloseButtonPress = () => {
    toggleVisibility() 
    setTimeout(() => {
      setSelectedMarker(null); 
    }, 200);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
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
            image={require('../img/marker2.png')}
            onPress={() => handleMarkerPress(marker)}
          />
        ))}
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
          <ImageBackground
              source={{ uri: selectedMarker.picture }}
              style={styles.columnContainer}
              resizeMode="cover"
            >
       
              <Text style={styles.selectedMarkerTitle}>
                {`${selectedMarker.title}`}
              </Text>
           
            <View style={styles.descriptionContainer}>
              <Text style={styles.selectedMarkerText}>
                {`${selectedMarker.description}`}
              </Text>
            </View>
          </ImageBackground>
         
          <TouchableOpacity onPress={handleCloseButtonPress} style={styles.readMoreButton}>
            <Text style={styles.closeButtonText}>Read More</Text>
          </TouchableOpacity>
            <TouchableOpacity onPress={handleCloseButtonPress} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
         
          
        </Animated.View>
        
      )}
    </View>
  );
}