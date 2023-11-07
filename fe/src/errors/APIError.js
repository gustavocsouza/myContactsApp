class APIError extends Error {
  constructor(body, response) {
    super();
    this.name = 'APIError';
    this.response = response;
    this.message = body?.error || `${response.status} - ${response.statusText}`;
  }
}

export default APIError;
