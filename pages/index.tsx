import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Menu from "../components/menu";
import useMutation from "../libs/client/useMutation";

interface SbatchForm {
  script : string;
}
interface SbatchResult {
  ok: boolean;
  massage?:string;
}

const Sbatch: NextPage = () => {
  const [sbatch, { loading, data, error }] =
    useMutation<SbatchResult>("/api/sbatch");
  const [massage, setMassage] = useState<string|null>(null);
  const { register, handleSubmit, reset } = useForm<SbatchForm>();

  const onValid = (data : SbatchForm) => {
    if (loading) return;
    sbatch(data);
  }

  useEffect(() => {
    if (data?.ok && data.massage) {
      setMassage(data.massage)
    }
  }, [data]);


  return (
    <div className="p-4 w-full max-w-4xl mx-auto">
      <Menu />
      <h1 className=" text-black my-5 text-2xl "> Slurm Sbatch</h1>

      <div className="flex justify-between w-full">
        <label htmlFor="message" className="block text-sm font-medium text-warm-gray-900">
          sbatch 
        </label>
      </div>
      <div>
        {massage && <p>{massage}</p> }
      </div>
      <div className="">
        <form
          onSubmit={handleSubmit(onValid)}
        >

          <textarea
            className="py-3 px-4 h-96 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border border-warm-gray-300 rounded-md"
            {...register("script", {
              required: true,
            })}
          />
          <button 
            className="border border-red-500 m-2 py-2 px-4 rounded-lg" 
            type="submit"
          >
            On Submit
          </button>
        </form>
      </div>
    </div>
  )
};

export default Sbatch;