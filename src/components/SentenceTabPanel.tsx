import { Box, Card, CardContent, List, Typography } from '@mui/material';
import React from 'react';
import { Sentence } from '../types/SentenceTypes';
import SentenceDetail from './SentenceDetail';

interface SentenceTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  content: Sentence[] | null;
  errorMsg: string;
  keyword: string;
}

const SentenceTabPanel: React.FC<SentenceTabPanelProps> = (
  props: SentenceTabPanelProps
) => {
  const { children, value, index, content, errorMsg, keyword, ...other } =
    props;
  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id='sentence-tab-panel'
      sx={{ height: '500px' }}>
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
    </Box>
  );
};

export default SentenceTabPanel;
