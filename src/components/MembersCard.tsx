import { Link } from 'react-router-dom';
import requests from '../utils/requests';
import { useEffect, useState } from 'react';

const MembersCard = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const memberData = await requests.fetchMembers();
      setMembers(memberData);
    };

    fetchData();
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Members
      </h4>

      <div>
        {members.map((member, key) => (
          <Link
            key={key}
            to={member.html_url}
            target='_blank'
            className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
          >
            <div className="relative h-14 w-14">
              <img src={member.avatar_url} className='rounded-full' alt="User" />
              {/* <span className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-meta-3"></span> */}
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-white">
                  {member.login}
                </h5>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MembersCard;
