const TripGeneral = ({ tripId }: { tripId: string }) => {
  return (
    <div className='trip-general'>
      <h3>Trip Overview</h3>
      <p>General information about your trip to Rome goes here...</p>

      <section className='trip-highlights'>
        <h4>Highlights</h4>
        <ul>
          <li>Visit the Colosseum</li>
          <li>Tour the Vatican Museums</li>
          <li>Throw a coin in Trevi Fountain</li>
        </ul>
      </section>

      <section className='trip-notes'>
        <h4>Notes</h4>
        <textarea
          placeholder='Add your trip notes here...'
          rows={5}
        ></textarea>
        <button>Save Notes</button>
      </section>
    </div>
  );
};

export default TripGeneral;
