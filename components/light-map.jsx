import React, { useState, useRef, useEffect } from 'react';
import { View, Text,  TouchableOpacity, useWindowDimensions, Platform, Linking,  Image, } from 'react-native';
import MapView, { Marker, Polyline, UrlTile } from 'react-native-maps';
import { Animated } from 'react-native';
import axios from 'axios';
import { styles } from './styles';
import * as Location from 'expo-location'; 
import Logo from '../img/LOGO_2_ROW.png';
import Burger from '../img/hamburger-menu.png';
import * as Font from 'expo-font';
import ArtWorkDrawer from './artwork-drawer';

Font.loadAsync({
  'AlfredSans-Regular': require('../assets/fonts/AlfredSans-Regular.ttf'),
});


export default function LightMap() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReadMore, setReadMore] = useState(false);
  const [menuDrawer, setMenuDrawer] = useState(false);
  const [isDrawerVisible, setDrawerIsVisible] = useState(false);
  const translateY = useRef(new Animated.Value(300)).current;
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const timerRef = useRef(null);
  const [artworks, setArtworks] = useState([]);
  const [events, setEvents] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [eventMarkers, setEventMarkers] = useState([]);
  const [lineCoordinates, setLineCoordinates] = useState([]);

  const dummyItems = ['NOBEL ITEM 1', 'NOBEL ITEM 2', 'NOBEL ITEM 3', 'NOBEL ITEM 4', 'NOBEL ITEM 5'];


  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'AlfredSans-Regular': require('../assets/fonts/AlfredSans-Regular.ttf'),
      });
    }
    loadFonts();
  }, []);


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
    const fetchArtworks = async () => {
      try {
        const response = await axios.get('https://nobelweeklights.se/wp-json/wp/v2/installation?categories=55&_fields[]=artwork_name&_fields[]=artwork_description&_fields[]=location&_fields[]=location_lat&_fields[]=location_longitude&_fields[]=artwork_photo&_fields[]=artist_name&per_page=17');
        setArtworks(response.data);
        
        const transformedMarkers = response.data.map(artworks => ({
          title: artworks.artwork_name,
          picture: artworks.artwork_photo,
          description: artworks.artwork_description,
          artist: artworks.artist_name,
          location: artworks.location,
          coordinate: {
            latitude: parseFloat(artworks.location_lat),
            longitude: parseFloat(artworks.location_longitude),
          }
          ,
          isEvent: false
        }));
        
        setMarkers(transformedMarkers);
      } catch (error) {
        console.error('Error fetching WordPress artworkss:', error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://nobelweeklights.se/wp-json/wp/v2/events_map?categories=64&_fields[]=event_name&_fields[]=event_description&_fields[]=event_image&_fields[]=event_time&_fields[]=event_location&_fields[]=location_lat&_fields[]=location_long');
        setEvents(response.data);
        
        const transformedMarkers = response.data.map(event => ({
          title: event.event_name,
          picture: event.event_image.guid,
          description: event.event_description,
          artist: event.event_time,
          location: event.event_location,
          coordinate: {
            latitude: parseFloat(event.location_lat),
            longitude: parseFloat(event.location_long),
          },
          isEvent: true
        }));
        
        setEventMarkers(transformedMarkers);
      } catch (error) {
        console.error('Error fetching WordPress posts:', error);
      }
    }
    fetchArtworks();
    fetchEvents();
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const toggleMenuDrawer = () => {
      setMenuDrawer(!menuDrawer); 
      if (!isDrawerVisible) {
        setDrawerIsVisible(true)
      } else {
        setTimeout(() => {
          setDrawerIsVisible(false)
        }, 200);
      }
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

  return (
    <View style={styles.container}>
      <MapView
        onPress={handleCloseButtonPress}
        style={styles.map}
        showsUserLocation={true} 
        initialRegion={{
          latitude: 59.3293,
          longitude: 18.0686,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        mapType="none" 
      >  
          <UrlTile
            urlTemplate="https://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            maximumZ={19}
          />
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
         {eventMarkers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            image={require('../img/marker2.png')}
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
      {!selectedMarker && !isDrawerVisible && (       
      <View style={styles.bottomMenuContainer}>
        <View style={styles.bottomMenu}>
          <Image source={Logo} style={styles.logo} />
          <TouchableOpacity onPress={toggleMenuDrawer} style={styles.touchableBurger}>
            <Image source={Burger} style={styles.burger} />
          </TouchableOpacity>
        </View>
      </View>
      )}
      {isDrawerVisible && (
        <Animated.View style={[
          styles.menuContainer
        ]}>
         {/* ,
         { transform: [{ translateY }] } */}
             {dummyItems.map((item, index) => (
              <TouchableOpacity onPress={toggleMenuDrawer} style={styles.menuContainerListItem}>
                <Text key={index} style={styles.openDrawerText}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={toggleMenuDrawer} style={styles.closeDrawerButton}>
              <Text style={styles.closeButtonTextLarge}>X</Text>
            </TouchableOpacity>
         
        </Animated.View>
      )}
      <ArtWorkDrawer selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} isVisible={isVisible} isReadMore={isReadMore} setReadMore={setReadMore} menuDrawer={menuDrawer} userLocation={userLocation} setIsVisible={setIsVisible} />
      
    </View>
  );
}