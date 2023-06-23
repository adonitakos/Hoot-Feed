import React from 'react';
import hootsData from './db/hoots.json';

function HootsFeed() {
  const hoots = hootsData.hoots;

  return (
    <>
      {hoots && (
        <div>
          {hoots.map((hoot, index) => (
            <li key={index} style={{ listStyleType: 'none' }}>
              <div className={hoot.image ? 'card with-image' : 'card'}>
                <div className="card__content">
                  <div className="card__header">
                    <img className="user-image" src={hoot.user_image} alt="User" />
                    <h4 className="hoot-user">{hoot.user}</h4>
                  </div>
                  <p className="hoot-message">{hoot.message}</p>
                  {hoot.image && (
                    <div className="attachment-container">
                      <img 
                        className="attachment-img" src={hoot.image} />
                    </div>
                  )}
                  <div className="date-time-container">
                    <h6 className="date-time">{hoot.time} • {hoot.date}</h6>
                  </div>
                </div>
              </div>
              <br />
            </li>
          ))}
        </div>
      )}
      {/* Yes Aayana, I put the CSS in here. I will worry about it later lol */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

        .card {
          width: 500px;
          height: 230px;
          border-radius: 20px;
          padding: 5px;
          box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
          background-image: linear-gradient(144deg, #AF40FF, #5B42F3 50%, #00DDEB);
        }

        .card.with-image {
          height: 360px; /* Increase the height to accommodate the image */
        }

        .card__content {
          background: #e6e6e8;
          border-radius: 17px;
          width: 100%;
          height: 100%;
          position: relative; /* Add position relative to allow absolute positioning of child elements */
        }

        .card__header {
          display: flex;
          align-items: center;
        }

        .card__header .user-image {
          margin-right: 8px;
          margin-left: 8px;
          margin-top: 4px;
        }

        .user-image {
          border-radius: 50px;
          width: 12%;
        }

        .hoot-user, .hoot-message, .date-time {
          padding-left: 6px;
          font-family: 'Poppins', sans-serif;
        }

        .hoot-message {
          font-size: 12.5px;
          padding-bottom: 0px;
          margin-bottom: 0px;
          position: absolute;
          max-width: 490px;
        }

        .hoot-message.with-image {
          bottom: 80px;
        }

        .hoot-message.without-image {
          bottom: 40px;
        }

        .attachment-container img {
          width: 25%;
          justify-content: left;
          padding-top: 96px;
          padding-left: 5px;
        }

        .date-time-container {
          position: absolute;
          bottom: -10px; /* Adjust the bottom position to make it touch the border of the card */
          padding-left: 5px;
        }
      `}</style>
    </>
  );
}

export default HootsFeed;