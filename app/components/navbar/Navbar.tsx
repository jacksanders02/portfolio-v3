export default function Navbar(): React.ReactElement {
  return (
    <nav className="p-4 px-32 flex justify-center md:justify-between items-center">
      <a className="text-3xl text-left leading-[0.75] w-fit limelight-regular" href="/">
        <span className="tracking-[0.45em]">JACK</span>
        <br />
        <span className="tracking-[-0.1em]">SANDERS</span>
      </a>

      <div className="hidden md:flex justify-between gap-16 lg:w-2/5 text-xl font-medium">
        <a href="/about">About</a>
        <a href="/projects">Projects</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  );
} 