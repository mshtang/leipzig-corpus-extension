import { Box } from '@mui/material';
import Typography from '@mui/material/Typography/Typography';
import React from 'react';

interface WordDetailTabPanelProps {
  value: number;
  index: number;
  word: string;
  wordFreq: number;
  wordRank: number;
}

// http://api.corpora.uni-leipzig.de/ws/words/deu_news_2012_1M/word/der
// {
//   "freq": 0,
//   "frequencyClass": 0,
//   "id": 0,
//   "word": "string",
//   "wordRank": 0
// }

const WordDetailTabPanel: React.FC<WordDetailTabPanelProps> = ({
  value,
  index,
  word,
  wordFreq,
  wordRank,
}: WordDetailTabPanelProps) => {
  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      sx={{ height: '600px' }}
      id='word-detail-tab-panel'>
      <Typography variant='h3'>Keyword: {word}</Typography>
      <Typography variant='h4'>Frequency: {wordFreq}</Typography>
      <Typography variant='h4'>Word Rank: {wordRank}</Typography>
    </Box>
  );
};

export default WordDetailTabPanel;
