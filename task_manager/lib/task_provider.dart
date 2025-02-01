import 'package:flutter/material.dart';
import 'task.dart';
import 'db_helper.dart';

class TaskProvider extends ChangeNotifier {
  List<Task> _tasks = [];
  List<Task> get tasks => _tasks;

  void addTask(Task task) async {
    await DBHelper().insertTask(task);
    _fetchTasks();
  }

  void _fetchTasks() async {
    _tasks = await DBHelper().fetchTasks();
    notifyListeners();
  }

  void updateTask(Task task) async {
    await DBHelper().updateTask(task);
    _fetchTasks();
  }

  void deleteTask(int id) async {
    await DBHelper().deleteTask(id);
    _fetchTasks();
  }
}