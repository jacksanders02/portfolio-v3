import { useEffect, useRef} from 'react';
import type { ReactNode, ReactElement } from 'react';
import type { Route } from '../../+types/root';

const links: Route.LinksFunction = () => [
  {
    // Fonts from Google fonts
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

const ShiftingText = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fonts = [
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

    const things = [
      'stuff',
      'things',
      'websites',
      'apps',
      'databases',
      'tools',
      'experiences',
      'solutions',
    ];

    const intervalId = setInterval(() => {
      if (!textRef.current) return;

      textRef.current.style.opacity = '0';

      setTimeout(() => {
        if (!textRef.current) return;

        const fontIndex = Math.floor(Math.random() * fonts.length);
        const thingIndex = Math.floor(Math.random() * things.length);

        textRef.current.style.fontFamily = fonts[fontIndex];
        textRef.current.textContent = things[thingIndex];

        textRef.current.style.opacity = '1';
      }, 500); // Wait until opcacity transition completes before changing anything
    }, 3000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <span ref={textRef} className='transition-opacity duration-500' style={{ fontFamily: 'Aladin' }}>
      {children}
    </span>
  );
};

export default ShiftingText;
export { links };
