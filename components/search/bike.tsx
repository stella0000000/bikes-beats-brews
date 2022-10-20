import Image from 'next/image'
import styled from 'styled-components'
import Predictions from '@components/search/predictions'

const Location = styled.input`
  width: 80vw;
  margin-top: 12vw;

  @media only screen and (min-width: 650px) {
    margin-top: 30px;
    width: 60vw;
  }
`

const Transit = styled.input`
  width: 30vw;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Text = styled.div`
  margin: 7vw 0vw 0.5vw 0vw;
  font-size: 20px;
  
  @media only screen and (min-width: 650px) {
    font-size: 40px;
    margin-top: 50px;
    width: 60vw;
  }
`

const TransitTime = styled.div`
  width: 80vw;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (min-width: 650px) {
    width: 60vw;
  }
`

const Min = styled.span`
  color: #000;
  font-size: 20px;
  
  @media only screen and (min-width: 650px) {
    font-size: 45px;
  }
`

// fix type
interface Props {
  setTransitTime: any,
  predictions: any,
  setPredictions: any,
  setPlaceID: any,
  located: any,
  setLocated: any,
  location: any,
  setLocation: any,
}

const BikeSearch: React.FC<Props> = ({
  setTransitTime,
  predictions,
  setPredictions,
  setPlaceID,
  located,
  setLocated,
  location,
  setLocation
}) => (
  <>
    <Image src="/bike.png" alt="bike" width={180} height={95} />
    <Location
        type="text"
        placeholder="Start location"
        onChange={e => {
            setLocation(e.target.value)
            setLocated(false)
            e.target.value==='' ? setPredictions(undefined) : null
        }}
        value={location}
    />
    <Predictions
        predictions={predictions && Array.isArray(predictions) ? predictions : null}
        setPlaceID={setPlaceID}
        setLocated={setLocated}
        setLocation={setLocation}
        setPredictions={setPredictions}
        located={located}
    />
    <Container>
      <Text>Desired transit time</Text>
      <TransitTime>
          <Transit
              type="number"
              placeholder="00"
              onChange={e => setTransitTime(parseInt(e.target.value))}
          /> <Min>minutes</Min>
      </TransitTime>
    </Container>
  </>
)

export default BikeSearch