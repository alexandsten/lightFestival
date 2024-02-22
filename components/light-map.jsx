import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function LightMap() {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const markers = [
    {
      title: 'Marker 1',
      coordinate: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    },
    {
        title: 'Marker 2',
        coordinate: {
          latitude: 37.75885,
          longitude: -122.4384,
        },
      },
      {
        title: 'Marker 3',
        coordinate: {
          latitude: 37.78245,
          longitude: -122.4344,
        },
      },
    // Add more markers as needed
  ];

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  const handleCloseButtonPress = () => {
    setSelectedMarker(null);
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
        <View style={styles.selectedMarkerContainer}>
          <Text style={styles.selectedMarkerText}>
            {`Selected Marker: ${selectedMarker.title}`}
          </Text>
          <TouchableOpacity onPress={handleCloseButtonPress} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
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
  selectedMarkerText: {
    color: 'white',
    flex: 1, // Allow text to take available space
  },
  closeButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
  },
});
