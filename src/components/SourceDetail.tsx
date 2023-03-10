import Divider from '@mui/material/Divider';
import React from 'react';
import { Source } from '../types/SentenceTypes';

interface SourceDetailProps {
  source: Source;
}

const SourceDetail: React.FC<SourceDetailProps> = ({ source }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className='sourceText'>
      <Divider variant='middle' />
      <div>Retrieved on: {new Date(source.date).toLocaleDateString()}</div>
      <div>
        From:{' '}
        <span>
          <a
            target='_blank'
            href={source.url}
            onClick={handleLinkClick}>
            {source.url}
          </a>
        </span>
      </div>
    </div>
  );
};

export default SourceDetail;
