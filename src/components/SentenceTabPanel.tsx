import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  List,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { Sentence } from '../types/SentenceTypes';
import SentenceDetail from './SentenceDetail';

interface SentenceTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  content: Sentence[] | null;
  showForwardAndBackward: boolean;
  errorMsg: string;
  keyword: string;
  isBackwardDisabled: boolean;
  isForwardDisabled: boolean;
  onBackwardClick: (e: React.MouseEvent<HTMLElement>) => void;
  onForwardClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const SentenceTabPanel: React.FC<SentenceTabPanelProps> = ({
  value,
  index,
  content,
  showForwardAndBackward,
  errorMsg,
  keyword,
  isBackwardDisabled,
  isForwardDisabled,
  onBackwardClick,
  onForwardClick,
}: SentenceTabPanelProps) => {
  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id='sentence-tab-panel'
      sx={{ height: '600px', overflow: 'auto' }}>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'>
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
          <List>
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
        {showForwardAndBackward && (
          <Stack
            direction='row'
            spacing='60px'>
            <IconButton
              disabled={isBackwardDisabled}
              onClick={onBackwardClick}>
              <ChevronLeft fontSize='large' />
            </IconButton>
            <IconButton
              disabled={isForwardDisabled}
              onClick={onForwardClick}>
              <ChevronRight fontSize='large' />
            </IconButton>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default SentenceTabPanel;
