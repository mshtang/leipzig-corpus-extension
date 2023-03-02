import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import './App.css';
import projectLogo from './assets/logo.png';

function App() {
  const [keyword, setKeyword] = useState('');
  const handleClick = () => {
    getSentences();
  };

  const baseUrl = 'http://api.corpora.uni-leipzig.de/ws';
  async function getSentences() {
    let queryUrl = `${baseUrl}/sentences/deu_news_2012_1M/sentences/${keyword}?offset=10&limit=10`;
    try {
      const response = await fetch(queryUrl);
      console.log('response: ', response);

      const data = await response.json();
      console.log('data: ', data);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  return (
    <div className='App'>
      <div className='header'>
        <div className='logoSection'>
          <a
            href='https://corpora.uni-leipzig.de/de?corpusId=deu_newscrawl-public_2018'
            target='_blank'>
            <img
              className='logo'
              src={projectLogo}
              alt='leipzig corpora extension project logo'
            />
          </a>
        </div>
        <div className='search'>
          <input
            placeholder='Which word do you want to know?'
            className='searchBox'
            onChange={e => setKeyword(e.currentTarget.value)}></input>
          <button
            className='searchIcon'
            onClick={e => {
              e.preventDefault();
              return handleClick();
            }}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              color='#209cee'
            />
          </button>
        </div>
      </div>
      <div className='content'></div>
    </div>
  );
}

export default App;
