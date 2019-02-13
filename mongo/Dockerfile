FROM mongo

COPY ./data/na-marked-test.csv /na-marked-test.csv
CMD mongoimport -d local -c things --type csv --file na-marked-test.csv --headerline