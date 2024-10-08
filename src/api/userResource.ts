import api, { axiosErroHandler } from ".";

export type User = {
  name: string;
  email: string;
  avatarUrl?: string | null;
  token: string;
  id: string;
  isAdmin: boolean;
};

export async function getCurrentUser(input: { token: string }): Promise<User> {
  try {
    const getUserResponse = await api.get("/me", {
      headers: {
        Authorization: `Bearer ${input.token}`,
      },
    });
    const { name, email, avatarUrl, id, isAdmin } = getUserResponse.data;
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof id !== "string" ||
      typeof isAdmin !== "boolean"
    ) {
      throw new Error();
    }
    return {
      name,
      email,
      avatarUrl,
      id,
      isAdmin,
      token: input.token,
    };
  } catch (error: unknown) {
    throw axiosErroHandler(error);
  }
}

export async function updateUserAvatar(
  input: { avatar: File },
  token: string
): Promise<void> {
  try {
    const formData = new FormData();
    formData.append("avatar", input.avatar);
    await api.patch("/me/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: unknown) {
    throw axiosErroHandler(error);
  }
}

export async function loginUser(input: {
  email: string;
  password: string;
}): Promise<{ token: string }> {
  try {
    const response = await api.post("/session", input);
    return { token: response.data.token };
  } catch (error: unknown) {
    throw axiosErroHandler(error);
  }
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
}): Promise<{ userId: string }> {
  try {
    const response = await api.post("/users", input);
    return { userId: response.data.userId };
  } catch (error: unknown) {
    throw axiosErroHandler(error);
  }
}
