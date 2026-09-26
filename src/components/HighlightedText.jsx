export function HighlightedText({ text, phrase }) {
  let wordIndex = 0;
  return <>{(text.match(/\S+|\s+/g) || []).map((part, index) => {
    if (/^\s+$/.test(part)) return part;
    const order = Math.min(wordIndex++, 6);
    return <span className="motion-word" style={{ "--word-index": order }} key={`${part}-${index}`}>
      <span className="motion-word__inner">{part === phrase ? <mark className="selection-mark">{part}</mark> : part}</span>
    </span>;
  })}</>;
}
