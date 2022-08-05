// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { exec } from 'child_process';
import type { NextApiRequest, NextApiResponse } from 'next'
import { squeueToJSON } from '../../libs/server/utils';
import withHandler from '../../libs/server/withHandler';

type Data = {
  ok: boolean;
  result?: object;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    exec("squeue", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      res.status(200).json({ ok: true, result: squeueToJSON(stdout) })
    });
  }
}


export default withHandler({ methods: ["GET"], handler });