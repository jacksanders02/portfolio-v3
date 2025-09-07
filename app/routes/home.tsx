import { Fragment, type ReactElement } from 'react';
import ShiftingText, { links } from '~/components/shifting-text/ShiftingText';

const Home = (): ReactElement => (
  <Fragment>
    <title>New React</title>
    <meta name="description" content="Welcome to React Router!" />

    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-7xl text-center flex flex-col gap-3 justify-between">
        I make
        <ShiftingText />
      </h1>
    </div>
  </Fragment>
);

export default Home;
export { links };
