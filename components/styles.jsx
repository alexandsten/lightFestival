
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
    paddingBottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedMarkerTitle: {
    color: 'white',
    flex: 1, // Allow text to take available space
    fontSize: 22,
    marginTop: 150
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
    backgroundColor: '#CC3366',
    borderRadius: 8,
  },  
  lineButton: {
    position: 'absolute',
    bottom: 5,
    right: 105, // Optionally set it to the right if needed
    padding: 10,
    backgroundColor: '#CC3366',
    borderRadius: 8,
  }, 
  closeButtonText: {
    color: 'white',
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 450,
    borderRadius: 50,
    overflow: 'hidden', // Ensure content is clipped to border radius
    borderRadius: 30,
  },
  descriptionContainer: {
    backgroundColor: '#383838',
    padding: 10, 
    height: 150
  },
  titleContainer: {
    backgroundColor: '#29234a',
    justifyContent: 'center',
    paddingHorizontal: 10, 
    height: 150,
    width: 150
  },

});
