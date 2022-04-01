SAM        		= sam
LINTER     		= eslint
TARGET_DIR		= src
POSTMAN_CONF	= newman/meepa-api-master.postman_collection.json
REPO					= memory

export
DB_TYPE				:= postgres
DB_HOST_DEV		:= 127.0.0.1
POSTGRES_USER			:= testuser
POSTGRES_PASSWORD	:= p
POSTGRES_DB		:= sample
TIMEZONE			:= Asia/Tokyo
REPOSITORY		:= memory
PSQL_DB_PORT	:= 5432
REPOSITORY_TYPE := memory

all: lint build int e2e

lint:
	npx $(LINTER) $(TARGET_DIR)

build:
	npm run build

build-container:
	pack build --builder=gcr.io/buildpacks/builder itotest

run-container:
	docker run -it -ePORT=8080 -p 8080:8080 itotest

test: build
	# npm test
	npx jest

unit:
	npm run test:unit

int:
	npm run test:int

e2e:
	npm run test:e2e

run: build
	nest start

run-with-db: REPOSITORY_TYPE := postgres
run-with-db: build
	echo ${REPOSITORY_TYPE}
	nest start

run-db:
	docker-compose up -d

down-db:
	docker-compose down

restart-mysql: down-mysql run-mysql

push:
	$(DOCKER) push $(DOCKER_CR):$(VERSION)

clean:
	$(DOCKER) rm -f $(TAG)
