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


  menuContainer: {
    position: 'absolute',
    padding: '10%',
    // bottom: '10%',
    // left: 20,
    // right: 20,
    backgroundColor: 'black',
    // borderRadius: 30,
    minHeight: '100%',
    minWidth: '100%',
    flexDirection: 'row',
    alignItems: 'top',
    justifyContent: 'center',
    flexDirection: 'column',
    zIndex: 0,
  },
  menuContainerListItem: {
    marginTop: 30
  },
  bottomMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },


  closeDrawerButton: {
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

  calloutContainer: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 10,
  },


  titleContainer: {
    backgroundColor: '#29234a',
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 150,
    width: 150,
  },  
  
    /* fonts */


    closeButtonTextLarge: {
      color: 'white',
      fontFamily: 'AlfredSans-Regular',
      fontSize: 36
    },


    calloutText: {
      color: 'black',
      fontSize: 16,
      fontFamily: 'AlfredSans',
    },


    openDrawerText: {
      color: 'white',
      fontSize: 32,
      fontFamily: 'AlfredSans-Regular',
      fontWeight: 'bold'
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
  
  
    closeButtonText: {
      color: 'white',
      fontFamily: 'AlfredSans-Regular',
    },
  
  
    lineText: {
      color: 'black',
      fontFamily: 'AlfredSans-Regular',
    },
  

});
