FROM ubuntu:20.04

RUN apt-get update && apt-get install -y git build-essential wget
RUN wget https://github.com/mikefarah/yq/releases/download/v4.24.4/yq_linux_amd64 -O /usr/bin/yq && chmod +x /usr/bin/yq

COPY install-golang.sh install-golang.sh

RUN sh install-golang.sh

ENV GOROOT /usr/local/go
ENV GOPATH /go
ENV GOBIN /go/bin
ENV PATH $GOBIN:$GOROOT/bin:$PATH

RUN git clone https://github.com/bitsongofficial/go-bitsong

WORKDIR /go-bitsong

# Change the commit hash if you want.
RUN git fetch && git checkout testnet

# Build daemon.
RUN make build

WORKDIR /go-bitsong/build

RUN ./bitsongd init localnet --chain-id localnet-1

# change by bitsong
RUN yq eval '.consensus_params.block.max_bytes = "10485760"' ~/.bitsongd/config/genesis.json \
    | yq eval '.consensus_params.block.max_gas = "120000000"' - \
    | yq eval '.evidence.max_age_num_blocks = "403200"' - \
    | yq eval '.evidence.max_age_duration = "1209600000000000"' - \
    | yq eval '.app_state.crisis.constant_fee.denom = "ubtsg"' - \
    | yq eval '.app_state.crisis.constant_fee.amount = "500000000000"' - \
    | yq eval '.app_state.gov.deposit_params.min_deposit.[0].denom = "ubtsg"' - \
    | yq eval '.app_state.gov.deposit_params.min_deposit.[0].amount = "500000000"' - \
    | yq eval '.app_state.gov.deposit_params.max_deposit_period = "1209600s"' - \
    | yq eval '.app_state.gov.voting_params.voting_period = "259200s"' - \
    | yq eval '.app_state.gov.tally_params.quorum = "0.200000000000000000"' - \
    | yq eval '.app_state.gov.tally_params.quorum = "0.200000000000000000"' - \
    | yq eval '.app_state.mint.params.mint_denom = "ubtsg"' - \
    | yq eval '.app_state.slashing.params.signed_blocks_window = "30000"' - \
    | yq eval '.app_state.slashing.params.min_signed_per_window = "0.050000000000000000"' - \
    | yq eval '.app_state.slashing.params.downtime_jail_duration = "60s"' - \
    | yq eval '.app_state.slashing.params.slash_fraction_downtime = "0.000000000000000000"' - \
    | yq eval '.app_state.staking.params.unbonding_time = "1209600s"' - \
    | yq eval '.app_state.staking.params.max_validators = 100' - \
    | yq eval '.app_state.staking.params.bond_denom = "ubtsg"' - \
    | yq eval '.app_state.txfees.basedenom = "ubtsg"' - \
    | yq eval '' -j - \
    > ~/.bitsongd/config/genesis.tmp.json
RUN mv ~/.bitsongd/config/genesis.tmp.json ~/.bitsongd/config/genesis.json

RUN sed -i 's#tcp://127.0.0.1:26657#tcp://0.0.0.0:26657#g' ~/.bitsongd/config/config.toml
RUN sed -i 's/cors_allowed_origins = \[\]/cors_allowed_origins = \["*"\]/g' ~/.bitsongd/config/config.toml
RUN sed -i 's/timeout_commit = "5s"/timeout_commit = "1s"/g' ~/.bitsongd/config/config.toml
RUN sed -i 's/seeds = ".*"/seeds = ""/g' ~/.bitsongd/config/config.toml
RUN sed -i 's/pruning = "default"/pruning = "nothing"/g' ~/.bitsongd/config/app.toml
RUN sed -i 's/enable = false/enable = true/g' ~/.bitsongd/config/app.toml
RUN sed -i 's/swagger = false/swagger = true/g' ~/.bitsongd/config/app.toml
RUN sed -i 's/enabled-unsafe-cors = false/enabled-unsafe-cors = true/g' ~/.bitsongd/config/app.toml

RUN echo "high gain deposit chuckle hundred regular exist approve peanut enjoy comfort ride" | ./bitsongd keys add val --recover --keyring-backend test
RUN echo "health nest provide snow total tissue intact loyal cargo must credit wrist" | ./bitsongd keys add local1 --recover --keyring-backend test
RUN echo "canyon stone next tenant trial ugly slim luggage ski govern outside comfort" | ./bitsongd keys add local2 --recover --keyring-backend test
RUN echo "travel renew first fiction trick fly disease advance hunt famous absurd region" | ./bitsongd keys add local3 --recover --keyring-backend test

RUN ./bitsongd add-genesis-account $(./bitsongd keys show val -a --keyring-backend test) 10000000000ubtsg
RUN ./bitsongd add-genesis-account $(./bitsongd keys show local1 -a --keyring-backend test) 10000000000ubtsg
RUN ./bitsongd add-genesis-account $(./bitsongd keys show local2 -a --keyring-backend test) 10000000000ubtsg
RUN ./bitsongd add-genesis-account $(./bitsongd keys show local3 -a --keyring-backend test) 10000000000ubtsg

RUN ./bitsongd gentx val 10000000000ubtsg --chain-id localnet-1 --keyring-backend test
RUN ./bitsongd collect-gentxs

EXPOSE 26657
EXPOSE 1317
EXPOSE 9090
COPY . .
CMD ./bitsongd start --trace