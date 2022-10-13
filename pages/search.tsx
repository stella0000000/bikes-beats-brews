import Image from 'next/image'
// import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'
import styles from '../styles/Home.module.css'
import debounce from 'lodash.debounce'
import styled from 'styled-components'
import BikeSearch from '../components/bikeSearch'
import BeatSearch from '../components/beatSearch'

enum Dot {
  BIKE = 'BIKE',
  BEATS = 'BEATS'
}

const Container = styled.div`
  scroll-snap-type: x mandatory;
  display: flex;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  overflow-y: hidden;
`

const View = styled.div`
  min-width: 100vw;
  height: 60vh;
  scroll-snap-align: start;
  text-align: center;
  position: relative;
`

const Tile = styled.div`
  position: absolute;
  top: 40%;s
  transform: none;
  text-align: center;
  width: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Button = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Bubble = styled.span<{selected?: boolean}>`
  height: 20px;
  width: 20px;
  border: 1px solid #B5A642;
  background-color: ${props => props.selected ? '#B5A642' : 'none'};
  border-radius: 50%;
  display: inline-block;
  margin: 20px 10px 0px 0px;
`

const Search = () => {
    const [location, setLocation] = useState<string>('')
    const [predictions, setPredictions] = useState<any | undefined>(undefined) // fix type
    const [located, setLocated] = useState<boolean>(false)
    const [placeID, setPlaceID] = useState<string | undefined>(undefined)
    const [coords, setCoords] = useState<number[] | undefined>()
    const [transitTime, setTransitTime] = useState<number | undefined>()
    const [mood, setMood] = useState<string | undefined>(undefined)
    const [radius, setRadius] = useState<number | undefined>(undefined)
    const [destination, setDestination] = useState<string | undefined>(undefined)
    const [selectBubble, setSelectBubble] = useState<boolean>(true)
    const views = useRef(null)

    useEffect(() => {
        const fetchPredictions = async () => {
            const response = await fetch(`/api/predictions/${location}`)
            const data = await response.json()
            setPredictions(data)
        }

        if (location && !located) fetchPredictions();
    }, [location])

    useEffect(() => {
        const fetchCoordinates = async () => {
            const response = await fetch(`/api/coordinates/${placeID}`)
            const data = await response.json()
            setCoords([data.lat, data.lng])
        }

        if (placeID) fetchCoordinates()
    }, [placeID])

    // useEffect(() => {
    //     const fetchPlaylist = async () => {
    //         const response = await fetch(`/api/playlist/${mood}`)
    //         const data = await response.json()
    //         setPlaylist(data)
    //     }
    // }, [])

    const fetchPlaylist = async () => {
        const response = await fetch(`/api/playlist/${mood}`)
        const data = await response.json()
        console.log(data)
        // setPlaylist(data)
    }

    const fetchBeer = async () => {
        if (coords) {
            const response = await fetch(`/api/beer/${radius}?lat=${coords[0]}&lng=${coords[1]}`)
            const data = await response.json()
            console.log({data})
            setDestination(data[0].name)
        }
    }

    // const updateLocation = (e: any )=> {
    //     setLocation(e?.target?.value)
    // }
    // const debouncedLocation = debounce(e => updateLocation(e), 200);

    return (
        <>
          <Container
            ref={views}
            onScroll={e => {
              const ele = e.target as HTMLInputElement
              setSelectBubble(ele.scrollLeft < ele.scrollWidth/2 - ele.scrollWidth/4)
            }}
          >
            <View>
              <Tile>
                <BikeSearch
                  setTransitTime={setTransitTime}
                  predictions={predictions}
                  setPredictions={setPredictions}
                  setPlaceID={setPlaceID}
                  located={located}
                  setLocated={setLocated}
                  location={location}
                  setLocation={setLocation}
                />
              </Tile>
            </View>

            <View>
              <Tile>
                <BeatSearch
                  mood={mood}
                  setMood={setMood}
                  transitTime={transitTime}
                  setRadius={setRadius}
                />
              </Tile>
            </View>
          </Container>
          <Button>
            <button
                onClick={() => {
                    fetchBeer()
                    // fetchPlaylist()
                    // console.log(radius)
                    // console.log(coords)
                }}
                disabled={!coords || !mood || !transitTime || !radius}
            >
                FIND BEATS AND BEERS
            </button>
            <div>
              <Bubble selected={selectBubble} />
              <Bubble selected={!selectBubble} />
            </div>
            <div>your destination is ... {destination}</div>
          </Button>
        </>
    )
}

export default Search

/**
 * Input current location
 * Display predictions
 * Click prediction - make start location => fetch lat/lon
 * Desired cycle time + mood (speed)
 * Interpolate distance
 * Search google maps: beer + radius
 * 0,5h * 32 kmh = 16 km radius from start loc, keyword="beer"
 * Suggest 1 location (random)
 * Swipe behavior
 * ERROR HANDLING
 * TYPES
 */
