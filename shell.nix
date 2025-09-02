{ pkgs ? import <nixpkgs> {}}:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs
  ];


  shellHook = ''
    alias run='npm run'
  '';
}