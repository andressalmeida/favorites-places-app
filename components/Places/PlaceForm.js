import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Place } from "../../models/place";
import Button from "../UI/Button";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

function PlaceForm({onCreatePlace}) {

    const [enteredTitle, setEnteredTitle] = useState()
    const [savedImage, setSavedImage] = useState()
    const [savedLocation, setSavedLocation] = useState()

    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText)
    }

    function saveImageHandler(imageUri) {
        setSavedImage(imageUri)
    }

    const saveLocationHandler = useCallback((location) => {
        setSavedLocation(location)
    }, [])

    function savePlaceHandler() {
        const placeDate = new Place(enteredTitle,savedImage, savedLocation)
        onCreatePlace(placeDate)
    } 

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput 
                    style={styles.input} 
                    onChangeText={changeTitleHandler} 
                    value={enteredTitle}
                />
            </View>

            <ImagePicker onSaveImage={saveImageHandler} />
            <LocationPicker onSaveLocation={saveLocationHandler}/>

            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    )
}


export default PlaceForm;


const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    }
})