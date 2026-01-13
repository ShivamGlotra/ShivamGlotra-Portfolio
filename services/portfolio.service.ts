import { fetchAPI } from "@/lib/api";

export const portfolioService = {
  getAllData: async <T = unknown>(apiName: string): Promise<T | null> => {
    try {
      if (!apiName) throw new Error("Please pass the end point.");
      const data = await fetchAPI<T>(`/api/${apiName}`);
      if (!data) return null;
      return data;
    } catch (error) {
      throw new Error("Failed to fetch page data", { cause: error });
    }
  },

  submitForm: async (formData: {
    name: string;
    email: string;
    subject: string;
    message?: string;
  }): Promise<boolean> => {
    try {
      await fetchAPI("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      return true;
    } catch (error) {
      throw new Error("Failed to submit form", { cause: error });
    }
  },
};
