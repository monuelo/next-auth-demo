// This is an example of to protect an API route
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    const response = await axios.get("https://httpbingo.org/get");
    return res.send(JSON.stringify(response.data, null, 2));
  }

  res.send({
    error: "You must be signed in to view the protected content on this page.",
  });
}
