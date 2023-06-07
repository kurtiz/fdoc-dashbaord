import { useEffect, useState } from 'react';
import githubImg from '../images/brand/brand-03.svg';
import requests from '../utils/requests';

const TableOne = () => {
  const [data, setData] = useState<
    Array<{ repository: Repository; contributors: Contributor[] }>
    >([]);

  useEffect(() => {
    const fetchData = async () => {
      const combinedData = await requests.getRepositoriesAndContributors();
      setData(combinedData);
    };

    fetchData();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Repository
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Repo Name
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Owner
            </h5>
          </div>
        </div>
        {data.map((row, key, count) => (
          <div
            key={key}
            className={`grid grid-cols-2 ${(key < count.length - 1 )? "border-b" : ""} border-stroke dark:border-strokedark`}
          >
          
            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {row.repository.name}
              </p>
            </div>
            <div className="flex p-2.5 xl:p-5">
              <span className="mb-5 flex -space-x-4">
                {row.contributors.map((contributor, i) => (
                  <a href={contributor.html_url} target='_blank'>
                    <img
                    key={i}
                    src={contributor.avatar_url}
                    className="h-12 w-12 border-slate-300 z-10 rounded-full border-2"
                    alt="User"
                  />
                  </a>
                ))}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
