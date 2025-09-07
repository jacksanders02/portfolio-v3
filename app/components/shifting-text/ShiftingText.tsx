import { useEffect, useRef } from 'react';
import type { ReactNode, ReactElement } from 'react';
import type { Route } from '../../+types/root';

/**
 * Returns a randomly-chosen integer from a range, excluding one
 * @param exclude the number to exclude
 * @param lower the lower bound of the range
 * @param upper the upper bound of the range
 * @returns a random number between `lower` and `upper`, which will not be `exclude`
 */
const randomRangeExcluding = (exclude: number, lower = 0, upper = 1): number => {
  let initialRandom = Math.floor(lower + Math.random() * (upper - lower - 1));

  // Ensure excluded number is not chosen
  if (initialRandom >= exclude) {
    initialRandom += 1;
  }

  return initialRandom;
};

// Config for shifting text
const FONTS = [
  'Aladin',
  'Condiment',
  'Gloria Hallelujah',
  'Grandstander',
  'Knewave',
  'Permanent Marker',
  'Potta One',
  'Rubik Glitch',
  'Ruslan Display',
  'Slackey',
];

const THINGS = [
  'stuff',
  'things',
  'websites',
  'apps',
  'databases',
  'tools',
  'experiences',
  'solutions',
];

const DISPLAY_TIME = 3000;
const TRANSITION_TIME = 500;

/**
 * Displays text which changes content and font every 3 seconds
 */
const ShiftingText = (): ReactElement => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let thingIndex = 0;

    const intervalId = setInterval(() => {
      if (!textRef.current) return;

      textRef.current.style.opacity = '0';

      setTimeout(() => {
        if (!textRef.current) return;

        const fontIndex = Math.floor(Math.random() * FONTS.length);
        thingIndex = randomRangeExcluding(thingIndex, 0, THINGS.length);

        textRef.current.style.fontFamily = FONTS[fontIndex];
        textRef.current.textContent = THINGS[thingIndex];

        textRef.current.style.opacity = '1';
      }, TRANSITION_TIME); // Wait until opcacity transition completes before changing anything
    }, DISPLAY_TIME);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <span ref={textRef} className={`transition-opacity duration-[${TRANSITION_TIME}ms]`}>
      stuff
    </span>
  );
};

// Import required fonts from google fonts
const links: Route.LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2'
      + '?family=Aladin'
      + '&family=Condiment'
      + '&family=Gloria+Hallelujah'
      + '&family=Grandstander:ital,wght@0,100..900;1,100..900'
      + '&family=Knewave'
      + '&family=Permanent+Marker'
      + '&family=Potta+One'
      + '&family=Rubik+Glitch'
      + '&family=Ruslan+Display'
      + '&family=Slackey'
      + '&display=swap',
  },
];

export default ShiftingText;
export { links };
