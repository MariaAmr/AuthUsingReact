// auth.ts

type User = {
  username: string;
  password: string;
  email?: string;
};

type JwtToken = {
  token: string;
};

// Mock database
export const usersDB: User[] = [
  { username: "admin", password: "password", email: "admin@example.com" },
];

export async function login(credentials: {
  username: string;
  password: string;
}): Promise<JwtToken> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = usersDB.find(
        (u) =>
          u.username === credentials.username &&
          u.password === credentials.password
      );

      if (user) {
        resolve({ token: `jwt-token-for-${user.username}` });
      } else {
        reject(new Error("Invalid username or password"));
      }
    }, 1000);
  });
}

export async function register(newUser: {
  username: string;
  password: string;
  email?: string;
}): Promise<JwtToken> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userExists = usersDB.some((u) => u.username === newUser.username);

      if (userExists) {
        reject(new Error("Username already exists"));
      } else {
        usersDB.push(newUser);
        resolve({ token: `jwt-token-for-${newUser.username}` });
      }
    }, 1000);
  });
}

export async function logout(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, you would invalidate the token here
      resolve();
    }, 500);
  });
}
