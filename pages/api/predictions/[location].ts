import type { NextApiRequest, NextApiResponse } from 'next'
import { Client, PlaceAutocompleteResult} from '@googlemaps/google-maps-services-js'

const client = new Client({})

export default async function predictions(
  req: NextApiRequest,
  res: NextApiResponse<PlaceAutocompleteResult[] | string>
) {
  const input = req.query.location?.toString();

  if (input) {
    try {
      const response = await client.placeAutocomplete({
        params: {
          input,
          key: process.env.GOOGLE_KEY!
        },
        timeout: 1000,
      })
      
      // see what properties are in response.. status ok etc - or error
      res.status(200).json(response.data.predictions)
    } catch(err) {
      res.status(500).json('Uh oh - predictions failed')
      // res.status(500).json(response.data.error_message)
    }
  }
}