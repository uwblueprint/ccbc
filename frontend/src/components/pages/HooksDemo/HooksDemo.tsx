/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-console */

// ***************************************************************
// This page is meant to be a hooks crash course and demo basic
// hook functionality in React.
// To learn more about React hooks and the most up to date
// patterns, check out the official docs at:
//
// https://reactjs.org/docs/hooks-intro.html
//
// Hooks demonstrated on this page:
// * useState
// * useRef
// * useCallback
//
// For an example of a custom hook using useEffect, see:
// https://github.com/uwblueprint/arbitrium/blob/master/src/Hooks/usePromise.ts
// https://github.com/uwblueprint/arbitrium/blob/master/src/Hooks/useAsyncFetch.ts
// ***************************************************************

// ***************************************************************
// FUNCTIONAL COMPONENTS VS. CLASS COMPONENTS
//
// In component classes, we use lifecycle methods such as
// componentDidMount, componentDidUpdate, render, etc. to
// trigger side effects and update / manage the component.
//
// Another way to define a React component is as a function.
// Functional components with hooks remove the boilerplate of
// class components and their lifecycle methods. You can now
// reason about React components as you would any other function.
// Hooks allow us to inject state into functional components,
// and retain values between renders of the component.
// ***************************************************************

import React, { useEffect, useState, useRef, useCallback } from "react";
import EmojiSection from "./EmojiSection";

import { EMOJIS } from "./emojis";
import "./styles.css";

type BannerState = {
  emoji: string;
  showBanner: boolean;
};

const HooksDemo = (): React.ReactElement => {
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const [bannerState, setBannerState] = useState<BannerState>({
    emoji: "",
    showBanner: false,
  });

  // useRef allows us to store mutable, persistent values between
  // renders. Here we store an array of HTMLDivElement refs so
  // we can scroll each section into view.
  const sectionRefs = useRef<React.RefObject<HTMLDivElement>[]>(
    new Array(EMOJIS.length).fill(React.createRef()),
  );

  useEffect(
    () => {
      // useEffect is the most basic and powerful hook. You can use
      // useEffect to build out your own custom hooks.
      //
      // The first parameter of useEffect is a function. useEffect
      // should be used for dealing with side effects that aren't
      // visible, such as data fetching, logging, etc.
      //
      // The second paramter is an array of dependent variables.
      // On each re-render the effect will check if any values in
      // its dependency array has changed, and will only re-run the
      // effect if it determines there's at least one change.
      // All effects will run the first time on mount.
      //
      // As our dependency array below is empty, this effect will only
      // run when the component mounts.
      console.log("Component mounted!");

      function onScroll() {
        // This may seem like we are triggering an update on every scroll,
        // which would be bad.
        // However, the set state function returned by useState actually
        // bails out if a shallow comparison of the previous and next
        // state is the same.
        if (window.pageYOffset > 100) {
          setShowScrollButton(true);
        } else if (window.pageYOffset <= 100) {
          setShowScrollButton(false);
        }
      }

      // Set up a listener for scroll events.
      window.addEventListener("scroll", onScroll);

      return () => {
        // The return value for useEffect callback is an optional
        // cleanup function. Remember to clean up after your effects
        // or risk introducing memory leaks.
        //
        // This function is run on unmount, and on each re-render
        // before running the effect again (i.e. a previously running
        // effect is cleaned up before being re-applied). You can learn
        // more about why cleanup functions are run on each re-render,
        // and how to opt out if desired (ex: performance concerns) at:
        // https://reactjs.org/docs/hooks-effect.html
        window.removeEventListener("scroll", onScroll);
      };
    },
    [] /* dependency array */,
  );

  useEffect(() => {
    if (!bannerState.showBanner) return (): void => {};

    const bannerTimer = setTimeout(() => {
      setBannerState({ emoji: bannerState.emoji, showBanner: false });
      // Show banner for 5 seconds
    }, 5000);

    return (): void => {
      // Recall cleanup functions are automatically applied before
      // applying the effect on a re-render. In this case, we definitely
      // don't want to opt out of that behaviour, as we want to clear the
      // previous timeout before setting a new one.
      clearTimeout(bannerTimer);
    };

    // Note our dependency array contains one value. Thus, this effect
    // will run when the bannerState is changed via setBannerState.
  }, [bannerState]);

  const onSectionClick = useCallback((emoji: string): void => {
    // useCallback is used to memoize callback functions passed to
    // memoized child components or functions that may be used in hooks
    // dependency arrays.
    //
    // A new function is only generated if anything in the
    // dependency array has changed between renders. Without useCallback,
    // a new onSectionClick would be generated every time and we would
    // need to re-render each section, since we are passing in a 'new'
    // prop.
    //
    // The useMemo hook exists for memoizing values instead of functions.
    navigator.clipboard.writeText(emoji);
    setBannerState({ showBanner: true, emoji });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="page-root">
      {showScrollButton && (
        <button
          className="page-scroll-top-button"
          type="button"
          onClick={scrollToTop}
        >
          Scroll to top
        </button>
      )}
      {bannerState.showBanner && (
        <div className="page-banner">
          Copied {bannerState.emoji} to clipboard!
        </div>
      )}
      <div className="page-content">
        <h1>📖 Emoji Dictionary 🧠</h1>
        <h3>Some of Internal Tools&apos; fave emojis 🎉</h3>
        <h5>Click a section to copy the emoji!</h5>
        <div>
          Table of contents:
          <ul className="page-nav">
            {EMOJIS.map((emoji, i: number) => (
              <li
                onClick={() =>
                  sectionRefs.current[i].current?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="page-nav-item"
                key={i}
              >
                {emoji.emoji}
              </li>
            ))}
          </ul>
        </div>
        {EMOJIS.map((emoji, i: number) => (
          <EmojiSection
            ref={sectionRefs.current[i]}
            key={i}
            emoji={emoji.emoji}
            title={emoji.name}
            description={emoji.description}
            notes={emoji.uses}
            onClick={onSectionClick}
          />
        ))}
      </div>
    </div>
  );
};

export default HooksDemo;
