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
  bottomMenuContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(28, 27, 31, 0.75)',
    borderRadius: 24,
    zIndex: 1,
    paddingLeft: 10,
    maxHeight: 50
  },
  logo: {
    width: 100, 
    height: 100, 
    resizeMode: 'contain', 
    marginTop: -23
  },
  burger: {
    width: 30, 
    height: 30, 
    marginLeft: 'auto',
    marginRight: 20, 
    marginTop: -23
  },
  touchableBurger: {
    marginLeft: '50%'
  },
  selectedMarkerContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  menuContainer: {
    position: 'absolute',
    padding: 20,
    bottom: 110,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(28, 27, 31, 0.9)',
    borderRadius: 30,
    minHeight: '80%',
    flexDirection: 'row',
    alignItems: 'top',
    justifyContent: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  bottomMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectedMarkerTitle: {
    color: 'white',
    fontSize: 22,
  },
  selectedMarkerText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'AlfredSans-Regular',
  },
  closeButton: {
    position: 'absolute',
    bottom: 18,
    right: 22,
    padding: 8.5,
    backgroundColor: 'black',
    borderRadius: 50,
    width: 54,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    fontFamily: 'AlfredSans-Regular',
  },
  readMoreButton: {
    position: 'absolute',
    bottom: 20,
    right: 195,
    padding: 7.5,
    backgroundColor: 'rgba(204, 51, 102, 0.75)',
    borderRadius: 24,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  bookingButton: {
    // padding: 3,
    flex: 0.5,
    backgroundColor: 'rgba(204, 51, 102, 0.75)',
    borderRadius: 24,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  lineButton: {
    position: 'absolute',
    bottom: 20,
    right: 85.5,
    padding: 7.5,
    backgroundColor: 'white',
    borderRadius: 24,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    color: 'white',
    fontFamily: 'AlfredSans-Regular',
  },
  lineText: {
    color: 'black',
    fontFamily: 'AlfredSans-Regular',
  },
  columnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 340,
    maxHeight: 540,
    overflow: 'hidden',
    backgroundColor: 'rgba(28, 27, 31, 0.9)',
    borderRadius: 30
  },
  readMoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 540,
    maxHeight: 540,
    overflow: 'hidden',
    backgroundColor: 'rgba(28, 27, 31, 0.9)',
    borderRadius: 30,
  },
  calloutContainer: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 10,
  },
  calloutText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'AlfredSans',
  },
 columnContainerPicture: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    height: 160,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    marginBottom: 10,
    paddingBottom: 15,
    zIndex: 1,
  },
  pictureContainerElements: {
    marginLeft: 30,
  },
  descriptionContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
    paddingBottom: 15,
    color: 'white',
    overflow: 'hidden',
    marginLeft: 8,
    marginBottom: 55,
    zIndex: 1
  },
  readMoreDescriptionContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
    paddingBottom: 15,
    color: 'white',
    overflow: 'scroll',
    marginLeft: 8,
    marginBottom: 55,
    zIndex: 1
  },
  bookingContainer: {
    flex: 0.20,
    padding: 1,
    justifyContent: 'flex-start',
    color: 'white',
    overflow: 'scroll',
    height: 5,
    zIndex: 1
  },
  scrollContent: {
    flexGrow: 1,
  },
  titleContainer: {
    backgroundColor: '#29234a',
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 150,
    width: 150,
  },
});
