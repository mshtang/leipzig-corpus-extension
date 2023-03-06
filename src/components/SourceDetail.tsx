import React from 'react';

export interface Source {
  date: string;
  id: string;
  url: string;
}

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
