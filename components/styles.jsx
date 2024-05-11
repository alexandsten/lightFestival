
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
