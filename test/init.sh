
brew install node
node -v
npm -v
npm install -g composer-cli
npm install -g generator-hyperledger-composer
npm install -g composer-rest-server
npm install -g yo
npm install -g composer-playground

docker kill $(docker ps -q)

docker rm $(docker ps -aq)

docker rmi $(docker images dev-* -q)

mkdir ~/fabric-tools && cd ~/fabric-tools
curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.zip

export FABRIC_VERSION=hlfv1

cd ~/fabric-tools
./downloadFabric.sh
./startFabric.sh
./createComposerProfile.sh

cd ~/fabric-tools
./stopFabric.sh
./teardownFabric.sh

cd ~/_bcs
git clone https://github.com/cactis/blockchain-cert-sample