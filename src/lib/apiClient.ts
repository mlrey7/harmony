class APIClient {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async request(url: string, options: RequestInit) {
    const response = await fetch(`${this.baseURL}${url}`, options);
    if (!response.ok) {
      const error = new Error("HTTP Error");
      error.cause = response.status;
      error.message = await response.json();
      throw error;
    }
    return response;
  }

  get(url: string) {
    return this.request(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  post(url: string, data: any) {
    return this.request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  put(url: string, data: any) {
    return this.request(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  delete(url: string) {
    return this.request(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export const apiClient = new APIClient("/api");
