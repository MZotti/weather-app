
import { WeatherProvider as Provider } from '@hooks/weather'
import { QueryProvider } from './queryClient'

const WeatherQueryProvider = ({ children }) => {
	return (
		<QueryProvider>
			<Provider>{children}</Provider>
		</QueryProvider>
	)
}

export default WeatherQueryProvider
