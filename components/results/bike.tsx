import { BREW } from "@utils/constants"
import { BrewContext } from "@utils/context"
import Image from "next/image"
import { useContext } from "react"
import styled from "styled-components"

const Logo = styled.div<{brew?: string}>`
  -webkit-filter: ${props => props.brew === BREW.COFFEE ? 'none' : 'invert(100%)'};
  filter: ${props => props.brew === BREW.COFFEE ? 'none' : 'invert(100%)'};
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 15px;
  height: 70%;

  @media only screen and (min-width: 700px) {
    font-size: 20px;
  }
`

// fix type
export const BikeResult = ({ bikeRide, weather }: any) => {
  const brew = useContext(BrewContext)
  
    return (
        <>
        <Logo brew={brew}>
          <Image src="/bike.png" alt="bike" width={180} height={95} />
        </Logo>
          <Content>
              {bikeRide.distance}<br></br>
              {bikeRide.duration}<br></br><br></br>
              {parseInt(weather.temp)}°, {weather.description}
          </Content>
        </>
    )
}