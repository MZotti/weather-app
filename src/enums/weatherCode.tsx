const weatherCodes = [
    {
        codes: [0],
        label: 'clear',
        title: {
            'en': 'Clear',
            'pt-br': 'Limpo'
        }
    },
    {
        codes: [1, 2, 3, 51, 53, 55, 56, 57],
        label: 'cloudy',
        title: {
            'en': 'Cloudy',
            'pt-br': 'Nublado'
        }
    },
    {
        codes: [45, 48],
        label: 'foggy',
        title: {
            'en': 'Foggy',
            'pt-br': 'Neblina'
        }
    },
    {
        codes: [61, 63, 65, 66, 67],
        label: 'rainy',
        title: {
            'en': 'Rainy',
            'pt-br': 'Chuva'
        }
    },
    {
        codes: [71, 73, 75, 77],
        label: 'snowy',
        title: {
            'en': 'Snow',
            'pt-br': 'Neve'
        }
    },
    {
        codes: [80, 81, 82],
        label: 'rain',
        title: {
            'en': 'Rain',
            'pt-br': 'Chuva'
        }
    },
    {
        codes: [85, 86],
        label: 'snowstorm',
        title: {
            'en': 'Snowstorm',
            'pt-br': 'Nevasca'
        }
    },
    {
        codes: [95, 96, 99],
        label: 'thunderstorm',
        title: {
            'en': 'Thunderstorm',
            'pt-br': 'Temporal'
        }
    },
]

export default weatherCodes