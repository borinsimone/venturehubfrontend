import './home.css';

function Popular() {
  return (
    <div className='popular'>
      <div className='title'>Popular</div>
      <div className='slider'>
        <div className='popular-card'>
          <div className='popular-card-image'>
            <img
              src='https://picsum.photos/500'
              alt='Popular'
            />
          </div>
          <div className='popular-card-content'>
            <h3>montagna</h3>
          </div>
        </div>
        <div className='popular-card'>
          <div className='popular-card-image'>
            <img
              src='https://picsum.photos/500'
              alt='Popular'
            />
          </div>
          <div className='popular-card-content'>
            <h3>montagna</h3>
          </div>
        </div>
        <div className='popular-card'>
          <div className='popular-card-image'>
            <img
              src='https://picsum.photos/500'
              alt='Popular'
            />
          </div>
          <div className='popular-card-content'>
            <h3>montagna</h3>
          </div>
        </div>
        <div className='popular-card'>
          <div className='popular-card-image'>
            <img
              src='https://picsum.photos/500'
              alt='Popular'
            />
          </div>
          <div className='popular-card-content'>
            <h3>montagna</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popular;
