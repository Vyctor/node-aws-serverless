# 1o Criar arquivo de políticas de segurança

# 2o setar role para a função lambda

ROLE_NAME=lambda-example
NODEJS_VERSION=nodejs16.x
FUNCTION_NAME=hello_cli

mkdir -p ./logs

aws iam create-role \
    --role-name $ROLE_NAME \
    --assume-role-policy-document file://policies.json \
    | tee ./logs/1.role.json

POLICY_ARN="arn:aws:iam::100338710035:role/lambda-example"

# 3o Criar função lambda

# 4o Zipar o projeto e subir função
zip function.zip index.js

ROLE_NAME=lambda-example
NODEJS_VERSION=nodejs16.x
FUNCTION_NAME=hello_cli
POLICY_ARN="arn:aws:iam::100338710035:role/lambda-example"

aws lambda create-function \
    --function-name $FUNCTION_NAME \
    --zip-file fileb://function.zip \
    --handler index.handler \
    --runtime $NODEJS_VERSION \
    --role $POLICY_ARN \
    | tee ./logs/2.lambda-create.log

# Invocar função
FUNCTION_NAME=hello_cli
aws lambda invoke \
    --function-name $FUNCTION_NAME logs/3.lambda-exec.log \
    --log-type Tail \
    --query 'LogResult' \
    --cli-binary-format raw-in-base64-out \
    --payload '{"name":"vyctor guimarães"}' \
    --output text | base64 -d

# Update lambda function

FUNCTION_NAME=hello_cli
aws lambda update-function-code \
    --function-name $FUNCTION_NAME \
    --zip-file fileb://function.zip \
    --publish \
    | tee ./logs/4.lambda-update.log

# Delete lambda function

FUNCTION_NAME=hello_cli
aws lambda delete-function \
    --function-name $FUNCTION_NAME \
    | tee ./logs/5.lambda-delete.log