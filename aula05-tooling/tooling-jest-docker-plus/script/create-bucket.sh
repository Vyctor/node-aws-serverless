BUCKET_NAME=treinamento-aws-erick-wendel-12312312

aws s3 mb s3://$BUCKET_NAME --endpoint-url=http://localhost:4566

aws s3 ls --endpoint-url=http://localhost:4566