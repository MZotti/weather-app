import {CloudFog, CloudLightning, CloudRain, CloudSnow, CloudSun, Snowflake, SunDim} from "phosphor-react-native";

const weatherCodes = [
    {
        codes: [0],
        icon: <SunDim size={16} />
    },
    {
        codes: [1, 2, 3],
        icon: <CloudSun size={16} />
    },
    {
        codes: [45, 48],
        icon: <CloudFog size={16} />
    },
    {
        codes: [51, 53, 55],
        icon: <CloudSun size={16} />
    },
    {
        codes: [56, 57],
        icon: <CloudFog size={16} />
    },
    {
        codes: [61, 63, 65],
        icon: <CloudRain size={16} />
    },
    {
        codes: [66, 67],
        icon: <CloudRain size={16} />
    },
    {
        codes: [71, 73, 75],
        icon: <CloudSnow size={16} />
    },
    {
        codes: [77],
        icon: <Snowflake size={16} />
    },
    {
        codes: [80, 81, 82],
        icon: <CloudRain size={16} />
    },
    {
        codes: [85, 86],
        icon: <Snowflake size={16} />
    },
    {
        codes: [95, 96, 99],
        icon: <CloudLightning size={16} />
    },
]

export default weatherCodes