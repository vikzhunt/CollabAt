
import EventsList from '../events/eventlisting';
import Header from '../Homepage/header';

function HomeEvents() {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div className='pt-5 bg-blue-200'>
                <EventsList />
            </div>
        </div>
    );
  }
  
  export default HomeEvents;
  