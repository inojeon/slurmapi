import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="p-4 w-full max-w-4xl mx-auto">
      <h1 className=" text-black my-5 text-2xl "> Slurm API test Page</h1>

      <div className="flex justify-between w-full">
        <label htmlFor="message" className="block text-sm font-medium text-warm-gray-900">
          sbatch 
        </label>
        <span id="message-max" className="text-sm text-warm-gray-500">
          Max. 500 characters
        </span>
      </div>
      <div className="">
        <textarea
          id="message"
          name="message"
          rows={4}
          className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border border-warm-gray-300 rounded-md"
          aria-describedby="message-max"
          defaultValue={''}
        />
      </div>
    </div>
  );
};

export default Home;