import {
    CloudFog,
    CloudLightning,
    CloudMoon,
    CloudRain,
    CloudSnow,
    CloudSun,
    Moon,
    Snowflake,
    SunDim
} from "phosphor-react-native";
import {QuestionIcon} from "native-base";

const weatherIcon = (time: number, label: string | undefined, size: number = 16, color: string = '#57534e'): JSX.Element => {
    const isDay = (time > 4 && time < 19) ? true : false
    switch (label) {
        case 'clear': return isDay ? <SunDim size={size} color={color} /> : <Moon size={size} color={color} />
        case 'cloudy': return isDay ? <CloudSun size={size} color={color} /> : <CloudMoon size={size} color={color} />
        case 'foggy': return <CloudFog size={size} color={color} />
        case 'rainy': return <CloudRain size={size} color={color} />
        case 'snowy': return <CloudSnow size={size} color={color} />
        case 'rain': return <CloudRain size={size} color={color} />
        case 'snowstorm': return <Snowflake size={size} color={color} />
        case 'thunderstorm': return <CloudLightning size={size} color={color} />
        default: return <QuestionIcon size={size} color={color} />;
    }
}

export default weatherIcon