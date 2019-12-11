import axios from "axios";


export const commonRoutes = {
  authorization: "/authorize",
  registration: "/register"
};

class HTTPService {
  private readonly clientHostPort: string;
  private readonly serverHostPort: string;
  private readonly defaultHeaders: any;

  constructor (clientHostPort: string, serverHostPort: string) {
    this.clientHostPort = clientHostPort;
    this.serverHostPort = serverHostPort;
    this.defaultHeaders = {
      "Origin": this.clientHostPort
    }
  }

  sendGet (
    resource: string,
    headers: any,
    addDefaultHeaders: boolean = true) {

    axios.post(
      this.serverHostPort + resource,
      {
        headers:
            addDefaultHeaders ? {...this.defaultHeaders, ...headers}
            : headers
      }
    );
  }

  sendPost (
    resource: string,
    headers: any,
    body: string,
    addDefaultHeaders: boolean = true) {

    return axios.post(
      this.serverHostPort + resource,
      body,
      {
        headers:
            addDefaultHeaders ? {...this.defaultHeaders, ...headers}
            : headers,
      }
    );
  }
}

export const httpService = new HTTPService(
  "http://localhost:3000",
  "http://127.0.0.1:5000"
);
