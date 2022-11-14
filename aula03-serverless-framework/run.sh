# 1o instalar serverless framework

npm i -g serverless

# sls ou serverless para inicializar o projeto
# Escolhi HTTP API Template
# Não usei org
# Deploy - Yes

# sempre que o projeto for alterado, rodar o comando abaixo
sls deploy

# informa sobre as funções criadas
sls info

# invocar local
sls invoke local -f hello --log

# matar todos serviços
sls remove