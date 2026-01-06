# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_22
    pkgs.git-lfs
    pkgs.docker
    pkgs.docker-compose
  ];
  # Sets environment variables in the workspace
  env = {
    VITE_FRONTEND_URL="http://localhost:5173";
    VITE_STRIPE_PUBLISHABLE_KEY="pk_test_...";
    STRIPE_SECRET_KEY="sk_test_...";
    VITE_MERCADOPAGO_PUBLIC_KEY="TEST-a445eb7c-69bb-485b-92cb-a822836cb38c";
    MERCADOPAGO_ACCESS_TOKEN="TEST-843240138881586-121900-c7c3fe2c2bef2144e609c6186b532c7b-458341662";
    PORT="4242";
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
      "google.gemini-cli-vscode-ide-companion"
    ];
    workspace = {
      # Runs when a workspace is first created with this `dev.nix` file
      onCreate = {
        npm-install = "npm i --no-audit --no-progress --timing";
        # Open editors for the following files by default, if they exist:
        default.openFiles = [ "src/App.tsx" "src/App.ts" "src/App.jsx" "src/App.js" ];
      };
      # To run something each time the workspace is (re)started, use the `onStart` hook
      onStart = {};
    };
    # Enable previews and customize configuration
    previews = {
      enable = true;
    };
  };
}
