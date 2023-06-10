### 前提
$ node --version; npm --version; java --version
v18.16.0
7.15.1
java 13.0.2 2020-01-14
Java(TM) SE Runtime Environment (build 13.0.2+8)
Java HotSpot(TM) 64-Bit Server VM (build 13.0.2+8, mixed mode, sharing)

$ sw_vers
ProductName:		macOS
ProductVersion:		13.2
BuildVersion:		22D49

## 環境準備

mkdir app
cd app

<!-- Github -->
gh auth login
git init
git add .
git commit -m 'first dive'
gh repo create try-ddb-local-w-express
git push origin master

<!-- npm -->
npm init -y
npm install express --save
npm install aws-sdk --save

<!-- ddb local -->
wget https://s3.ap-northeast-1.amazonaws.com/dynamodb-local-tokyo/dynamodb_local_latest.zip
unzip dynamodb_local_latest.zip
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb

