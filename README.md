# 20230611_try-ddb-local

dynamoDB Localを利用して簡単なCRUDを動かすためのサンプルです
express.jsを利用します。

## 前提

* 筆者の環境は以下

```bash
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
```

* ghコマンドを利用

## 環境準備

必要な環境準備は以下

* 作業ディレクトリ作成

```bash
mkdir app
cd app
```

* GHリポジトリ作成

```bash
gh auth login
git init
code .gitignore
git add .
git commit -m 'first dive'
gh repo create try-ddb-local-w-express --public
git push origin main
```

* node

```bash
npm init -y
npm install express --save
npm install aws-sdk --save
```

* DDB Localインストール

```
wget https://s3.ap-northeast-1.amazonaws.com/dynamodb-local-tokyo/dynamodb_local_latest.zip
unzip dynamodb_local_latest.zip
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```
See: https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/DynamoDBLocal.html

* テーブル作成

```bash
code app/createTable.js
node app/createTable.js
```

## テスト
app/app.jsとDDB Localを起動し、テーブルが作成されていれば以下のテストが期待動作するはずです。

* タスクの作成

```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"id": "1", "title": "Buy milk", "completed": false}' \
http://localhost:3000/todos
```

* タスクの変更

```bash
curl -X PUT -H "Content-Type: application/json" \
-d '{"title": "Buy milk and bread", "completed": true}' \
http://localhost:3000/todos/1
```

* 変更されたタスクの表示

```bash
curl http://localhost:3000/todos/1
```

* タスクの削除

```bash
curl -X DELETE http://localhost:3000/todos/1
```

* 削除されたタスクが表示されないことの確認
```bash
curl http://localhost:3000/todos/1
```

* シナリオ実行例
```bash
$ curl -X POST -H "Content-Type: application/json" \
> -d '{"id": "1", "title": "Buy milk", "completed": false}' \
> http://localhost:3000/todos
ToDo created with id: 1
$ curl -X PUT -H "Content-Type: application/json" \
> -d '{"title": "Buy milk and bread", "completed": true}' \
> http://localhost:3000/todos/1
Updated ToDo with id: 1
$ curl http://localhost:3000/todos/1
{"title":"Buy milk and bread","completed":true,"id":"1"}$ curl -X DELETE http://localhost:3000/todos/1
ToDo deleted with id: 1
$ curl http://localhost:3000/todos/1
```

