import api, { axiosErroHandler } from ".";

export async function createComment(
  input: { content: string; rate: number },
  bookId: string,
  token: string
): Promise<void> {
  try {
    await api.post(`/book/${bookId}/comment`, input, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: unknown) {
    throw axiosErroHandler(error);
  }
}

export async function deleteComment(
  commentId: string,
  token: string
): Promise<void> {
  try {
    await api.delete(`/comment/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: unknown) {
    throw axiosErroHandler(error);
  }
}
