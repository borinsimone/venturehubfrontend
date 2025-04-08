import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import '../Home.css';

function Next() {
  return (
    <div className='next-slider'>
      <div className='trip-card'>
        <img
          src='https://picsum.photos/500'
          alt=''
        />
        <div className='text-wrapper'>
          <div className='title'>
            italia
            <BiChevronRight size='25px' />
          </div>
          <div className='date'>10 aprile</div>
        </div>
      </div>
      <div className='trip-card'>
        <img
          src='https://picsum.photos/500'
          alt=''
        />
        <div className='text-wrapper'>
          <div className='title'>
            canada
            <BiChevronRight size='25px' />
          </div>
          <div className='date'>10 aprile</div>
        </div>
      </div>
      <div className='trip-card'>
        <img
          src='https://picsum.photos/500'
          alt=''
        />
        <div className='text-wrapper'>
          <div className='title'>
            canada
            <BiChevronRight size='25px' />
          </div>
          <div className='date'>10 aprile</div>
        </div>
      </div>
      <div className='trip-card'>
        <img
          src='https://picsum.photos/500'
          alt=''
        />
        <div className='text-wrapper'>
          <div className='title'>
            canada
            <BiChevronRight size='25px' />
          </div>
          <div className='date'>10 aprile</div>
        </div>
      </div>
    </div>
  );
}

export default Next;
