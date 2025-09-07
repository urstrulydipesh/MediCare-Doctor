import { useState, useEffect } from 'react';
import { formatDate } from '../../utils/formatDate';
import { AiFillStar } from 'react-icons/ai';
import FeedbackForm from './FeedbackForm';
import avatar from '../../assets/images/avatar-icon.png';
import { BASE_URL, token } from '../../config';

const Feedback = ({ doctorId }) => {
  const [reviews, setReviews] = useState([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [avgRating, setAvgRating] = useState(0);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorId}/reviews`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setReviews(data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [doctorId]);

  useEffect(() => {
    if (reviews.length > 0) {
      const total = reviews.reduce((sum, r) => sum + r.rating, 0);
      setAvgRating(parseFloat((total / reviews.length).toFixed(1)));
    } else {
      setAvgRating(0);
    }
  }, [reviews]);

  return (
    <div>
      <div className='mb-[50px]'>
        <h4 className='text-[20px] leading-[30px] font-bold text-headingColor mb-[10px]'>
          Average Rating: {avgRating} / 5 ({reviews.length})
        </h4>

        <div className='flex gap-1 mb-5'>
          {[...Array(5).keys()].map((_, i) => (
            <AiFillStar key={i} color={i < Math.round(avgRating) ? '#0067ff' : '#ccc'} />
          ))}
        </div>

        {reviews.map((review, index) => (
          <div key={index} className='flex justify-between gap-10 mb-[30px]'>
            <div className='flex gap-3'>
              <figure className='w-10 h-10 rounded-full overflow-hidden'>
                <img
                  src={review.user?.photo || avatar}
                  alt={review.user?.name || 'User'}
                  className='w-full h-full object-cover'
                />
              </figure>
              <div>
                <h5 className='text-[16px] leading-6 text-primaryColor font-bold'>
                  {review.user?.name || 'Anonymous'}
                </h5>
                <p className='text-[14px] leading-6 text-textColor'>
                  {formatDate(review.createdAt)}
                </p>
                <p className='text__para mt-3 font-medium text-[15px]'>{review.reviewText}</p>
              </div>
            </div>
            <div className='flex gap-1'>
              {[...Array(review.rating).keys()].map((_, i) => (
                <AiFillStar key={i} color='#0067ff' />
              ))}
            </div>
          </div>
        ))}
      </div>

      {!showFeedbackForm && (
        <div className='text-center'>
          <button className='btn' onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}

      {showFeedbackForm && (
        <FeedbackForm
          doctorId={doctorId}
          onSubmit={() => {
            fetchReviews(); 
            setShowFeedbackForm(false);
          }}
        />
      )}
    </div>
  );
};

export default Feedback;
