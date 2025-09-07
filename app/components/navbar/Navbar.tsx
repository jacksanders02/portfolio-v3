import type { ReactElement } from 'react';
import { Link } from 'react-router';

const Navbar = (): ReactElement => (
  <nav className="fixed w-screen p-4 px-32 flex justify-center md:justify-between items-center">
    <a className="text-3xl text-left leading-[0.75] w-fit limelight-regular" href="/">
      <span className="tracking-[0.45em]">JACK</span>
      <br />
      <span className="tracking-[-0.1em]">SANDERS</span>
    </a>

    <div className="hidden md:flex justify-between gap-16 lg:w-2/5 text-xl font-medium">
      <Link to="/about">About</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/contact">Contact</Link>
    </div>
  </nav>
);

export default Navbar;
