import { GetServerSideProps } from 'next';
import apiRequest from './apiRequest';

interface Params {
  id?: string;
}

interface Request {
  url: string;
}

interface ResponseData {
  data: any; // Adjust this type according to your API response structure
}

interface DeferredResponse {
  postResponse: Promise<ResponseData>;
  chatResponse?: Promise<ResponseData>;
}

export const singlePageLoader: GetServerSideProps = async (context) => {
  const { params } = context;
  if (!params || typeof params.id !== 'string') {
    return { notFound: true };
  }

  const res = await apiRequest(`/posts/${params.id}`);
  return {
    props: {
      data: res.data,
    },
  };
};

export const listPageLoader: GetServerSideProps = async (context) => {
  const { req } = context;
  const query = req.url?.split('?')[1] || '';
  const postPromise = apiRequest(`/posts?${query}`);

  return {
    props: {
      postResponse: await postPromise,
    },
  };
};

export const profilePageLoader: GetServerSideProps = async () => {
  const postPromise = apiRequest('/users/profilePosts');
  const chatPromise = apiRequest('/chats');

  return {
    props: {
      postResponse: await postPromise,
      chatResponse: await chatPromise,
    },
  };
};
