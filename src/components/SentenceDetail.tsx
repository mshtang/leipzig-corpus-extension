import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    <div className='card sentenceCard'>
      <div className='contentText'>
        {sentence.split(keyword).map((part, i) => {
          if (i === 0) {
            return part;
          } else {
            return [<strong key={i}>{keyword}</strong>, part];
          }
        })}
        {toggleShowSource && <SourceDetail source={source} />}
      </div>
      <div onClick={e => setToggleShowSource(!toggleShowSource)}>
        {toggleShowSource ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}{' '}
      </div>
    </div>
  );
};

export default SentenceDetail;
