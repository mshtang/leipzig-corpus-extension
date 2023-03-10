import SearchIcon from '@mui/icons-material/Search';
import { Button, Card, List, Stack, TextField } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import projectLogo from '../assets/logo.png';
import { Sentence, SentencesResponse } from '../types/SentenceTypes';
import { getWithTimeout } from '../Utils/getWithTimeout';
import SentenceDetail from './SentenceDetail';

const baseUrl = 'http://api.corpora.uni-leipzig.de/ws';
const REQUEST_TIMEOUT = 5 * 1000; // 15s timeout

const SentencePage: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showLogo, setShowLogo] = useState(true);
  const [content, setContent] = useState<Sentence[] | null>();

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

  return (
    <Stack
      sx={{ height: '100%' }}
      alignItems='center'
      justifyContent='flexStart'
      spacing={4}>
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
      {errorMsg.length !== 0 ? (
        <Card>
          <CardContent>
            <Typography
              variant='h4'
              color='error'>
              {errorMsg}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <List sx={{ overflow: 'auto' }}>
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
        </List>
      )}
    </Stack>
  );
};

export default SentencePage;
