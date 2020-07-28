{ sources ? import ./nix {} }:
let
  inherit (sources)
    lunarispkgs
    nixpkgs
  ;
in
nixpkgs.mkShell rec {
  name = "neptune";
  env = nixpkgs.buildEnv { name = name; paths = buildInputs; };
  buildInputs = [
    # <lunarispkgs>
    lunarispkgs.helm_3_2_1
    lunarispkgs.nodejs_10_19_0
    lunarispkgs.python_3_7_7
    lunarispkgs.skaffold_1_10_1
    # <nixpkgs>
    # ...
  ];
}