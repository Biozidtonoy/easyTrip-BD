
import "../styles/myBookings.css";

const MyBookingsPage = () => {
  return (
    <>
    <main className="my-bookings-page">
      <div className="my-bookings-container">
        <h1>My Bookings</h1>

        <p>
          You haven't made any bookings yet.
        </p>

        <p>
          Your upcoming and previous bookings will
          appear here.
        </p>
      </div>
    </main>
    </>
    
  );
};

export default MyBookingsPage;