import { API_BASE_URL } from '../config';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const apiRequest = async (path, { token, method = 'GET', body } = {}) => {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  } catch (_error) {
    throw new ApiError(`Couldn't reach Wellnest. Check that the API is running at ${API_BASE_URL}.`);
  }

  const text = await response.text();
  let data = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch (_error) {
      if (response.ok) throw new ApiError('The server returned an unreadable response.', response.status);
    }
  }
  if (!response.ok) throw new ApiError(data.error || `Request failed (${response.status}).`, response.status);
  return data;
};
