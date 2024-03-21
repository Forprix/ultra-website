#!/bin/bash
BLACK="\033[0;30m"
DARKRED="\033[0;31m"
DARKGREEN="\033[0;32m"
DARKYELLOW="\033[0;33m"
DARKBLUE="\033[0;34m"
DARKPURPLE="\033[0;35m"
DARKCYAN="\033[0;36m"
GRAY="\033[0;37m"
RESET="\033[39m"

DARKGRAY="\033[0;30m"
RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
BLUE="\033[0;34m"
PURPLE="\033[0;35m"
CYAN="\033[0;36m"
WHITE="\033[0;37m"

if [ "$1" == '--help' ] || [ "$1" == '-h' ] || [ "$1" == '-H' ]; then
    printf "Options:\n"
    printf "      --docker  Start in production mode inside docker container\n"
    printf "      --detach  Start in production mode inside detached docker container\n"
    printf "      --prod    Start in production mode on current machine\n"
    printf "      --dev     Start in development mode on current machine\n"
    exit 0
fi

if [ "$1" == '--detach' ]; then
    cd ./project/docker
    docker compose up -d --build
    exit 0
elif [ "$1" == '--docker' ]; then
    cd ./project/docker
    docker compose up --build
    exit 0
elif [ "$1" == '--prod' ]; then
    cd ./project/code
    ./prod.sh
    exit 0
elif [ "$1" == '--dev' ]; then
    cd ./project/code
    ./dev.sh
    exit 0
fi

printf "${CYAN}NOTE: If you want to start faster, check out args: \"./start.sh --help\"\n"
echo ""
printf "${GREEN}1${RESET}. Host for production via Docker\n"
printf "${GREEN}2${RESET}. Host for production on current machine\n"
printf "${GREEN}3${RESET}. Host for development on current machine\n"
while true; do
    printf "${RESET}Select (${GREEN}1${RESET}/${GREEN}2${RESET}/${GREEN}3${RESET}): ${GREEN}"
    read -n1 -r -p "" input
    printf "\n"
    if [ "$input" == "1" ]; then
        printf "\033[F\033[2K\033[F\033[2K\033[F\033[2K\033[F\033[2K"
        printf "${GREEN}Hosting for production via Docker...\n${RESET}"
        if [ -x "$(command -v docker)" ]; then
            while true; do
                printf "${RESET}Run container in background? (${GREEN}y${RESET}/${GREEN}n${RESET}): ${GREEN}"
                read -n1 -r -p "" input
                printf "\n"
                if [ "$input" == "y" ] || [ "$input" == "Y" ]; then
                    printf "\033[F\033[2K"  
                    printf "${GREEN}Running container in background...\n${RESET}"
                    cd ./project/docker
                    docker compose up -d --build
                    read -n 1 -s -r -p "Press any key..."
                    break
                elif [ "$input" == "n" ] || [ "$input" == "N" ]; then
                    printf "\033[F\033[2K"
                    printf "${GREEN}Running container attached to current terminal...\n${RESET}"
                    cd ./project/docker
                    docker compose up --build
                    read -n 1 -s -r -p "Press any key..."
                    break
                else
                    printf "\033[F\033[2K"
                    printf "${RED}Wrong option. "
                fi
            done
        else
            printf "${RED}Whew! ${WHITE}You don't seem to have Docker\n${RESET}"
            if [[ "$OSTYPE" == "msys" ]]; then
                printf "${BLUE}https://www.docker.com/products/docker-desktop/\n${RESET}"
            fi
            printf "${RESET}Install Docker and run this file again.\n"
            read -n 1 -s -r -p "Press any key..."
        fi
        break
    elif [ "$input" == "2" ]; then
        printf "\033[F\033[2K\033[F\033[2K\033[F\033[2K\033[F\033[2K"
        printf "${GREEN}Hosting for production on current machine...\n${RESET}"
        cd ./project/code
        ./prod.sh
        read -n 1 -s -r -p "Press any key..."
        break
    elif [ "$input" == "3" ]; then
        printf "\033[F\033[2K\033[F\033[2K\033[F\033[2K\033[F\033[2K"
        printf "${GREEN}Hosting for development on current machine...\n${RESET}"
        cd ./project/code
        ./dev.sh
        read -n 1 -s -r -p "Press any key..."
        break
    else
        printf "\033[F\033[2K"
        printf "${RED}Wrong option. "
    fi
done