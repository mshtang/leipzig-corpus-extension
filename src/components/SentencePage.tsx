import SearchIcon from '@mui/icons-material/Search';
import { Button, Stack, Tab, Tabs, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import projectLogo from '../assets/logo.png';
import { Sentence, SentencesResponse } from '../types/SentenceTypes';
import { getWithTimeout } from '../Utils/getWithTimeout';
import SentenceTabPanel from './SentenceTabPanel';
import WordDetailTabPanel from './WordDetailTabPanel';

const baseUrl = 'http://api.corpora.uni-leipzig.de/ws';
const REQUEST_TIMEOUT = 5 * 1000; // 15s timeout

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const SentencePage: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showLogo, setShowLogo] = useState(true);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [content, setContent] = useState<Sentence[] | null>(null);
  const [tabIndex, setTabIndex] = useState(0);

  const handleClick = async () => {
    const queryUrl = `${baseUrl}/sentences/deu_news_2012_1M/sentences/${keyword}?offset=0&limit=10`;
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

  function handleSearchKeywordChange(
    currentTarget: EventTarget & (HTMLTextAreaElement | HTMLInputElement)
  ) {
    const { value } = currentTarget;
    setKeyword(value);
    if (value.length === 0) {
      setErrorMsg('');
      setSentenceCount(0);
      setContent(null);
      setShowLogo(true);
    } else {
      setShowLogo(false);
    }
  }

  function handleKeyPressed(e: React.KeyboardEvent<HTMLDivElement>): void {
    if (e.key != 'Enter') return;
    handleClick();
  }

  function handleTabChange(_e: React.SyntheticEvent, newIndex: number) {
    setTabIndex(newIndex);
  }

  return (
    <>
      <Stack
        direction='row'
        spacing={2}>
        <TextField
          sx={{ width: '300px' }}
          variant='standard'
          id='searchBox'
          label='Which word do you want to know?'
          onKeyDown={e => handleKeyPressed(e)}
          onChange={e => {
            handleSearchKeywordChange(e.currentTarget);
          }}></TextField>
        {showLogo ? (
          <a
            className='linkToLeipzig'
            href='https://corpora.uni-leipzig.de/de?corpusId=deu_newscrawl-public_2018'
            target='_blank'>
            <img
              className='logo'
              src={projectLogo}
              alt='leipzig corpora extension project logo'
            />
          </a>
        ) : (
          <Button
            onClick={handleClick}
            sx={{
              minWidth: 0,
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#209cee',
              marginLeft: '10px',
            }}
            variant='contained'>
            <SearchIcon
              sx={{ color: 'white' }}
              fontSize='large'
            />
          </Button>
        )}
      </Stack>
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
    </>
  );
};

export default SentencePage;
