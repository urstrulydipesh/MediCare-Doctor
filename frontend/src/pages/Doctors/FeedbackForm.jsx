import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BASE_URL, token } from '../../config';
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify';

const FeedbackForm = ({ doctorId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!rating || !reviewText) {
        throw new Error('Rating & Review Fields are required');
      }

      const res = await fetch(`${BASE_URL}/doctors/${doctorId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, reviewText }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      toast.success(result.message);

      // Reset form
      setRating(0);
      setHover(0);
      setReviewText('');


      if (onSubmit) onSubmit();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmitReview} className="mt-5">
      <div>
        <h3 className='text-headingColor text-[15px] leading-6 font-semibold mb-4'>
          How would you rate the overall experience?
        </h3>
        <div className="flex gap-2 mb-5">
          {[...Array(5).keys()].map((_, index) => {
            const starValue = index + 1;
            return (
              <button
                key={starValue}
                type="button"
                className={`text-[22px] cursor-pointer ${
                  starValue <= (hover || rating) ? 'text-yellowColor' : 'text-gray-400'
                } bg-transparent border-none outline-none`}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setRating(0);
                  setHover(0);
                }}
              >
                <AiFillStar />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-5">
        <h3 className='text-headingColor text-[15px] leading-6 font-semibold mb-4'>
          Share your feedback or suggestions
        </h3>
        <textarea
          className='border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-2 py-3 rounded-md'
          rows={5}
          placeholder='Your Review'
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </div>

      <button
        type='submit'
        className='btn'
        disabled={loading}
      >
        {loading ? <HashLoader size={25} color="#fff" /> : 'Submit Feedback'}
      </button>
    </form>
  );
};

export default FeedbackForm;
