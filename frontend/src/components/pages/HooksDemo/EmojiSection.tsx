import React, { forwardRef } from "react";

type Props = {
  title: string;
  description: string;
  notes?: string[];
  emoji: string;
  onClick?: (emoji: string) => void;
};

// React.forwardRef https://reactjs.org/docs/react-api.html#reactforwardref
// forwardRef allows us to forward a passed ref attribute further down the
// the DOM tree.
const EmojiSection = forwardRef<HTMLDivElement, Props>(
  (
    { title, description, notes, emoji, onClick }: Props,
    ref,
  ): React.ReactElement => {
    function handleClick() {
      if (onClick) {
        onClick(emoji);
      }
    }

    return (
      <div className="section-root" ref={ref} onClick={handleClick}>
        <h3>{title}</h3>
        <div className="section-body">
          <div className="section-emoji">{emoji}</div>
          <p className="section-description">{description}</p>
        </div>
        {notes && (
          <>
            <div>Notes: </div>
            <ul>
              {notes.map(
                (note: string, i: number): React.ReactElement => (
                  <li key={i}>{note}</li>
                ),
              )}
            </ul>
          </>
        )}
      </div>
    );
  },
);

// This is necessary because we are using forwardRef.
EmojiSection.displayName = "EmojiSection";

// React.memo https://reactjs.org/docs/react-api.html#reactmemo
// React.memo prevents the component passed in from re-rendering if
// its props have not changed. Note that it only performs a shallow
// comparison on each prop.
export default React.memo(EmojiSection);
