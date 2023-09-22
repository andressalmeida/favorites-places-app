import { useEffect, useState } from "react";
import {useIsFocused} from '@react-navigation/native'
import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/database";


function AllPlaces({route}) {

    const [placesList, setPlacesList] = useState([])
    const isFocused = useIsFocused()

    useEffect(() => {
        async function loadPlaces() {
           const places = await fetchPlaces()
           setPlacesList(places)
        }

        if(isFocused) {
            loadPlaces()
            //setPlacesList(curPlaces => [...curPlaces, route.params.place])
        }
    }, [isFocused])

    return <PlacesList places={placesList} />
}

export default AllPlaces;