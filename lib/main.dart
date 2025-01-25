import 'package:flutter/material.dart';
import 'models/blood_bank.dart';



void main() {

  runApp(const BloodBankApp());

}



class BloodBankApp extends StatelessWidget {

  const BloodBankApp({super.key});



  @override

  Widget build(BuildContext context) {

    return MaterialApp(

      title: 'Blood Bank Management',

      theme: ThemeData(

        primarySwatch: Colors.red,

        useMaterial3: true,

      ),

      home: const BloodBankHome(),

    );

  }

}



class BloodBankHome extends StatefulWidget {

  const BloodBankHome({super.key});



  @override

  State<BloodBankHome> createState() => _BloodBankHomeState();

}



class _BloodBankHomeState extends State<BloodBankHome> {

  final BloodBank bloodBank = BloodBank();

  final _formKey = GlobalKey<FormState>();

  

  // Controllers for donor form

  final _donorIdController = TextEditingController();

  final _nameController = TextEditingController();

  final _bloodTypeController = TextEditingController();

  final _contactController = TextEditingController();

  final _unitsController = TextEditingController();



  // Additional controllers for acceptor form

  final _reasonController = TextEditingController();

  final _unitsNeededController = TextEditingController();



  void _showMessage(String message) {

    ScaffoldMessenger.of(context).showSnackBar(

      SnackBar(content: Text(message)),

    );

  }



  void _showAddDonorDialog() {

    showDialog(

      context: context,

      builder: (context) => AlertDialog(

        title: const Text('Add Donor'),

        content: Form(

          key: _formKey,

          child: Column(

            mainAxisSize: MainAxisSize.min,

            children: [

              TextFormField(

                controller: _donorIdController,

                decoration: const InputDecoration(labelText: 'Donor ID'),

                validator: (value) =>

                    value?.isEmpty ?? true ? 'Please enter donor ID' : null,

              ),

              TextFormField(

                controller: _nameController,

                decoration: const InputDecoration(labelText: 'Name'),

                validator: (value) =>

                    value?.isEmpty ?? true ? 'Please enter name' : null,

              ),

              TextFormField(

                controller: _bloodTypeController,

                decoration: const InputDecoration(

                    labelText: 'Blood Type (A+/A-/B+/B-/AB+/AB-/O+/O-)'),

                validator: (value) =>

                    value?.isEmpty ?? true ? 'Please enter blood type' : null,

              ),

              TextFormField(

                controller: _contactController,

                decoration: const InputDecoration(labelText: 'Contact'),

                validator: (value) =>

                    value?.isEmpty ?? true ? 'Please enter contact' : null,

              ),

            ],

          ),

        ),

        actions: [

          TextButton(

            onPressed: () => Navigator.pop(context),

            child: const Text('Cancel'),

          ),

          TextButton(

            onPressed: () {

              if (_formKey.currentState?.validate() ?? false) {

                final message = bloodBank.addDonor(

                  _donorIdController.text,

                  _nameController.text,

                  _bloodTypeController.text,

                  _contactController.text,

                );

                Navigator.pop(context);

                _showMessage(message);

                _clearControllers();

              }

            },

            child: const Text('Add'),

          ),

        ],

      ),

    );

  }



  void _showAddBloodUnitsDialog() {

    showDialog(

      context: context,

      builder: (context) => AlertDialog(

        title: const Text('Add Blood Units'),

        content: Form(

          key: _formKey,

          child: Column(

            mainAxisSize: MainAxisSize.min,

            children: [

              TextFormField(

                controller: _bloodTypeController,

                decoration: const InputDecoration(

                    labelText: 'Blood Type (A+/A-/B+/B-/AB+/AB-/O+/O-)'),

                validator: (value) =>

                    value?.isEmpty ?? true ? 'Please enter blood type' : null,

              ),

              TextFormField(

                controller: _unitsController,

                decoration: const InputDecoration(labelText: 'Units'),

                keyboardType: TextInputType.number,

                validator: (value) =>

                    value?.isEmpty ?? true ? 'Please enter units' : null,

              ),

            ],

          ),

        ),

        actions: [

          TextButton(

            onPressed: () => Navigator.pop(context),

            child: const Text('Cancel'),

          ),

          TextButton(

            onPressed: () {

              if (_formKey.currentState?.validate() ?? false) {

                final message = bloodBank.addBloodUnit(

                  _bloodTypeController.text,

                  int.parse(_unitsController.text),

                );

                Navigator.pop(context);

                _showMessage(message);

                setState(() {});

                _clearControllers();

              }

            },

            child: const Text('Add'),

          ),

        ],

      ),

    );

  }



  void _showBloodCompatibilityDialog() {

    showDialog(

      context: context,

      builder: (context) => AlertDialog(

        title: const Text('Blood Type Compatibility'),

        content: Form(

          key: _formKey,

          child: TextFormField(

            controller: _bloodTypeController,

            decoration: const InputDecoration(

                labelText: 'Enter Blood Type (A+/A-/B+/B-/AB+/AB-/O+/O-)'),

            validator: (value) =>

                value?.isEmpty ?? true ? 'Please enter blood type' : null,

          ),

        ),

        actions: [

          TextButton(

            onPressed: () => Navigator.pop(context),

            child: const Text('Cancel'),

          ),

          TextButton(

            onPressed: () {

              if (_formKey.currentState?.validate() ?? false) {

                final compatibleTypes = 

                    bloodBank.getCompatibleRecipients(_bloodTypeController.text);

                Navigator.pop(context);

                _showMessage(

                    'Compatible recipients: ${compatibleTypes.join(", ")}');

                _clearControllers();

              }

            },

            child: const Text('Check'),

          ),

        ],

      ),

    );

  }



  void _showAddAcceptorDialog() {

    showDialog(

      context: context,

      builder: (context) => AlertDialog(

        title: const Text('Register Blood Request'),

        content: Form(

          key: _formKey,

          child: Column(

            mainAxisSize: MainAxisSize.min,

            children: [

              TextFormField(

                controller: _donorIdController,

                decoration: const InputDecoration(labelText: 'Acceptor ID'),

                validator: (value) =>

                    value?.isEmpty ?? true ? 'Please enter acceptor ID' : null,

              ),

              TextFormField(

                controller: _nameController,

                decoration: const InputDecoration(labelText: 'Name'),

                validator: (value) =>

                    value?.isEmpty ?? true ? 'Please enter name' : null,

              ),

              TextFormField(

                controller: _bloodTypeController,

                decoration: const InputDecoration(

                    labelText: 'Blood Type (A+/A-/B+/B-/AB+/AB-/O+/O-)'),

                validator: (value) =>

                    value?.isEmpty ?? true ? 'Please enter blood type' : null,

              ),

              TextFormField(

                controller: _contactController,

                decoration: const InputDecoration(labelText: 'Contact'),

                validator: (value) =>

                    value?.isEmpty ?? true ? 'Please enter contact' : null,

              ),

              TextFormField(

                controller: _reasonController,

                decoration: const InputDecoration(labelText: 'Reason for Request'),

                validator: (value) =>

                    value?.isEmpty ?? true ? 'Please enter reason' : null,

              ),

              TextFormField(

                controller: _unitsNeededController,

                decoration: const InputDecoration(labelText: 'Units Needed'),

                keyboardType: TextInputType.number,

                validator: (value) =>

                    value?.isEmpty ?? true ? 'Please enter units needed' : null,

              ),

            ],

          ),

        ),

        actions: [

          TextButton(

            onPressed: () => Navigator.pop(context),

            child: const Text('Cancel'),

          ),

          TextButton(

            onPressed: () {

              if (_formKey.currentState?.validate() ?? false) {

                final message = bloodBank.addAcceptor(

                  _donorIdController.text,

                  _nameController.text,

                  _bloodTypeController.text,

                  _contactController.text,

                  _reasonController.text,

                  int.parse(_unitsNeededController.text),

                );

                Navigator.pop(context);

                _showMessage(message);

                _clearControllers();

              }

            },

            child: const Text('Register'),

          ),

        ],

      ),

    );

  }



  void _clearControllers() {

    _donorIdController.clear();

    _nameController.clear();

    _bloodTypeController.clear();

    _contactController.clear();

    _unitsController.clear();

    _reasonController.clear();

    _unitsNeededController.clear();

  }



  @override

  void dispose() {

    _donorIdController.dispose();

    _nameController.dispose();

    _bloodTypeController.dispose();

    _contactController.dispose();

    _unitsController.dispose();

    _reasonController.dispose();

    _unitsNeededController.dispose();

    super.dispose();

  }



  @override

  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(

        title: const Text('Blood Bank Management'),

      ),

      body: Padding(

        padding: const EdgeInsets.all(16.0),

        child: Column(

          crossAxisAlignment: CrossAxisAlignment.stretch,

          children: [

            Row(

              children: [

                Expanded(

                  child: ElevatedButton(

                    onPressed: _showAddDonorDialog,

                    child: const Text('Register as Donor'),

                  ),

                ),

                const SizedBox(width: 8),

                Expanded(

                  child: ElevatedButton(

                    onPressed: _showAddAcceptorDialog,

                    child: const Text('Request Blood'),

                  ),

                ),

              ],

            ),

            const SizedBox(height: 8),

            ElevatedButton(

              onPressed: _showAddBloodUnitsDialog,

              child: const Text('Add Blood Units'),

            ),

            const SizedBox(height: 8),

            ElevatedButton(

              onPressed: _showBloodCompatibilityDialog,

              child: const Text('Check Blood Compatibility'),

            ),

            const SizedBox(height: 16),

            const Text(

              'Blood Inventory',

              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),

            ),

            Expanded(

              child: ListView.builder(

                itemCount: bloodBank.bloodInventory.length,

                itemBuilder: (context, index) {

                  final bloodType = bloodBank.bloodInventory.keys.elementAt(index);

                  final units = bloodBank.bloodInventory[bloodType];

                  return Card(

                    color: bloodBank.isLowStock(bloodType)

                        ? Colors.red.shade100

                        : null,

                    child: ListTile(

                      title: Text('Blood Type: $bloodType'),

                      subtitle: Column(

                        crossAxisAlignment: CrossAxisAlignment.start,

                        children: [

                          Text('Available Units: $units'),

                          if (bloodBank.isLowStock(bloodType))

                            const Text(

                              'Low Stock!',

                              style: TextStyle(

                                color: Colors.red,

                                fontWeight: FontWeight.bold,

                              ),

                            ),

                        ],

                      ),

                    ),

                  );

                },

              ),

            ),

          ],

        ),

      ),

    );

  }

}
