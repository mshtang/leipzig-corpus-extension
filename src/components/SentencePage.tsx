import { Tab, Tabs } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Sentence, SentencesResponse } from '../types/SentenceTypes';
import { getWithTimeout } from '../Utils/getWithTimeout';
import SearchBox from './SearchBox';
import SentenceTabPanel from './SentenceTabPanel';
import WordDetailTabPanel from './WordDetailTabPanel';

const baseUrl = 'http://api.corpora.uni-leipzig.de/ws';
const REQUEST_TIMEOUT = 5 * 1000; // 15s timeout

interface SentencePageProps {
  corpus: string;
  numToShow: number;
}

const SentencePage: React.FC<SentencePageProps> = ({ corpus, numToShow }) => {
  const [keyword, setKeyword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [sentenceCount, setSentenceCount] = useState(0);
  const [content, setContent] = useState<Sentence[] | null>(null);
  const [tabIndex, setTabIndex] = useState(0);

  const handleButtonClick = async () => {
    console.log('handleButtonClick called');
    if (keyword === '') {
      window.open(
        'https://corpora.uni-leipzig.de/de?corpusId=deu_newscrawl-public_2018',
        '_blank'
      );
      return;
    }
    const queryUrl = `${baseUrl}/sentences/${corpus}/sentences/${keyword}?offset=0&limit=${numToShow}`;
    console.log('queryUrl is', queryUrl);

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
      setSentenceCount(data.count);
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

  function handleEnterPressed(key: string): void {
    if (key !== 'Enter') {
      return;
    }
    handleButtonClick();
  }

  function handleTabChange(_e: React.SyntheticEvent, newIndex: number) {
    setTabIndex(newIndex);
  }

  function handleSearchTextChanged(
    e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>
  ): void {
    const value = e.currentTarget.value;
    setKeyword(value);
    if (value.length === 0) {
      setErrorMsg('');
      setSentenceCount(0);
      setContent(null);
    }
  }

  return (
    <Box
      flexDirection='column'
      display='flex'
      justifyContent='center'>
      <SearchBox
        keyword={keyword}
        onTextChanged={handleSearchTextChanged}
        onButtonClick={handleButtonClick}
        onEnterPressed={handleEnterPressed}
      />
      {sentenceCount > 0 && (
        <Typography>Statistics: {sentenceCount} sentences found.</Typography>
      )}
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabIndex}
            variant='fullWidth'
            onChange={handleTabChange}>
            <Tab label='Sentences' />
            <Tab label='Word Detail' />
          </Tabs>
        </Box>
        <SentenceTabPanel
          value={tabIndex}
          index={0}
          content={content}
          errorMsg={errorMsg}
          keyword={keyword}
        />
        <WordDetailTabPanel
          value={tabIndex}
          index={1}
          content={'hello world!'}
          keyword={keyword}
        />
      </Box>
    </Box>
  );
};

export default SentencePage;
