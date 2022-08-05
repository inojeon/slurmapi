import type { NextPage } from "next";
import useSWR from "swr";
import Menu from "../components/menu";

// const fetcher = async (...args :any) => {
//   const response = await fetch(...args)
//   return response.json()
// }
// const fetcher = url => fetch(url).then(r => r.json())

interface SqueueResult {
  jobid : string;
  name : string;
  nodelist : string;
  nodes : string;
  partition : string;
  st : string;
  time : string;
  user : string;
}

interface SqueueResResult {
  ok: boolean;
  result?:  SqueueResult[];
}

const Squeue: NextPage = () => {
  const { data, error } = useSWR<SqueueResResult>('/api/squeue',
    {
      // refreshInterval: 5000,
    }
  )

  // console.log(data)

  return data ? (
    <div className="p-4 w-full max-w-4xl mx-auto">
      <Menu />
      <h1 className=" text-black my-5 text-2xl "> Slurm Squeue done</h1>

      <table className="w-full">
        <thead>
          <tr>
            <th>JOBID</th>
            <th>PARTITION</th>
            <th>NAME</th>
            <th>USER</th>
            <th>ST</th>
            <th>TIME</th>
            <th>NODES</th>
            <th>NODELIST(REASON)</th>
          </tr>
        </thead>
        <tbody>
            {data.result?.map( (job, idx) => (
              <tr key={idx}>
                <td className="p-2 text-center">{job.jobid}</td>
                <td className="p-2 text-center">{job.partition}</td>
                <td className="p-2 text-center">{job.name}</td>
                <td className="p-2 text-center">{job.user}</td>
                <td className="p-2 text-center">{job.st}</td>
                <td className="p-2 text-center">{job.time}</td>
                <td className="p-2 text-center">{job.nodes}</td>
                <td className="p-2 text-center">{job.nodelist}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="p-4 w-full max-w-4xl mx-auto">
      <h1 className=" text-black my-5 text-2xl "> Slurm Squeue loading</h1>
    </div>
  );
};

export default Squeue;