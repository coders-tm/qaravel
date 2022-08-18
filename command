#/bin/bash
red=`tput setaf 1`
green=`tput setaf 2`
warning=`tput setaf 3`
reset=`tput sgr0`

case "$1" in
  "--init")
        CREATE=yes
        if [ -f ".env" ]; then
            CREATE=no
            echo "${green}You have already ran this, do you want to run it again? (yes/no) ${reset}[${warning}no${reset}]:"
            read CREATE
        fi

        if [ "$CREATE" == "yes" ]; then
            cp .env.example .env
            cp .env.frontend .env.frontend.dev
            yarn install
            composer install
        fi
    ;;
  *)
    echo "${red}[Error] ${reset}You have failed to specify what to do correctly."
    exit 1
    ;;
esac
