import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Card, IconButton, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import React, { useState } from 'react';
import { Source } from '../types/SentenceTypes';
import SourceDetail from './SourceDetail';

interface SentenceDetailProps {
  keyword: string;
  sentence: string;
  source: Source;
}

const SentenceDetail: React.FC<SentenceDetailProps> = React.memo(
  ({ keyword, sentence, source }) => {
    const [toggleShowSource, setToggleShowSource] = useState(false);

    return (
      <Card sx={{ margin: '10px' }}>
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <Typography
            variant='body1'
            align='left'>
            {sentence.split(keyword).map((part, i) => {
              if (i === 0) {
                return part;
              } else {
                return [<strong key={i}>{keyword}</strong>, part];
              }
            })}
            {toggleShowSource && <SourceDetail source={source} />}
          </Typography>
          <IconButton onClick={_e => setToggleShowSource(!toggleShowSource)}>
            {toggleShowSource ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}{' '}
          </IconButton>
        </CardContent>
      </Card>
    );
  }
);

export default SentenceDetail;
