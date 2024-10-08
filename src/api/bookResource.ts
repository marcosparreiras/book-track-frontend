import api, { axiosErroHandler } from ".";

export type Book = {
  author: string;
  title: string;
  description: string;
  id: string;
  imageUrl: string | null;
  publishedAt: string;
};

export type BookWithComments = {
  id: string;
  title: string;
  author: string;
  description: string;
  publishedAt: string;
  imageUrl: string | null;
  comments: {
    id: string;
    content: string;
    rate: number;
    userName: string;
    userAvatar: string | null;
    userId: string | null;
  }[];
};

type CreateBookDTO = {
  author: string;
  title: string;
  publishedAt: string;
  description: string;
};

export async function fetchBooks(input: {
  page: number;
  title: string;
}): Promise<{
  books: Book[];
  page: number;
  pageSize: number;
}> {
  try {
    let path = `/book?page=${input.page}`;
    if (input.title && input.title.length > 0) {
      path = path.concat(`&title=${input.title}`);
    }
    const apiResponse = await api.get(path);
    const { books, page: pageResult, pageSize } = apiResponse.data;
    return { books, page: pageResult, pageSize };
  } catch (error) {
    throw axiosErroHandler(error);
  }
}

export async function getBook(bookId: string): Promise<Book> {
  try {
    const apiResponse = await api.get(`/book/${bookId}`);
    const data = apiResponse.data.book;
    return {
      author: data.author,
      description: data.description,
      id: data.id,
      imageUrl: data.imageUrl,
      publishedAt: new Date(data.publishedAt).toISOString().split("T")[0],
      title: data.title,
    };
  } catch (error: unknown) {
    throw axiosErroHandler(error);
  }
}

export async function updateBook(book: Book, token: string): Promise<void> {
  try {
    const requestBody = {
      author: book.author,
      title: book.title,
      description: book.description,
      publishedAt: book.publishedAt,
    };
    await api.put(`/book/${book.id}`, requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: unknown) {
    throw axiosErroHandler(error);
  }
}

export async function fetchBookWithComments(
  id: string
): Promise<BookWithComments> {
  try {
    const apiResponse = await api.get(`/book/${id}`);
    const data = apiResponse.data;
    return data.book;
  } catch (error: unknown) {
    throw axiosErroHandler(error);
  }
}

export async function deleteBook(bookId: string, token: string): Promise<void> {
  try {
    await api.delete(`/book/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: unknown) {
    throw axiosErroHandler(error);
  }
}

export async function createBook(
  book: CreateBookDTO,
  bookImage: File,
  token: string
): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("author", book.author);
    formData.append("title", book.title);
    formData.append("publishedAt", book.publishedAt);
    formData.append("description", book.description);
    formData.append("bookImage", bookImage);
    const apiResponse = await api.post(`/book`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return apiResponse.data.bookId;
  } catch (error: unknown) {
    throw axiosErroHandler(error);
  }
}
