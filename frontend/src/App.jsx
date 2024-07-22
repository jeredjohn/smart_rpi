import { useState } from 'react';
import Modal from './Modal';

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => setShowModal(!showModal);

  return (
    <div className="container">
      <button type="button" onClick={handleClick}>
        Open
      </button>
      {showModal && <Modal />}
    </div>
  );
};

export default App;
