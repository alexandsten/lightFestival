import React, { useState, useRef, useEffect  } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Animated } from 'react-native';

export default function LightMap() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const translateY = useRef(new Animated.Value(300)).current;

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (isVisible) {
      Animated.timing(
        translateY,
        {
          toValue: 20, // Final position where you want it to appear from the bottom
          duration: 500, // Duration of the animation in milliseconds
          useNativeDriver: true // This improves animation performance
        }
      ).start();
    } else {
      Animated.timing(
        translateY,
        {
          toValue: 300, // Return to initial position below the screen
          duration: 500, // Duration of the animation in milliseconds
          useNativeDriver: true // This improves animation performance
        }
      ).start();
    }
  }, [isVisible]);

  const markers = [
    {
      title: 'Marker 1',
      picture: 'url',
      description: 'Marker 1 description: detta är en beskrivning',
      coordinate: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    },
    {
        title: 'Marker 2',
        picture: 'url',
        description: 'Marker 2 description: detta är en beskrivning',
        coordinate: {
          latitude: 37.75885,
          longitude: -122.4384,
        },
      },
      {
        title: 'Marker 3',
        picture: 'url',
        description: 'Marker 3 description: detta är en beskrivning',
        coordinate: {
          latitude: 37.78245,
          longitude: -122.4344,
        },
      },
    // Add more markers as needed
  ];

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
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
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
