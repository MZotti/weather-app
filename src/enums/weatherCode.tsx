import {CloudFog, CloudLightning, CloudRain, CloudSnow, CloudSun, Snowflake, SunDim} from "phosphor-react-native";

const weatherCodes = [
    {
        codes: [0],
        label: 'clear',
        title: 'Limpo'
    },
    {
        codes: [1, 2, 3, 51, 53, 55, 56, 57],
        label: 'cloudy',
        title: 'Nublado'
    },
    {
        codes: [45, 48],
        label: 'foggy',
        title: 'Neblina'
    },
    {
        codes: [61, 63, 65, 66, 67],
        label: 'rainy',
        title: 'Chuva'
    },
    {
        codes: [71, 73, 75, 77],
        label: 'snowy',
        title: 'Neve',
    },
    {
        codes: [80, 81, 82],
        label: 'rain',
        title: 'Chuva'
    },
    {
        codes: [85, 86],
        label: 'snowstorm',
        title: 'Nevasca',
    },
    {
        codes: [95, 96, 99],
        label: 'thunderstorm',
        title: 'Temporal'
    },
]

export default weatherCodes