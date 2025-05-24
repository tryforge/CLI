// 3. Local modules
import { Logger } from './Logger';

/**
 * An abstract scheme class representing the NetworkManager class.
 */
abstract class NetworkScheme {
  abstract baseUrl: string;

  abstract get<T>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<T | null>;

  abstract post<T>(
    endpoint: string,
    body: object,
    headers?: Record<string, string>
  ): Promise<T | null>;

  abstract delete<T>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<T | null>;

  abstract put<T>(
    endpoint: string,
    body: object,
    headers?: Record<string, string>
  ): Promise<T | null>;

  abstract request<T>(
    method: string,
    endpoint: string,
    body?: object,
    headers?: Record<string, string>
  ): Promise<T | null>;
}

/**
 * A class to easily manage network-related operations.
 */
export class NetworkManager extends NetworkScheme {
  private static readonly DEFAULT_CONTENT_TYPE = 'application/json';
  private static readonly CREDENTIALS_MODE = 'include';

  /**
   * The base URL to work with, in the instance.
   */
  public baseUrl: string;

  constructor(baseUrl: string) {
    super();
    this.baseUrl = baseUrl;
  }

  /**
   * Sends a GET request to the specified endpoint.
   * 
   * @param {string} endpoint - The API endpoint
   * @param {Record<string, string>} [headers] - Optional headers for the request
   * @returns {Promise<T | null>} The response data or null in case of failure
   * 
   * @example
   * const users = await NetworkManager.get<User[]>('/users');
   */
  public async get<T>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<T | null> {
    return this.request<T>('GET', endpoint, undefined, headers);
  }

  /**
   * Sends a POST request to the specified endpoint.
   * 
   * @param {string} endpoint - The API endpoint
   * @param {object} body - The request payload
   * @param {Record<string, string>} [headers] - Optional headers for the request
   * @returns {Promise<T | null>} The response data or null in case of failure
   * 
   * @example
   * const newUser = await NetworkManager.post<User>('/users', { name: 'John', email: 'john@example.com' });
   */
  public async post<T>(
    endpoint: string,
    body: object,
    headers?: Record<string, string>
  ): Promise<T | null> {
    return this.request<T>('POST', endpoint, body, headers);
  }

  /**
   * Sends a PUT request to the specified endpoint.
   * 
   * @param {string} endpoint - The API endpoint
   * @param {object} body - The request payload
   * @param {Record<string, string>} [headers] - Optional headers for the request
   * @returns {Promise<T | null>} The response data or null in case of failure
   * 
   * @example
   * const updatedUser = await NetworkManager.put<User>('/users/123', { name: 'Jane Doe' });
   */
  public async put<T>(
    endpoint: string,
    body: object,
    headers?: Record<string, string>
  ): Promise<T | null> {
    return this.request<T>('PUT', endpoint, body, headers);
  }

  /**
   * Sends a DELETE request to the specified endpoint.
   * 
   * @param {string} endpoint - The API endpoint
   * @param {Record<string, string>} [headers] - Optional headers for the request
   * @returns {Promise<T | null>} The response data or null in case of failure
   * 
   * @example
   * const success = await NetworkManager.delete<{ success: boolean }>('/users/123');
   */
  public async delete<T>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<T | null> {
    return this.request<T>('DELETE', endpoint, undefined, headers);
  }

  /**
   * Centralized request handling with enhanced error handling.
   * 
   * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
   * @param {string} endpoint - API endpoint
   * @param {object} [body] - Optional request payload
   * @param {Record<string, string>} [headers] - Optional headers for the request
   * @returns {Promise<T | null>} The response data or null in case of failure
   */
  public async request<T>(
    method: string,
    endpoint: string,
    body?: object,
    headers?: Record<string, string>
  ): Promise<T | null> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': NetworkManager.DEFAULT_CONTENT_TYPE,
          ...headers
        },
        body: body ? JSON.stringify(body) : undefined,
        credentials: NetworkManager.CREDENTIALS_MODE
      });

      if (!response.ok) {
        await this.handleErrorResponse(response, url, method);
        return null;
      }

      return await this.parseResponse<T>(response, url);
    } catch (error) {
      this.logRequestError(error as Error, url, method);
      return null;
    }
  }

  /**
   * Handles error responses and logs appropriate error messages.
   * 
   * @param {Response} response - The failed response object
   * @param {string} url - The request URL
   * @param {string} method - The HTTP method used
   */
  private async handleErrorResponse(
    response: Response,
    url: string,
    method: string
  ): Promise<void> {
    try {
      const errorText = await response.text();
      const errorMessage = `Network error [${method} ${url}]: ${response.status} ${response.statusText}`;
      Logger.error(errorMessage, errorText ? `- ${errorText}` : '');
    } catch (parseError) {
      const errorMessage = `Network error [${method} ${url}]: ${response.status} ${response.statusText} - Could not parse error response`;
      Logger.error(errorMessage);
    }
  }

  /**
   * Parses the response based on content type.
   * 
   * @param {Response} response - The response object
   * @param {string} url - The request URL for logging
   * @returns {Promise<T | null>} Parsed response data or null
   */
  private async parseResponse<T>(response: Response, url: string): Promise<T | null> {
    const contentType = response.headers.get('Content-Type');
    
    if (!contentType || !contentType.includes(NetworkManager.DEFAULT_CONTENT_TYPE)) {
      Logger.warn(`Unexpected response format from ${url}. Content-Type: ${contentType}`);
      return null;
    }

    try {
      return await response.json();
    } catch (parseError) {
      Logger.error(`Failed to parse JSON response from ${url}: ${(parseError as Error).message}`);
      return null;
    }
  }

  /**
   * Logs request errors with context.
   * 
   * @param {Error} error - The error object
   * @param {string} url - The request URL
   * @param {string} method - The HTTP method used
   */
  private logRequestError(error: Error, url: string, method: string): void {
    Logger.error(`Request failed [${method} ${url}]: ${error.message}`);
  }
}