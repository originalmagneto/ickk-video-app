// Mock API for testing and development

const mockApi = {
  login: async (username, password) => {
    console.log("Mock API received login attempt:", { username, password });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "demo" && password === "password") {
          resolve({ token: "mock-token", username: "demo" });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  },

  getVideos: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: "React Basics",
            date: "2023-05-01",
            tags: ["react", "tutorial"],
          },
          {
            id: 2,
            title: "Advanced JavaScript",
            date: "2023-05-05",
            tags: ["javascript", "advanced"],
          },
          {
            id: 3,
            title: "Node.js Crash Course",
            date: "2023-05-10",
            tags: ["nodejs", "backend"],
          },
        ]);
      }, 1000);
    });
  },

  getVideosByTag: async (tag) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allVideos = [
          {
            id: 1,
            title: "React Basics",
            date: "2023-05-01",
            tags: ["react", "tutorial"],
          },
          {
            id: 2,
            title: "Advanced JavaScript",
            date: "2023-05-05",
            tags: ["javascript", "advanced"],
          },
          {
            id: 3,
            title: "Node.js Crash Course",
            date: "2023-05-10",
            tags: ["nodejs", "backend"],
          },
        ];
        const filteredVideos = allVideos.filter((video) =>
          video.tags.includes(tag),
        );
        resolve(filteredVideos);
      }, 1000);
    });
  },

  logout: () => {
    // Mock logout function
    console.log("User logged out");
  },
};

// Use mockApi for development, switch to real api for production
const api = process.env.NODE_ENV === "development" ? mockApi : {};

export default api;
