import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, useState } from 'react';
import './App.css';
import projectLogo from './assets/logo.png';
import SentenceDetail from './components/SentenceDetail';
import { Source } from './components/SourceDetail';
import { getWithTimeout } from './Utils/getWithTimeout';

const baseUrl = 'http://api.corpora.uni-leipzig.de/ws';
const REQUEST_TIMEOUT = 5 * 1000; // 15s timeout

interface Sentence {
  id: string;
  sentence: string;
  source: Source;
}

interface SentencesResponse {
  count: number;
  sentences: Sentence[];
}

function App() {
  const [keyword, setKeyword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [content, setContent] = useState<Sentence[] | null>();

  const handleClick = async () => {
    const queryUrl = `${baseUrl}/sentences/deu_news_2012_1M/sentences/${keyword}?offset=10&limit=10`;
    try {
      const response = await getWithTimeout(queryUrl, {
        timeout: REQUEST_TIMEOUT,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      console.log('response: ', response);
      const data: SentencesResponse = await response.json();
      if (!data) {
        setErrorMsg('No response from server.');
        return;
      }

      if (data.count === 0) {
        setErrorMsg('No sentence containing the searching word is found.');
        return;
      }
      setErrorMsg('');
      setContent(data.sentences);
      console.log('data: ', data);
    } catch (e: unknown) {
      console.error('[fetch ERROR]', e);
      if (e instanceof Error && e?.name === 'AbortError') {
        setErrorMsg('timeoutError');
      } else {
        setErrorMsg('internalServerError');
      }
    }
  };

  function handleSearchKeywordChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;
    setKeyword(value);
    if (value.length === 0) {
      setErrorMsg('');
      setContent(null);
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
            onChange={e => {
              handleSearchKeywordChange(e);
            }}></input>
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
      {errorMsg.length !== 0 ? (
        <div className='card errorMessage'>{errorMsg}</div>
      ) : (
        <div className='content'>
          {content?.map(sentence => {
            return (
              <SentenceDetail
                key={sentence.id}
                keyword={keyword}
                sentence={sentence.sentence}
                source={sentence.source}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
