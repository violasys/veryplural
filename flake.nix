{
  description = "very plural";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    rust-overlay.url = "github:oxalica/rust-overlay";
  };

  outputs = { nixpkgs, flake-utils, rust-overlay, ... }:
    flake-utils.lib.eachDefaultSystem (system: {
      devShell =
        let
          pkgs = import nixpkgs {
            inherit system;
            overlays = [ rust-overlay.overlay ];
          };
        in
        pkgs.mkShell {
          buildInputs = with pkgs; [
            nodePackages.create-react-app
            nodePackages.expo-cli
            nodePackages.typescript
            nodejs
            yarn
          ];
        };
    });
}
