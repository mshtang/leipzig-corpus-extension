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
    <div
      role='tabpanel'
      hidden={value !== index}
      id='word-detail-tab-panel'>
      Value is {value}, Index is {index}, keyword is {keyword}
    </div>
  );
};

export default WordDetailTabPanel;
