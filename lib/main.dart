import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const BloodBankApp());
}

class BloodBankApp extends StatelessWidget {
  const BloodBankApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Blood Bank Management',
      theme: ThemeData(
        primarySwatch: Colors.red,
        useMaterial3: true,
      ),
      home: const LoginPage(),
    );
  }
}

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;

  void _login() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
      });
      
      try {
        await FirebaseAuth.instance.signInWithEmailAndPassword(
          email: _emailController.text.trim(),
          password: _passwordController.text,
        );
        
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const RoleSelectionPage()),
        );
      } on FirebaseAuthException catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.message ?? 'Login failed')),
        );
      } finally {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Blood Bank Login')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              TextFormField(
                controller: _emailController,
                decoration: const InputDecoration(labelText: 'Email'),
                validator: (value) => 
                    value?.isEmpty ?? true ? 'Please enter email' : null,
                keyboardType: TextInputType.emailAddress,
              ),
              TextFormField(
                controller: _passwordController,
                decoration: const InputDecoration(labelText: 'Password'),
                obscureText: true,
                validator: (value) => 
                    value?.isEmpty ?? true ? 'Please enter password' : null,
              ),
              const SizedBox(height: 20),
              _isLoading 
                ? const CircularProgressIndicator()
                : ElevatedButton(
                    onPressed: _login,
                    child: const Text('Login'),
                  ),
              TextButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const RegisterPage()),
                  );
                },
                child: const Text('Create Account'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class UserData {
  final String name;
  final String bloodGroup;
  final String age;
  final String weight;
  final String address;
  final String phone;
  final String lastDonation;

  UserData({
    required this.name,
    required this.bloodGroup,
    required this.age,
    required this.weight,
    required this.address,
    required this.phone,
    required this.lastDonation,
  });
}

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _bloodGroupController = TextEditingController();
  final _ageController = TextEditingController();
  final _weightController = TextEditingController();
  final _addressController = TextEditingController();
  final _phoneController = TextEditingController();
  final _lastDonationController = TextEditingController();
  bool _isLoading = false;

  void _register() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
      });

      try {
        // Create user account with Firebase Auth
        UserCredential userCredential = 
            await FirebaseAuth.instance.createUserWithEmailAndPassword(
          email: _emailController.text.trim(),
          password: _passwordController.text,
        );

        // Save additional user data to Firestore
        await FirebaseFirestore.instance
            .collection('users')
            .doc(userCredential.user!.uid)
            .set({
          'name': _nameController.text,
          'email': _emailController.text.trim(),
          'bloodGroup': _bloodGroupController.text,
          'age': _ageController.text,
          'weight': _weightController.text,
          'address': _addressController.text,
          'phone': _phoneController.text,
          'lastDonation': _lastDonationController.text,
          'createdAt': FieldValue.serverTimestamp(),
        });

        // Show success message and navigate back to login
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Registration successful!')),
        );
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const LoginPage()),
        );
      } on FirebaseAuthException catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.message ?? 'Registration failed')),
        );
      } finally {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Create Account')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(labelText: 'Name'),
                validator: (value) => 
                    value?.isEmpty ?? true ? 'Please enter name' : null,
              ),
              TextFormField(
                controller: _emailController,
                decoration: const InputDecoration(labelText: 'Email'),
                validator: (value) {
                  if (value?.isEmpty ?? true) {
                    return 'Please enter email';
                  }
                  if (!value!.contains('@')) {
                    return 'Please enter a valid email';
                  }
                  return null;
                },
                keyboardType: TextInputType.emailAddress,
              ),
              TextFormField(
                controller: _passwordController,
                decoration: const InputDecoration(labelText: 'Password'),
                obscureText: true,
                validator: (value) {
                  if (value?.isEmpty ?? true) {
                    return 'Please enter password';
                  }
                  if (value!.length < 6) {
                    return 'Password must be at least 6 characters';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _bloodGroupController,
                decoration: const InputDecoration(labelText: 'Blood Group'),
                validator: (value) => 
                    value?.isEmpty ?? true ? 'Please enter blood group' : null,
              ),
              TextFormField(
                controller: _ageController,
                decoration: const InputDecoration(labelText: 'Age'),
                keyboardType: TextInputType.number,
                validator: (value) => 
                    value?.isEmpty ?? true ? 'Please enter age' : null,
              ),
              TextFormField(
                controller: _weightController,
                decoration: const InputDecoration(labelText: 'Weight'),
                keyboardType: TextInputType.number,
                validator: (value) => 
                    value?.isEmpty ?? true ? 'Please enter weight' : null,
              ),
              TextFormField(
                controller: _addressController,
                decoration: const InputDecoration(labelText: 'Address'),
                validator: (value) => 
                    value?.isEmpty ?? true ? 'Please enter address' : null,
              ),
              TextFormField(
                controller: _phoneController,
                decoration: const InputDecoration(labelText: 'Phone Number'),
                keyboardType: TextInputType.phone,
                validator: (value) => 
                    value?.isEmpty ?? true ? 'Please enter phone number' : null,
              ),
              TextFormField(
                controller: _lastDonationController,
                decoration: const InputDecoration(labelText: 'Last Donation Date'),
                onTap: () async {
                  DateTime? pickedDate = await showDatePicker(
                    context: context,
                    initialDate: DateTime.now(),
                    firstDate: DateTime(2000),
                    lastDate: DateTime.now(),
                  );
                  if (pickedDate != null) {
                    _lastDonationController.text = 
                        pickedDate.toLocal().toString().split(' ')[0];
                  }
                },
              ),
              const SizedBox(height: 20),
              _isLoading 
                ? const CircularProgressIndicator()
                : ElevatedButton(
                    onPressed: _register,
                    child: const Text('Register'),
                  ),
            ],
          ),
        ),
      ),
    );
  }
}

class RoleSelectionPage extends StatelessWidget {
  const RoleSelectionPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Select Role'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => const LoginPage()),
              );
            },
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const DonorPage()),
                );
              },
              child: const Text('Donor'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const AcceptorPage()),
                );
              },
              child: const Text('Acceptor'),
            ),
          ],
        ),
      ),
    );
  }
}

class DonorPage extends StatelessWidget {
  const DonorPage({super.key});

  @override
  Widget build(BuildContext context) {
    // Sample user data (in real app, this would come from a database)
    final userData = UserData(
      name: "John Doe",
      bloodGroup: "A+",
      age: "25",
      weight: "70",
      address: "123 Main St",
      phone: "1234567890",
      lastDonation: "2024-01-01",
    );

    return Scaffold(
      appBar: AppBar(
        title: const Text('Donor Profile'),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('No new notifications')),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.edit),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Edit profile coming soon')),
              );
            },
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Name: ${userData.name}'),
            Text('Blood Group: ${userData.bloodGroup}'),
            Text('Age: ${userData.age}'),
            Text('Weight: ${userData.weight}'),
            Text('Address: ${userData.address}'),
            Text('Phone: ${userData.phone}'),
            Text('Last Donation: ${userData.lastDonation}'),
          ],
        ),
      ),
    );
  }
}

class AcceptorPage extends StatefulWidget {
  const AcceptorPage({super.key});

  @override
  State<AcceptorPage> createState() => _AcceptorPageState();
}

class _AcceptorPageState extends State<AcceptorPage> {
  String? selectedBloodGroup;
  DateTime? selectedDate;
  String? selectedLocation;
  List<UserData> availableDonors = [];

  void _searchDonors() {
    // Sample donor data (in real app, this would come from a database)
    setState(() {
      availableDonors = [
        UserData(
          name: "John Doe",
          bloodGroup: selectedBloodGroup ?? "A+",
          age: "25",
          weight: "70",
          address: selectedLocation ?? "Location 1",
          phone: "1234567890",
          lastDonation: "2024-01-01",
        ),
        // Add more sample donors as needed
      ];
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Request Blood')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            DropdownButton<String>(
              hint: const Text('Select Blood Group'),
              value: selectedBloodGroup,
              items: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
                  .map((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),
              onChanged: (String? newValue) {
                setState(() {
                  selectedBloodGroup = newValue;
                });
              },
            ),
            ElevatedButton(
              onPressed: () async {
                final DateTime? picked = await showDatePicker(
                  context: context,
                  initialDate: DateTime.now(),
                  firstDate: DateTime.now(),
                  lastDate: DateTime.now().add(const Duration(days: 30)),
                );
                if (picked != null) {
                  setState(() {
                    selectedDate = picked;
                  });
                }
              },
              child: Text(selectedDate == null
                  ? 'Select Date'
                  : 'Date: ${selectedDate!.toString().split(' ')[0]}'),
            ),
            DropdownButton<String>(
              hint: const Text('Select Location'),
              value: selectedLocation,
              items: ['Location 1', 'Location 2', 'Location 3']
                  .map((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),
              onChanged: (String? newValue) {
                setState(() {
                  selectedLocation = newValue;
                });
              },
            ),
            ElevatedButton(
              onPressed: _searchDonors,
              child: const Text('Search Donors'),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: availableDonors.length,
                itemBuilder: (context, index) {
                  final donor = availableDonors[index];
                  return ListTile(
                    title: Text(donor.name),
                    subtitle: Text('Blood Group: ${donor.bloodGroup}'),
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
