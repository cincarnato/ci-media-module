## Build Image
* Reemplazar tagname por la version de la imagen (misma version que git)
`docker build -t cincarnato/ci-media:tagname .`

## PUSH Image

`docker push cincarnato/ci-media`

## Docker deploy development with run

`docker run -it --network="host" -p 8888:5000 cincarnato/ci-media`

## Docker deploy with compose

`docker-compose up -d`

## Stack deploy
`docker stack deploy -c docker-compose.yml stackName`