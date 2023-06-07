declare interface Repository {
    name: string;
    contributors_url: string;
}

interface Contributor {
    login: string;
    contributions: number;
  }