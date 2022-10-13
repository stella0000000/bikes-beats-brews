import type { NextApiRequest, NextApiResponse } from 'next'
import { Client, LatLngLiteral } from '@googlemaps/google-maps-services-js'

const client = new Client({})

export default async function coordinates(
  req: NextApiRequest,
  res: NextApiResponse<LatLngLiteral | undefined | string>
) {
  const place_id = req.query.placeID?.toString();

  if (place_id) {
    try {
      const response = await client.placeDetails({
        params: {
          place_id,
          key: process.env.GOOGLE_KEY!
        },
        timeout: 1000,        
      })
      res.status(200).json(response.data.result.geometry?.location)
    } catch(err) {
      res.status(500).json('Uh oh - coordinates failed')
      // res.status(500).json(response.data.error_message)
    }
  }
}