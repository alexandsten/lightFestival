
import { StyleSheet } from 'react-native';



export const styles = StyleSheet.create({
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
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pictureBackground: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(28, 27, 31, 0.8)',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedMarkerTitle: {
    color: 'white',
// Allow text to take available space
    fontSize: 22,

  },
  selectedMarkerArtist: {
    color: 'white',
  // Allow text to take available space
    fontSize: 16,

  },
  selectedMarkerLocation: {
    color: 'white',
   // Allow text to take available space
    fontSize: 16,

  },
  selectedMarkerText: {
    color: 'white', 
    display: 'flex'
  },
  closeButton: {
    position: 'absolute',
    bottom: 5,
    right: 15, // Optionally set it to the right if needed
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 24,
    width: 54,
    justifyContent: 'center', 
    alignItems: 'center',
  },  
  readMoreButton: {
    position: 'absolute',
    bottom: 5,
    right: 205, 
    padding: 10,
    backgroundColor: '#CC3366',
    borderRadius: 24,
    width: 130,
    justifyContent: 'center', 
    alignItems: 'center',
  },  
  lineButton: {
    position: 'absolute',
    bottom: 5,
    right: 90, 
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 24,
    width: 100,
    justifyContent: 'center', 
    alignItems: 'center',
  }, 
  closeButtonText: {
    color: 'white',
  },
  lineText: {
    color: 'black',
  },
  columnContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 340,
      borderRadius: 50,
      overflow: 'hidden', 
      borderRadius: 30,
  },
  columnContainerPicture: {
      flexDirection: 'column',
      justifyContent: 'flex-end', 
      alignItems: 'flex-start',
      height: 160,
      width: '100%',
      borderRadius: 30, 
      overflow: 'hidden',
      top: -40,
      marginBottom: 30,
      paddingBottom: 15
    },
    pictureContainerElements: {
    right: -40
  },

  descriptionContainer: {
    padding: 10,
    flex: 1,
    minHeight: 50,
    maxHeight: 80,
    justifyContent: 'flex-end',
    paddingBottom: 0,
    color: 'white',
    top: -70,
    overflow: 'hidden'
  },
  titleContainer: {
    backgroundColor: '#29234a',
    justifyContent: 'center',
    paddingHorizontal: 10, 
    height: 150,
    width: 150
  },

});
