import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'task_provider.dart';
import 'task.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => TaskProvider(),
      child: MaterialApp(
        title: 'Beautiful Task Manager',
        theme: ThemeData(
          hintColor: Colors.orangeAccent,
          scaffoldBackgroundColor: Color.fromARGB(255, 138, 138, 138),
          fontFamily: 'Roboto',
          visualDensity: VisualDensity.adaptivePlatformDensity,
          textTheme: TextTheme(
            titleLarge: TextStyle(color: Colors.teal[800], fontWeight: FontWeight.bold),
            bodyMedium: TextStyle(color: Colors.grey[800]),
          ), colorScheme: ColorScheme.fromSwatch(primarySwatch: Colors.teal).copyWith(background: Color.fromARGB(255, 255, 255, 255)),
        ),
        home: const TaskManagerScreen(),
      ),
    );
  }
}

class TaskManagerScreen extends StatelessWidget {
  const TaskManagerScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final taskProvider = Provider.of<TaskProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Task Manager', style: TextStyle(fontWeight: FontWeight.bold)),
        elevation: 0,
      ),
      body: Column(
        children: [
          Expanded(
            child: taskProvider.tasks.isEmpty
                ? Center(
                    child: Text(
                      'No tasks yet. Add some!',
                      style: TextStyle(fontSize: 18, color: Colors.grey[600]),
                    ),
                  )
                : ListView.builder(

                    itemCount: taskProvider.tasks.length,
                    itemBuilder: (context, index) {
                      final task = taskProvider.tasks[index];
                      return TaskTile(task: task);
                    },
                  ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showAddTaskDialog(context),
        child: const Icon(Icons.add),
        tooltip: 'Add Task',
        backgroundColor: Theme.of(context).hintColor,
      ),
    );
  }

  void _showAddTaskDialog(BuildContext context) {
    final TextEditingController controller = TextEditingController();

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Add New Task', style: Theme.of(context).textTheme.titleLarge),
          content: TextField(
            controller: controller,
            decoration: InputDecoration(
              hintText: 'Enter task title',
              border: OutlineInputBorder(
                borderSide: BorderSide(color: Theme.of(context).primaryColor),
              ),
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Theme.of(context).hintColor, width: 2),
              ),
            ),
            autofocus: true,
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: Text('Cancel', style: TextStyle(color: Colors.grey[600])),
            ),
            ElevatedButton(
              onPressed: () {
                if (controller.text.isNotEmpty) {
                  final task = Task(title: controller.text);
                  Provider.of<TaskProvider>(context, listen: false).addTask(task);
                  Navigator.of(context).pop();
                }
              },
              child: const Text('Add'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Theme.of(context).hintColor,
              ),
            ),
          ],
        );
      },
    );
  }
}

class TaskTile extends StatelessWidget {
  final Task task;

  const TaskTile({Key? key, required this.task}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Dismissible(
      key: Key(task.id.toString()),
      background: Container(
        color: Colors.red[400],
        alignment: Alignment.centerRight,
        padding: const EdgeInsets.only(right: 20),
        child: const Icon(Icons.delete, color: Colors.white),
      ),
      direction: DismissDirection.endToStart,
      onDismissed: (direction) {
        Provider.of<TaskProvider>(context, listen: false).deleteTask(task.id!);
      },
      child: Card(
        elevation: 2,
        margin: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        child: ListTile(
          leading: Checkbox(
            value: task.isCompleted,
            onChanged: (bool? value) {
              task.isCompleted = value!;
              Provider.of<TaskProvider>(context, listen: false).updateTask(task);
            },
            activeColor: Theme.of(context).hintColor,
          ),
          title: Text(
            task.title,
            style: TextStyle(
              decoration: task.isCompleted ? TextDecoration.lineThrough : null,
              color: task.isCompleted ? Colors.grey[500] : Colors.grey[800],
            ),
          ),
          trailing: IconButton(
            icon: Icon(Icons.delete, color: Colors.red[400]),
            onPressed: () {
              Provider.of<TaskProvider>(context, listen: false).deleteTask(task.id!);
            },
          ),
        ),
      ),
    );
  }
}

