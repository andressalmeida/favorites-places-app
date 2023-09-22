
const GOOGLE_API_KEY = 'AIzaSyCH2bF_qOU5I_KOX7TJo0i6fWYYLNTtq98'
const SIGNATURE_KEY = '4XRcjtbXFuEPhCm3VnImj-r4lBA='
const exclude = '&markers=color:red%7Clabel:S%7C.${lat},${lng}'

export function getMapPreview(lat, lng) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&key=${GOOGLE_API_KEY}`

    return imagePreviewUrl
}

export async function getAddress(lat, lng) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
    const response = await fetch(url);

    if(!response.ok) {
        throw new Error('Failed to fetch address!')
    }

    const data = await response.json();
    const address = data.results[0].formatted_address;

    return address;
    
}