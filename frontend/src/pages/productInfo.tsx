import { useLocation } from 'react-router-dom';
import Comment from '../components/Comment';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { fetchComments, submitComment } from '../services/comments';
import { useErrorBoundary } from 'react-error-boundary';
type TypeProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  imageurl: string;
  stock: number;
};

type TypeComment = {
  id: number;
  user_id: number;
  product_id: number;
  comment_text: string;
  created_at: string;
  updated_at: string;
  username: string;
  email: string;
};

const ProductInfo = () => {
  const auth = useAuth();
  const location = useLocation();
  const product = location.state as TypeProduct;
  const [comments, setComments] = useState<TypeComment[] | null>(null);
  const [value, setValue] = useState('');
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    handleFetchComments();
  }, []);

  async function handleFetchComments() {
    const commentsData = await fetchComments(product.id , auth?.accessToken!);
    setComments(commentsData);
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const addCommentService = await submitComment({
        productId: product.id,
        accessToken: auth?.accessToken!,
        comment: value,
      });

      const data = await addCommentService?.json();
      if (data.success) {
        handleFetchComments();
        toast.success('Comment added!');
      }
      setValue('');
    } catch (e: any) {
      showBoundary(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-5 flex flex-col gap-10">
      <h1 className="text-4xl md:text-left text-center font-semibold">Product Description</h1>
      <div className="p-10 mx-auto bg-gray-100 border border-gray-300 rounded-lg">
        <div className="flex md:flex-row flex-col gap-10 items-center p-5">
          <div className="flex flex-col justify-center items-center gap-5">
            <p className="text-5xl text-center font-bold">{product.name}</p>
            <p className="text-2xl font-bold"> ₱{product.price}</p>
            <p className="opacity-50 font-bold">Stock: {product.stock}</p>
          </div>
          <div className="max-w-sm min-h-sm">
            <img className="rounded-lg" src={product.imageurl} alt="" />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-semibold">Reviews:</h1>
        <div className=" bg-gray-100 p-10 rounded-lg flex md:row flex-col gap-10">
          <div>
            <form>
              <textarea
                value={value}
                onKeyUp={(e) => handleKeyDown(e)}
                onChange={(e) => handleChange(e)}
                className=" w-full border border-gray-300 rounded-lg p-4"
                placeholder="Add a comment"
              />
            </form>
          </div>
          <div className=" flex flex-col gap-5">
            {comments ? (
              comments.map((c) => {
                const date = new Date(c.created_at);

                return <Comment date={date} username={c.username} key={c.id} comment={c.comment_text} />;
              })
            ) : (
              <p>No comment yet!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
