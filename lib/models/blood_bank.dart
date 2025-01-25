import 'dart:collection';

class Donor {
  final String id;
  final String name;
  final String bloodType;
  final String contact;
  int donationCount;
  DateTime? lastDonationDate;
  int reputationPoints;

  Donor({
    required this.id,
    required this.name,
    required this.bloodType,
    required this.contact,
    this.donationCount = 0,
    this.lastDonationDate,
    this.reputationPoints = 0,
  });
}

class Acceptor {
  final String id;
  final String name;
  final String bloodType;
  final String contact;
  final String reason;
  final int unitsNeeded;
  final DateTime requestDate;

  Acceptor({
    required this.id,
    required this.name,
    required this.bloodType,
    required this.contact,
    required this.reason,
    required this.unitsNeeded,
    DateTime? requestDate,
  }) : requestDate = requestDate ?? DateTime.now();
}

class BloodBank {
  final Map<String, int> _bloodInventory = {};
  final Map<String, Donor> _donors = {};
  final Map<String, Acceptor> _acceptors = {};
  
  // Blood type compatibility chart
  final Map<String, List<String>> _compatibilityChart = {
    'A+': ['A+', 'AB+'],
    'A-': ['A+', 'A-', 'AB+', 'AB-'],
    'B+': ['B+', 'AB+'],
    'B-': ['B+', 'B-', 'AB+', 'AB-'],
    'AB+': ['AB+'],
    'AB-': ['AB+', 'AB-'],
    'O+': ['A+', 'B+', 'AB+', 'O+'],
    'O-': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  };

  UnmodifiableMapView<String, int> get bloodInventory => 
      UnmodifiableMapView(_bloodInventory);
  
  UnmodifiableMapView<String, Donor> get donors => 
      UnmodifiableMapView(_donors);

  UnmodifiableMapView<String, Acceptor> get acceptors => 
      UnmodifiableMapView(_acceptors);

  String addDonor(String id, String name, String bloodType, String contact) {
    if (_donors.containsKey(id)) {
      return 'Donor ID already exists';
    }

    if (!_compatibilityChart.containsKey(bloodType.toUpperCase())) {
      return 'Invalid blood type';
    }

    _donors[id] = Donor(
      id: id,
      name: name,
      bloodType: bloodType.toUpperCase(),
      contact: contact,
    );
    return 'Donor added successfully';
  }

  String addBloodUnit(String bloodType, int units) {
    if (!_compatibilityChart.containsKey(bloodType.toUpperCase())) {
      return 'Invalid blood type';
    }

    bloodType = bloodType.toUpperCase();
    _bloodInventory[bloodType] = (_bloodInventory[bloodType] ?? 0) + units;
    return 'Blood units added successfully';
  }

  String addAcceptor(String id, String name, String bloodType, String contact, 
      String reason, int unitsNeeded) {
    if (_acceptors.containsKey(id)) {
      return 'Acceptor ID already exists';
    }

    if (!_compatibilityChart.containsKey(bloodType.toUpperCase())) {
      return 'Invalid blood type';
    }

    if (unitsNeeded <= 0) {
      return 'Units needed must be greater than 0';
    }

    _acceptors[id] = Acceptor(
      id: id,
      name: name,
      bloodType: bloodType.toUpperCase(),
      contact: contact,
      reason: reason,
      unitsNeeded: unitsNeeded,
    );

    return 'Blood request registered successfully';
  }

  List<String> getCompatibleRecipients(String donorBloodType) {
    return _compatibilityChart[donorBloodType.toUpperCase()] ?? [];
  }

  bool canDonate(String donorId) {
    final donor = _donors[donorId];
    if (donor == null || donor.lastDonationDate == null) return true;
    
    // Check if 56 days (8 weeks) have passed since last donation
    final daysSinceLastDonation = 
        DateTime.now().difference(donor.lastDonationDate!).inDays;
    return daysSinceLastDonation >= 56;
  }

  void recordDonation(String donorId) {
    final donor = _donors[donorId];
    if (donor != null) {
      donor.donationCount++;
      donor.lastDonationDate = DateTime.now();
      donor.reputationPoints += 10;
    }
  }

  List<Donor> getDonorsForBloodType(String bloodType) {
    return _donors.values
        .where((donor) => getCompatibleRecipients(donor.bloodType)
            .contains(bloodType.toUpperCase()))
        .toList();
  }

  bool isLowStock(String bloodType) {
    final units = _bloodInventory[bloodType.toUpperCase()] ?? 0;
    return units < 10; // Consider below 10 units as low stock
  }

  bool hasEnoughUnits(String bloodType, int unitsNeeded) {
    return (_bloodInventory[bloodType.toUpperCase()] ?? 0) >= unitsNeeded;
  }

  List<Donor> getCompatibleDonors(String acceptorBloodType) {
    return _donors.values
        .where((donor) => getCompatibleRecipients(donor.bloodType)
            .contains(acceptorBloodType.toUpperCase()))
        .toList();
  }
}