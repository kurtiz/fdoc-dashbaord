import axios, { AxiosResponse } from 'axios';
import dotenv from './dotenv';

const api = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    Authorization: `Bearer ${dotenv.TOKEN}`,
  },
});


const fetchRepositories = async (): Promise<Repository[]> => {
  try {
    const response: AxiosResponse<Repository[]> = await api.get(
      'users/40-days-of-Coding/repos'
    );
    const repositories: Repository[] = response.data;
    return repositories;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
};

const fetchContributors = async (repository: Repository): Promise<Contributor[]> => {
  try {
    const response: AxiosResponse<Contributor[]> = await axios.get(repository.contributors_url);
    const contributors: Contributor[] = response.data;
    return contributors;
  } catch (error) {
    console.error(`Error fetching contributors for repository ${repository.name}:`, error);
    throw new Error(`Error fetching contributors for repository ${repository.name}: ${error.message}`);
  }
};


// const fetchContributors = async (
//   repository: Repository
// ): Promise<Contributor[]> => {
//   try {
//     const response: AxiosResponse<Contributor[]> = await axios.get(
//       repository.contributors_url
//     );
//     const contributors: Contributor[] = response.data;
//     return contributors;
//   } catch (error) {
//     console.error(
//       `Error fetching contributors for repository ${repository.name}:`,
//       error
//     );
//     return [];
//   }
// };

// const getRepositoriesAndContributors = async (): Promise<Array<{ repository: Repository; contributors: Contributor[] }>> => {
//   try {
//     const repositories: Repository[] = await fetchRepositories();
//     const combinedData: Array<{ repository: Repository; contributors: Contributor[] }> = [];

//     for (const repository of repositories) {
//       const contributors: Contributor[] = await fetchContributors(repository);
//       combinedData.push({ repository, contributors });
//     }

//     return combinedData;
//   } catch (error) {
//     console.error('Error:', error);
//     return [];
//   }
// };

const getRepositoriesAndContributors = async (): Promise<Array<{ repository: Repository; contributors: Contributor[] }>> => {
  try {
    const repositories: Repository[] = await fetchRepositories();
    const combinedData: Array<{ repository: Repository; contributors: Contributor[] }> = [];

    for (const repository of repositories) {
      try {
        const contributors: Contributor[] = await fetchContributors(repository);
        combinedData.push({ repository, contributors });
      } catch (error) {
        console.error(error);
      }
    }

    return combinedData;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};



const fetchMembers = async () => {
  try {
    const response: AxiosResponse = await api.get(
      'orgs/40-days-of-Coding/members'
    );
    const members = response.data;
    console.log(members)
    return members;
  } catch (error) {
    console.error('Error fetching members:', error);
    return [];
  }
};


const requests = {
  fetchRepositories,
  fetchContributors,
  getRepositoriesAndContributors,
  fetchMembers
};

export default requests;
