import { Tab, Tabs } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
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
  const [offset, setOffset] = useState<number>(0);
  const [disableChevronLeft, setDisableChevronLeft] = useState<boolean>(true);
  const [disableChevronRight, setDisableChevronRight] = useState<boolean>(true);

  useEffect(() => {
    setDisableChevronLeft(offset <= 0);
    setDisableChevronRight(offset + numToShow >= sentenceCount);
  }, [offset, numToShow, sentenceCount]);

  const queryUrl = `${baseUrl}/sentences/${corpus}/sentences/${keyword}?offset=${offset}&limit=${numToShow}`;

  const handleButtonClick = () => {
    console.log('calling handleButtonClick');

    if (keyword === '') {
      window.open(
        'https://corpora.uni-leipzig.de/de?corpusId=deu_newscrawl-public_2018',
        '_blank'
      );
      return;
    }

    console.log('queryUrl is', queryUrl);
    searchKeyword();
  };

  const searchKeyword = async () => {
    if (keyword === '') return;
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

  const handleEnterPressed = (key: string) => {
    if (key !== 'Enter') {
      return;
    }
    searchKeyword();
  };

  const handleTabChange = (_e: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  const handleSearchTextChanged = (
    e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;
    setKeyword(value);
    if (value.length === 0) {
      setErrorMsg('');
      setSentenceCount(0);
      setContent(null);
    }
  };

  const handleDecreaseOffset = (e: React.MouseEvent<HTMLElement>) => {
    setOffset(preOffset => {
      const currOffset = preOffset - numToShow < 0 ? 0 : preOffset - numToShow;
      console.log('decrease offset: ', currOffset);
      return currOffset;
    });
  };

  const handleIncreaseOffset = (e: React.MouseEvent<HTMLElement>) => {
    setOffset(preOffset => {
      const currOffset =
        preOffset + numToShow > sentenceCount
          ? preOffset
          : preOffset + numToShow;
      console.log('increase offset: ', currOffset);
      return currOffset;
    });
  };

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
        <Typography>
          {' '}
          <strong>{sentenceCount}</strong> sentences found, showing{' '}
          <em>
            {offset + 1} -{' '}
            {offset + numToShow < sentenceCount
              ? offset + numToShow
              : sentenceCount}
          </em>
        </Typography>
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
          showForwardAndBackward={sentenceCount > numToShow}
          isBackwardDisabled={disableChevronLeft}
          isForwardDisabled={disableChevronRight}
          onBackwardClick={handleDecreaseOffset}
          onForwardClick={handleIncreaseOffset}
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
