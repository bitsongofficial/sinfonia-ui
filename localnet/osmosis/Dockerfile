FROM ubuntu:20.04

RUN apt-get update && apt-get install -y git build-essential wget
RUN wget https://github.com/mikefarah/yq/releases/download/v4.24.4/yq_linux_amd64 -O /usr/bin/yq && chmod +x /usr/bin/yq

COPY install-golang.sh install-golang.sh

RUN sh install-golang.sh

ENV GOROOT /usr/local/go
ENV GOPATH /go
ENV GOBIN /go/bin
ENV PATH $GOBIN:$GOROOT/bin:$PATH

RUN git clone https://github.com/osmosis-labs/osmosis

WORKDIR /osmosis

# Change the commit hash if you want.
RUN git fetch && git checkout v7.0.2

# Build daemon.
RUN make build

WORKDIR /osmosis/build

RUN ./osmosisd init localnet --chain-id localnet-1

# change by bitsong
RUN yq eval '.consensus_params.block.max_bytes = "10485760"' ~/.osmosisd/config/genesis.json \
    | yq eval '.consensus_params.block.max_gas = "120000000"' - \
    | yq eval '.evidence.max_age_num_blocks = "403200"' - \
    | yq eval '.evidence.max_age_duration = "1209600000000000"' - \
    | yq eval '.app_state.crisis.constant_fee.denom = "uosmo"' - \
    | yq eval '.app_state.crisis.constant_fee.amount = "500000000000"' - \
    | yq eval '.app_state.distribution.params.community_tax = "0.000000000000000000"' - \
    | yq eval '.app_state.distribution.params.base_proposer_reward = "0.000000000000000000"' - \
    | yq eval '.app_state.distribution.params.bonus_proposer_reward = "0.000000000000000000"' - \
    | yq eval '.app_state.gamm.params.pool_creation_fee.[0].amount = "100000000"' - \
    | yq eval '.app_state.gov.deposit_params.min_deposit.[0].denom = "uosmo"' - \
    | yq eval '.app_state.gov.deposit_params.min_deposit.[0].amount = "500000000"' - \
    | yq eval '.app_state.gov.deposit_params.max_deposit_period = "1209600s"' - \
    | yq eval '.app_state.gov.voting_params.voting_period = "259200s"' - \
    | yq eval '.app_state.gov.tally_params.quorum = "0.200000000000000000"' - \
    | yq eval '.app_state.gov.tally_params.quorum = "0.200000000000000000"' - \
    | yq eval '.app_state.incentives.params.distr_epoch_identifier = "day"' - \
    | yq eval '.app_state.incentives.lockable_durations = ["86400s", "604800s", "1209600s"]' - \
    | yq eval '.app_state.mint.params.mint_denom = "uosmo"' - \
    | yq eval '.app_state.mint.params.epoch_identifier = "day"' - \
    | yq eval '.app_state.mint.params.reduction_period_in_epochs = "365"' - \
    | yq eval '.app_state.mint.params.reduction_factor = "0.666666666666666666"' - \
    | yq eval '.app_state.mint.params.distribution_proportions.staking = "0.250000000000000000"' - \
    | yq eval '.app_state.mint.params.distribution_proportions.pool_incentives = "0.450000000000000000"' - \
    | yq eval '.app_state.mint.params.distribution_proportions.developer_rewards = "0.250000000000000000"' - \
    | yq eval '.app_state.mint.params.distribution_proportions.community_pool = "0.050000000000000000"' - \
    | yq eval '.app_state.mint.params.minting_rewards_distribution_start_epoch = "1"' - \
    | yq eval '.app_state.mint.halven_started_epoch = "1"' - \
    | yq eval '.app_state.poolincentives.params.minted_denom = "uosmo"' - \
    | yq eval '.app_state.poolincentives.lockable_durations = ["86400s", "604800s", "1209600s"]' - \
    | yq eval '.app_state.slashing.params.signed_blocks_window = "30000"' - \
    | yq eval '.app_state.slashing.params.min_signed_per_window = "0.050000000000000000"' - \
    | yq eval '.app_state.slashing.params.downtime_jail_duration = "60s"' - \
    | yq eval '.app_state.slashing.params.slash_fraction_downtime = "0.000000000000000000"' - \
    | yq eval '.app_state.staking.params.unbonding_time = "1209600s"' - \
    | yq eval '.app_state.staking.params.max_validators = 118' - \
    | yq eval '.app_state.staking.params.bond_denom = "uosmo"' - \
    | yq eval '.app_state.staking.params.min_commission_rate = "0.050000000000000000"' - \
    | yq eval '.app_state.superfluid.params.minimum_risk_factor = "0.000000000000000000"' - \
    | yq eval '.app_state.txfees.basedenom = "uosmo"' - \
    | yq eval '.app_state.wasm.params.code_upload_access.permission = "Nobody"' - \
    | yq eval '' -j - \
    > ~/.osmosisd/config/genesis.tmp.json
RUN mv ~/.osmosisd/config/genesis.tmp.json ~/.osmosisd/config/genesis.json

RUN sed -i 's#tcp://127.0.0.1:26657#tcp://0.0.0.0:26657#g' ~/.osmosisd/config/config.toml
RUN sed -i 's/cors_allowed_origins = \[\]/cors_allowed_origins = \["*"\]/g' ~/.osmosisd/config/config.toml
RUN sed -i 's/timeout_commit = "5s"/timeout_commit = "1s"/g' ~/.osmosisd/config/config.toml
RUN sed -i 's/seeds = ".*"/seeds = ""/g' ~/.osmosisd/config/config.toml
RUN sed -i 's/pruning = "default"/pruning = "nothing"/g' ~/.osmosisd/config/app.toml
RUN sed -i 's/enable = false/enable = true/g' ~/.osmosisd/config/app.toml
RUN sed -i 's/swagger = false/swagger = true/g' ~/.osmosisd/config/app.toml
RUN sed -i 's/enabled-unsafe-cors = false/enabled-unsafe-cors = true/g' ~/.osmosisd/config/app.toml

RUN echo "high gain deposit chuckle hundred regular exist approve peanut enjoy comfort ride" | ./osmosisd keys add val --recover --keyring-backend test
RUN echo "health nest provide snow total tissue intact loyal cargo must credit wrist" | ./osmosisd keys add local1 --recover --keyring-backend test
RUN echo "canyon stone next tenant trial ugly slim luggage ski govern outside comfort" | ./osmosisd keys add local2 --recover --keyring-backend test
RUN echo "travel renew first fiction trick fly disease advance hunt famous absurd region" | ./osmosisd keys add local3 --recover --keyring-backend test

RUN ./osmosisd add-genesis-account $(./osmosisd keys show val -a --keyring-backend test) 10000000000uosmo,10000000000uatom,10000000000ufoo,10000000000ubar
RUN ./osmosisd add-genesis-account $(./osmosisd keys show local1 -a --keyring-backend test) 10000000000uosmo,10000000000uatom,10000000000ufoo,10000000000ubar
RUN ./osmosisd add-genesis-account $(./osmosisd keys show local2 -a --keyring-backend test) 10000000000uosmo,10000000000uatom,10000000000ufoo,10000000000ubar
RUN ./osmosisd add-genesis-account $(./osmosisd keys show local3 -a --keyring-backend test) 10000000000uosmo,10000000000uatom,10000000000ufoo,10000000000ubar

RUN ./osmosisd gentx val 10000000000uosmo --chain-id localnet-1 --keyring-backend test
RUN ./osmosisd collect-gentxs

EXPOSE 26657
EXPOSE 1317
EXPOSE 9090
CMD ./osmosisd start --trace