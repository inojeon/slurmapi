// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { exec } from 'child_process';
import { existsSync, unlinkSync, writeFileSync } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next'
import { homedir } from 'os';
import { chdir } from 'process';
import { squeueToJSON } from '../../libs/server/utils';
import withHandler from '../../libs/server/withHandler';

type Data = {
  ok: boolean;
  massage?: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method === "POST") {
    const { script } = req.body;
    if(existsSync('/home/admin/run.sh')) {
      unlinkSync('/home/admin/run.sh')
    };
    writeFileSync('/home/admin/run.sh', script);
    
    const HOME =homedir();

    chdir(HOME); 
 
    exec("sbatch /home/admin/run.sh", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      chdir("/home/admin/slurmapi"); 
      res.status(200).json({ ok: true, massage: stdout })
    });

  }
}


export default withHandler({ methods: ["POST"], handler });