#!/bin/bash

export ASDF_DATA_DIR=$HOME/.asdf
export ASDF_INIT=$ASDF_DATA_DIR/asdf.sh
export ASDF_COMPLETIONS=$ASDF_DATA_DIR/completions/asdf.bash

plugins=(skaffold nodejs)

install_asdf(){
  if [ -d "$ASDF_DATA_DIR" ]; then
    echo "ASDF version manager already exists"
  else
    git clone https://github.com/asdf-vm/asdf.git "$ASDF_DATA_DIR" --branch v0.7.7
    
    chmod +x $ASDF_INIT
    chmod +x $ASDF_COMPLETIONS
  fi
  source $ASDF_INIT
}

install_asdf_plugins() {
  should_install=0
  
  for plugin in ${plugins[@]}; do
    if ! asdf current $plugin &>/dev/null; then
      should_install=1
      asdf plugin-add $plugin "https://github.com/$PROJECT_ORGANIZATION/asdf-$plugin" &>/dev/null
      hande_specific_dependency_behavior $plugin
    fi
  done
  
  if [ $should_install -eq 1 ]; then
    asdf install
  fi
}

hande_specific_dependency_behavior(){
  local plugin=$1
  case $plugin in
    
    "nodejs")
      # Import the Node.js release team's OpenPGP keys to main keyring:
      bash "$ASDF_DATA_DIR/plugins/nodejs/bin/import-release-team-keyring"
    ;;
    
    *)
    ;;
  esac
}

install_asdf
install_asdf_plugins

unset plugin plugins