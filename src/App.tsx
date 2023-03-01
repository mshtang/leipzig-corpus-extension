import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import './App.css';
import projectLogo from './assets/logo.png';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <div>
        <a
          href='https://reactjs.org'
          target='_blank'>
          <img
            src={projectLogo}
            className='logo react'
            alt='React logo'
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <button>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span>My Button</span>
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
