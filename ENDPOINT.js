const express = require('express');
const tasks = require('./database'); // Importez la liste des tâches simulée

const app = express();
app.use(express.json());

//Ajouter une Tâche
app.post('/todos', (req, res) => {

        const { title, description, priority } = req.body;
      
        const newTask = {
          id,
          title,
          description,
          createdAt: new Date(),
          finishedAt: null,
          finished: false,
          priority
        };
      
        tasks.push(newTask);
      
        res.json(newTask); // Renvoie la nouvelle tâche ajoutée 
});

// Modifier une Tâche
app.put('/todos/:id', (req, res) => {
        const taskId = parseInt(req.params.id);
        const { title, description, priority } = req.body;
      
        const taskToUpdate = tasks.find(task => task.id === taskId);{
      
        taskToUpdate.title = title;
        taskToUpdate.description = description;
        taskToUpdate.priority = priority;
        }
      
        res.json(taskToUpdate); // Renvoie la tâche modifier
});
// Afficher la Liste de Toutes les Tâches
app.get('/todos', (req, res) => {
        const simplifiedTasks = tasks.map(({ id, title, priority, createdAt, finished }) => ({
          id,
          title,
          priority,
          createdAt,
          finished
        }));
      
        res.json(simplifiedTasks);
});
// Supprimer une Tâche par son ID :
app.delete('/todos/:id', (req, res) => {
        const taskId = parseInt(req.params.id);
        const index = tasks.findIndex(task => task.id === taskId);
      
        if (index === -1) {
          return res.json({ error: 'Task not found' });
        }
      
        tasks.splice(index, 1);
      
        res.sendStatus(204); // Renvoie le code 204 (No Content) après suppression
});
//Retourner une Erreur 404
app.use((req, res) => {
        res.status(404).json({ error: 'Not Found' });
});
      
      
      
      