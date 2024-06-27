import { ChatBubbleBottomCenterTextIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import Rating from '../Rating';

const CommentCard = ({ data }) => {
  return (
    <section className='rounded-lg py-8 lg:py-16'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-lg lg:text-2xl font-bold text-gray-900'>Discussion ({data.length})</h2>
        </div>

        {data.map((comment, index) => (
          <div key={index} className='p-6 text-base rounded-lg my-5 shadow-md'>
            <div className='flex justify-between items-center mb-2'>
              <div className='flex items-center'>
                <p className='inline-flex items-center mr-3 text-sm text-gray-900 font-semibold'>
                  <img
                    className='mr-2 w-6 h-6 rounded-full'
                    src='https://flowbite.com/docs/images/people/profile-picture-2.jpg'
                    alt='Profile'
                  />
                  {comment.reviewerName}
                </p>
                <p className='text-sm text-gray-600'>
                  <time>{new Date(comment.date).toLocaleDateString('en-US')}</time>
                </p>
              </div>
              <button
                className='inline-flex items-center p-2 text-sm font-medium text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50'
                type='button'
              >
                <EllipsisHorizontalIcon className='w-6 h-6 text-black' />
              </button>
            </div>
            <Rating rating={comment.rating} />
            <p className='text-black pt-3'>{comment.comment}</p>
            <div className='flex items-center mt-4 space-x-4'>
              <button type='button' className='flex items-center text-sm text-gray-500 hover:underline font-medium'>
                <ChatBubbleBottomCenterTextIcon className='w-6 h-6 text-gray-500' />
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommentCard;
