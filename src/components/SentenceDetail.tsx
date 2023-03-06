import React, { useState } from 'react';
import SourceDetail, { Source } from './SourceDetail';

interface SentenceDetailProps {
  keyword: string;
  sentence: string;
  source: Source;
}

const SentenceDetail: React.FC<SentenceDetailProps> = ({
  keyword,
  sentence,
  source,
}) => {
  const [toggleShowSource, setToggleShowSource] = useState(false);
  return (
    <div
      className='card contentText'
      onClick={e => setToggleShowSource(!toggleShowSource)}>
      {sentence.split(keyword).map((part, i) => {
        if (i === 0) {
          return part;
        } else {
          return [<strong key={i}>{keyword}</strong>, part];
        }
      })}
      {toggleShowSource && <SourceDetail source={source} />}
    </div>
  );
};

export default SentenceDetail;
