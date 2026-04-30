import { InlineMath, BlockMath } from 'react-katex';

export default function MathText({ text }: { text: string }) {
  if (!text) return null;

  const parts = text.split(/(\\\(.*?\\\)|\\\[.*?\\\])/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('\\(') && part.endsWith('\\)')) {
return <InlineMath key={i} math={part.slice(2, -2)} errorColor="red" />;
        }

        if (part.startsWith('\\[') && part.endsWith('\\]')) {
          return <BlockMath key={i} math={part.slice(2, -2)} />;
        }

        return <span key={i}>{part}</span>;
      })}
    </>
  );
}