# GNTECH TEST Weather API

Uma API RESTful para obter dados climáticos em tempo real de cidades ao redor do mundo. Desenvolvida com Node.js, Express, PostgreSQL e Docker.

## Início Rápido

### Pré-requisitos
- Docker: https://www.docker.com/
- Docker Compose
- Chave de API em: https://www.weatherapi.com/

### Instalação e Execução


Clone o repositório
```
git clone https://github.com/RagZark/gnTechTest
```
```
cd gnTechTest
```
Execute com Docker Compose
```
docker-compose up
```
Acesse:

API: http://localhost:3000

Documentação: http://localhost:3000/api-docs

## Como Usar a API
Autenticação
Todos os endpoints requerem uma API Key no caminho da URL:
```
/api/{apiKey}/weather?city={nomeDaCidade}
```
API Key padrão (para testes):
```
default-api-key-12345
```

Endpoints Principais

Método	Endpoint	Descrição

```GET	/api/{apiKey}/weather?city={cidade}```	Dados climáticos atuais <br>
```GET	/api/{apiKey}/weather/history```	Histórico completo <br>
```GET	/api/{apiKey}/weather/history/{cidade}```	Histórico por cidade <br>
```GET	/api/{apiKey}/weather/latest/{cidade}```	Último registro <br>

Exemplos de Uso
```
# Obter clima atual
curl "http://localhost:3000/api/default-api-key-12345/weather?city=São Paulo"

# Obter histórico
curl "http://localhost:3000/api/default-api-key-12345/weather/history"

# Último registro de uma cidade
curl "http://localhost:3000/api/default-api-key-12345/weather/latest/London"
```

## Desenvolvimento

Executando sem Docker
```
npm install
```
```
npm run dev
```

Variáveis de Ambiente (Opcional)
```
cp .env.example .env
# Edite o .env com suas chaves
```
Scripts Disponíveis
```npm start ```       # Modo produção <br>
```npm run dev```        # Modo desenvolvimento <br>
```npm run fetch-weather```  # Popular banco com dados <br>

## Comandos Docker Úteis

Iniciar serviços
```
docker-compose up
```
Iniciar em segundo plano
```
docker-compose up -d
```
Ver logs
```
docker-compose logs -f
```
Parar serviços
```
docker-compose down
```
Reconstruir imagens
```
docker-compose up --build
```
## Estrutura do Banco
```
CREATE TABLE weather_data (
    id SERIAL PRIMARY KEY,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(10),
    temperature DECIMAL(4,1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
## Exemplos de Resposta
Sucesso:
```
{
  "message": "Dados climáticos obtidos com sucesso",
  "data": {
    "city": "São Paulo",
    "country": "Brazil", 
    "temperature": 24.5
  }
}
```
Erro:
```
{
  "error": "API Key é obrigatória",
  "message": "Use o formato: /api/sua-api-key/weather?city=NomeDaCidade"
}
```
## Estrutura do Projeto
```
gntechTest/
├── src/
│   ├── config/          # Configuração do banco
│   ├── controllers/     # Controladores
│   ├── models/          # Modelos
│   ├── routes/          # Rotas API
│   ├── services/        # Lógica
│   ├── scripts/         # Utilitários
│   ├── app.js           # App Express
│   └── server.js        # Servidor
├── docker-compose.yml   # Docker
├── Dockerfile           # Container
├── .env.example         # Variáveis
└── package.json         # Dependências
├── docs/
│   ├── api-docs.json/   # Configuração JSON do swagger
```
## Tecnologias
Backend: Node.js, Express.js

Banco: PostgreSQL

Container: Docker, Docker Compose

Documentação: Swagger/OpenAPI

## Implementações sugeridas caso haja interesse de uso real
- Criação de um banco de dados com uma série API_KEYs de autenticação ligadas a usuários
