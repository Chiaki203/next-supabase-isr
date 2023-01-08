import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  revalidated: boolean
}
type Msg = {
  message: string
}

export default async function handler (
  req:NextApiRequest,
  res:NextApiResponse<Data|Msg>
) {
  // console.log('notes api res', res)
  console.log('Revalidating notes page...')
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({message: 'Your secret is invalid.'})
  }
  let revalidated = false
  try {
    await res.revalidate('/notes')
    revalidated = true
  } catch(err) {
    console.log('notes page revalidate error', err)
  }
  res.json({
    revalidated
  })
}





// import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }
