const express = require('express');
const AWS = require('aws-sdk');

AWS.config.update({
  region: "ap-northeast-1",
  endpoint: "http://localhost:8000"
})

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const app = express();
app.use(express.json())

const TableName = 'Todos';

// Create
app.post('/todos', (req, res) => {
  const params = {
    TableName,
    Item: {
      id: req.body.id,
      title: req.body.title,
      completed: req.body.completed
    }
  }

  dynamoDB.put(params, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(`ToDo created with id: ${params.Item.id}\n`);
    }
  })
})

// Read
app.get('/todos/:id', (req, res) => {
  const params = {
    TableName,
    Key: {
      "id": req.params.id,
    }
  };

  dynamoDB.get(params, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data.Item);
    }
  });
});

// Update
app.put('/todos/:id', (req, res) => {
  const params = {
    TableName,
    Key: {
      "id": req.params.id
    },
    UpdateExpression: "set title=:t, completed=:c",
    ExpressionAttributeValues: {
      ":t": req.body.title,
      ":c": req.body.completed
    },
    ReturnValues: "UPDATED_NEW"
  };

  dynamoDB.update(params, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(`Updated ToDo with id: ${req.params.id}\n`);
    }
  });
});

// Delete
app.delete('/todos/:id', (req, res) => {
  const params = {
    TableName,
    Key: {
      id: req.params.id
    }
  };

  dynamoDB.delete(params, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(`ToDo deleted with id: ${req.params.id}\n`);
    }
  })
});

// Launch server
app.listen(3000, () => console.log('Server is running at port 3000\n'))
