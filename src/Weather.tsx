type Props = {
  temp: number
  description: string
}

const Weather = ({ temp, description }: Props) => {
  return (
    <div className="weather">
      <p>Temperature: {temp} °C</p>
      <p>Weather: {description}</p>
    </div>
  )
}

export default Weather
