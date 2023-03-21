import { Box } from '@mui/material';
import React from 'react';

interface WordDetailTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  content: string;
  keyword: string;
}

const WordDetailTabPanel: React.FC<WordDetailTabPanelProps> = (
  props: WordDetailTabPanelProps
) => {
  const { children, value, index, content, keyword, ...other } = props;
  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      sx={{ height: '600px' }}
      id='word-detail-tab-panel'>
      Value is {value}, Index is {index}, keyword is {keyword}
    </Box>
  );
};

export default WordDetailTabPanel;
