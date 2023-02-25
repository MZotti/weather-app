
import { WeatherProvider as Provider } from '@hooks/weather'
import { QueryProvider } from './queryClient'

interface Props {
	children: JSX.Element
}

const WeatherQueryProvider = ({ children }: Props) => {
	return (
		<QueryProvider>
			<Provider>{children}</Provider>
		</QueryProvider>
	)
}

export default WeatherQueryProvider
