import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import { useEffect, useState } from "react";
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { Alert, StyleSheet, View, Text, Image } from "react-native"
import { Colors } from "../../constants/colors";
import { getAddress, getMapPreview } from "../../util/location";
import OutlinedButton from "../UI/OutlinedButton"


function LocationPicker({onSaveLocation}) {

    const navigation = useNavigation()
    const route = useRoute()

    const isFocused = useIsFocused()

    const [pickedLocation, setPickedLocation] = useState()
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()

    

   useEffect(() => {
    if(isFocused && route.params) {
        const mapPickedLocation = {
            lat: route.params.pickedLat, 
            lng: route.params.pickedLng
        };
        setPickedLocation(mapPickedLocation)
    }
   
    
    }, [route, isFocused])

    useEffect(() => {
        async function handleLocation() {
            if(pickedLocation) {
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng)
                onSaveLocation({...pickedLocation, address: address})
            }
        }
        handleLocation()
        
    }, [pickedLocation, onSaveLocation])
    

    async function verifyPermissions() {
        if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
          const permissionResponse = await requestPermission();
    
          return permissionResponse.granted;
        }
    
        if(locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('You need grant location permissions to use this app');
    
            return false;
        };
        return true;
    }
    
    async function getLocationHandler() {
      const hasPermission =  await verifyPermissions() 

      if(!hasPermission) {
        return;
      }

      const location = await getCurrentPositionAsync();

      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      })

    }

    function pickOnMapHandler() {
        navigation.navigate('Map')
    }

    let locationPreview = <Text>No location picked yet</Text>

    if(pickedLocation) {
        locationPreview = <Image style={styles.img} source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}} />
    }


    return (
        <View>

            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
                
            <View style={styles.actions}>
                <OutlinedButton icon="location" onPress={getLocationHandler}>Find Location</OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
            </View>

        </View>
    )
}

export default LocationPicker;


const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    img: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
    }
})