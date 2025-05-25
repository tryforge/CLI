/**
 * An interface representing the NetworkManager class.
 */
interface NetworkScheme {
  /**
   * The base URL to work with.
   */
  BaseURL?: string;

  /**
   * Sends a GET request to the specified endpoint and returns the response data.
   *
   * @typeParam T - The expected response data type.
   * @param endpoint - The API endpoint to send the GET request to.
   * @param headers - Optional HTTP headers to include in the request.
   * @returns A promise that resolves to the response data of type `T`, or `null` if the request fails.
   */
  Get?<T>(
    endpoint: string,
    headers: Record<string, string>
  ): Promise<T | null>

  /**
   * Sends a POST request to the specified endpoint with the provided body and headers.
   *
   * @template T - The expected response type.
   * @param endpoint - The API endpoint to send the request to.
   * @param body - The request payload to be sent in the body of the POST request.
   * @param headers - Optional HTTP headers to include in the request.
   * @returns A promise that resolves to the response of type `T`, or `null` if the request fails.
   */
  Post?<T>(
    endpoint: string,
    body: object,
    headers?: Record<string, string>
  ): Promise<T | null>;

  /**
   * Sends an HTTP PUT request to the specified endpoint with the provided body and headers.
   *
   * @typeParam T - The expected response type.
   * @param endpoint - The API endpoint to send the PUT request to.
   * @param body - The request payload to be sent in the body of the PUT request.
   * @param headers - Optional HTTP headers to include in the request.
   * @returns A promise that resolves to the response of type `T`, or `null` if the request fails.
   */
  Put?<T>(
    endpoint: string,
    body: object,
    headers?: Record<string, string>
  ): Promise<T | null>;

  /**
   * Sends a DELETE request to the specified endpoint.
   *
   * @typeParam T - The expected response type.
   * @param endpoint - The API endpoint to send the DELETE request to.
   * @param headers - Optional HTTP headers to include in the request.
   * @returns A promise that resolves to the response of type `T`, or `null` if the request fails.
   */
  Delete?<T>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<T | null>;

  /**
   * Sends an HTTP request to the specified endpoint using the given method, body, and headers.
   *
   * @template T - The expected response type.
   * @param method - The HTTP method to use (e.g., 'GET', 'POST', 'PUT', 'DELETE').
   * @param endpoint - The endpoint path to append to the base URL.
   * @param body - Optional request payload to send as JSON.
   * @param headers - Optional additional headers to include in the request.
   * @returns A promise that resolves to the parsed JSON response of type `T`, or `null` if the request fails or the response is not valid JSON.
   */
  Request?<T>(
    method: string,
    endpoint: string,
    headers?: Record<string, string>,
    body?: object
  ): Promise<T | null>;
}
/**
 * A class to manage HTTP-related operations.
 */
export class NetworkManager implements NetworkScheme {
  /**
   * The base URL to work with.
   */
  public BaseURL?: string;

  /**
   * The constructor to create the instance of the class.
   * @param baseUrl The base URL to work with.
   */
  constructor(baseUrl: string) {
    this.BaseURL = baseUrl;
  }

  /**
   * Sends a GET request to the specified endpoint and returns the response data.
   *
   * @typeParam T - The expected response data type.
   * @param endpoint - The API endpoint to send the GET request to.
   * @param headers - Optional HTTP headers to include in the request.
   * @returns A promise that resolves to the response data of type `T`, or `null` if the request fails.
   */
  public async Get<T>(
    endpoint: string,
    headers: Record<string, string> = {}
  ): Promise<T | null> {
    return this.Request<T>('GET', endpoint, undefined, headers);
  }

  /**
   * Sends a POST request to the specified endpoint with the provided body and headers.
   *
   * @template T - The expected response type.
   * @param endpoint - The API endpoint to send the request to.
   * @param body - The request payload to be sent in the body of the POST request.
   * @param headers - Optional HTTP headers to include in the request.
   * @returns A promise that resolves to the response of type `T`, or `null` if the request fails.
   */
  public async Post<T>(
    endpoint: string,
    body: object,
    headers: Record<string, string> = {}
  ): Promise<T | null> {
    return this.Request<T>('POST', endpoint, headers, body);
  }

  /**
   * Sends an HTTP PUT request to the specified endpoint with the provided body and headers.
   *
   * @typeParam T - The expected response type.
   * @param endpoint - The API endpoint to send the PUT request to.
   * @param body - The request payload to be sent in the body of the PUT request.
   * @param headers - Optional HTTP headers to include in the request.
   * @returns A promise that resolves to the response of type `T`, or `null` if the request fails.
   */
  public async Put<T>(
    endpoint: string,
    body: object,
    headers: Record<string, string> = {}
  ): Promise<T | null> {
    return this.Request<T>('PUT', endpoint, headers, body);
  }

  /**
   * Sends a DELETE request to the specified endpoint.
   *
   * @typeParam T - The expected response type.
   * @param endpoint - The API endpoint to send the DELETE request to.
   * @param headers - Optional HTTP headers to include in the request.
   * @returns A promise that resolves to the response of type `T`, or `null` if the request fails.
   */
  public async Delete<T>(
    endpoint: string,
    headers: Record<string, string> = {}
  ): Promise<T | null> {
    return this.Request<T>('DELETE', endpoint, undefined, headers);
  }

  /**
   * Sends an HTTP request to the specified endpoint using the given method, body, and headers.
   *
   * @template T - The expected response type.
   * @param method - The HTTP method to use (e.g., 'GET', 'POST', 'PUT', 'DELETE').
   * @param endpoint - The endpoint path to append to the base URL.
   * @param body - Optional request payload to send as JSON.
   * @param headers - Optional additional headers to include in the request.
   * @returns A promise that resolves to the parsed JSON response of type `T`, or `null` if the request fails or the response is not valid JSON.
   */
  public async Request<T>(
    method: string,
    endpoint: string,
    headers: Record<string, string> = {},
    body?: object
  ): Promise<T | null> {
    if (!this.BaseURL) {
      return null;
    }

    const url = this.BaseURL + endpoint;
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        return null;
      }

      try {
        return (await response.json()) as T;
      } catch {
        return null;
      }
    } catch {
      return null;
    }
  }
}