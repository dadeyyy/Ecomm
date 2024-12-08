import { backendUrl } from '../lib/backendUrl';
type submitCommentType = {
  productId: number;
  accessToken: string;
  comment: string;
};

export const  fetchComments = async (productId: number, accessToken: string) => {
  try {
    const req = await fetch(`${backendUrl}/comments/product/${productId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      credentials: 'include',
    });
    const data = await req.json();
    if (data.length === 0) {
      return null;
    }
    return data;
  } catch (e) {
    throw e;
  }
};

export const submitComment = async (submit: submitCommentType) => {
  try {
    const req = await fetch(`${backendUrl}/comments/${submit.productId}`, {
      headers: {
        Authorization: `Bearer ${submit.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment: submit.comment }),
      credentials: 'include',
      method: 'POST',
    });

    if (!req.ok) {
      throw new Error('Failed to add comment! Try again later');
    }
    return req;
  } catch (e) {
    throw e;
  }
};
