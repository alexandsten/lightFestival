import React, { useState, useRef, useEffect  } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Animated } from 'react-native';
import axios from 'axios';

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
          duration: 250, // Duration of the animation in milliseconds
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
    setSelectedMarker(null);
    toggleVisibility()
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
          <View style={styles.columnContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.selectedMarkerTitle}>
                {`Selected Marker: ${selectedMarker.title}`}
              </Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.selectedMarkerText}>
                {`Description: ${selectedMarker.description}`}
              </Text>
            </View>
          </View>
         
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

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(28, 27, 31, 0.55)',
    borderRadius: 15,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    color: 'white',
    borderRadius: 15,
  },
  selectedMarkerContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(28, 27, 31, 0.8)',
    borderRadius: 15,
    padding: 15, // Increase the padding for more height
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 80,
  },
  selectedMarkerTitle: {
    color: 'white',
    flex: 1, // Allow text to take available space
    fontSize: 22
  },
  selectedMarkerText: {
    color: 'white',
    flex: 1, // Allow text to take available space
  },
  closeButton: {
    position: 'absolute',
    bottom: 5,
    right: 15, // Optionally set it to the right if needed
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
  },  
  readMoreButton: {
    position: 'absolute',
    bottom: 5,
    right: 205, // Optionally set it to the right if needed
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
  },  
  closeButtonText: {
    color: 'white',
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionContainer: {
    backgroundColor: '#383838', // Background color for the description
    padding: 10, // Add padding for some spacing
  },
  titleContainer: {
    height: 50, // Fixed height for the title
    backgroundColor: '#29234a', // Unique background color for the title
    justifyContent: 'center', // Align text vertically in the center
    paddingHorizontal: 10, // Add padding horizontally for some spacing
  },

});
