# CR Scoring Microservice

Microservicio para el scoring telefónico de CR Abogados.


### Requerimientos generales

- Node.js 16.x o superior
- npm 8.x o superior
- Docker 23.x o superior
- Docker Compose 2.16.x o superior

### Mantenibilidad del código

1. Clonar el repositorio

```bash
git clone git@github.com:eljoe182/cr-scoring.git cr-scoring
```

2. Ejecutar `npm install` para instalar las dependencias

```bash
cd cr-scoring
npm install
```

3. Copiar el archivo `.env.example` a `.env` y configurar las variables de entorno

```bash
cp .env.example .env
```

4. Configurar las variables de entorno

```bash
### Configuración de la aplicación
LOCALE=en-CA
TIME_ZONE=America/Lima
APP_NAME=cr-scoring
PORT=3000
TZ=America/Lima

### Configuración de la base de datos MySQL
INFOCALL_TYPE=mysql
INFOCALL_HOST=
INFOCALL_PORT=
INFOCALL_USERNAME=
INFOCALL_PASSWORD=
INFOCALL_DATABASE=

### Configuración de la base de datos MS SQL Server
CR_MASTER_TYPE=mssql
CR_MASTER_HOST=
CR_MASTER_PORT=
CR_MASTER_USERNAME=
CR_MASTER_PASSWORD=
CR_MASTER_DATABASE=

### Configuración de la base de datos cache Redis
REDIS_HOST=
REDIS_PORT=6380
REDIS_VOLUME=./databases/redis

## Docker Compose
SCORING_CONFIG_FILE=.env
```

5. Ejecutar `npm run dev` para iniciar en modo de desarrollo

```bash
npm run dev
```

> **Nota:** Cada cambio que se realice en el código fuente se debe actualizar la versión en el archivo `package.json` siguiendo los lineamientos de [Semantic Version](https://semver.org/) en la clave **version**. 

6. Realizar el commit de los cambios

```bash
git add .
git commit -m "feat: add new feature"
```

6. Crear un tag con la versión actual

```bash
git tag -a v1.0.0 -m "v1.0.0"
```

7. Subir los cambios al repositorio

```bash
git push origin master --tags
```

Cada vez que se realice un ***push*** o ***merge*** al repositorio en la rama ***master***, se ejecutará un pipeline de CI/CD en el GitAction que realizará la tarea de generar la imagen de docker y subirla al [repositorio de imágenes](https://hub.docker.com/r/eljoe182/cr-scoring). 

Asegurese de cambiar la versión en el archivo `package.json` antes de realizar el commit ya que el pipeline de CI/CD se encargará de generar la imagen de docker con la versión establecida pudiendo sustituir la que este publicada y no realizar rollback de la versión anterior en caso de ser necesario.

## Instalación

Previamente instalado el [**docker**](https://docs.docker.com/get-docker) y [**docker compose**](https://docs.docker.com/compose/install), mediante la terminal debes navegar a donde se encuentra el código fuente del microservicio para ejecutar el siguiente comando:

```bash
docker compose up -d
```

Esto levantará el microservicio en el puerto **3000**, para verificar que el microservicio se encuentra en ejecución, debes ejecutar el siguiente comando:

```bash
docker compose ps
```

El resultado debe ser similar al siguiente:

```bash
CONTAINER ID    IMAGE                       COMMAND                 STATUS    NAMES
45f8e95c8ee3    eljoe182/cr-scoring:1.11.0  "docker-entrypoint.s…"    Up      scoring-service
dedf9677b63f    redis:alpine                "docker-entrypoint.s…"    Up      scoring-redis
```

> **Nota importante:**
>
> - Asegurese que exista el archivo de nombre `docker-compose.yml` en la raíz del proyecto y que el archivo `.env` se encuentre configurado correctamente.
> - Asegurese de establecer el ***tag la versión*** correcta de la imagen de docker en el archivo `docker-compose.yml` en la clave **image**. Ejemplo, si queremos la versión 1.11.0 `eljoe182/cr-scoring:1.11.0`

### Actualización

Para actualizar el microservicio, una vez que se hayan realizado los cambios y que el CI/CD se haya ejecutado correctamente publicando la imagen en el repositorio, cambie el tag de la nueva versión de la imagen en el archivo `docker-compose.yml` y luego debes ejecutar el siguiente comando:

```bash
docker compose pull && docker compose up -d
```