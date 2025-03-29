[![Swift Version][swift-image]][swift-url]
![iOS version][ios-image]

# TaskVault

TaskVault is a task management app that uses Firebase for user authentication and persistent storage, with a sleek and modern UI built using SwiftUI.

<p align="center">
  <img src="https://github.com/jaysondasher/TaskVault/assets/58889274/a0757090-32e0-4eec-b16c-1cd881a0dbbe" width="150">
  <img src="https://github.com/jaysondasher/TaskVault/assets/58889274/3ad9de8b-8e13-48f1-9949-3d76bca42978" width="150">
  <img src="https://github.com/jaysondasher/TaskVault/assets/58889274/edc814b2-bcbf-4997-94bf-26136a7a1a2c" width="150">
  <img src="https://github.com/jaysondasher/TaskVault/assets/58889274/cf434bae-138e-4c04-aa11-3e7074682cd7" width="150">
  <img src="https://github.com/jaysondasher/TaskVault/assets/58889274/cbff4d66-1201-44a8-85de-7618124b177b" width="150">
</p>

# Features

- [x] Create a new account
- [x] Sign in
- [x] Create task (Include due date/time)
- [x] Mark task complete
- [x] Delete task
- [x] Sign out

# Technologies Used

- **Authentication**: Firebase Authentication
- **Persistent Storage**: Firebase Firestore
- **UI Framework**: SwiftUI
- **Platform**: iOS 16.4+

# Setup Instructions

To run this project, you need to have your own Firebase configuration file (`GoogleService-Info.plist`). Here’s how you can set it up:

1. **Create a Firebase Project**:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Click on "Add Project" and follow the steps to create a new project.

2. **Add an iOS App to Your Firebase Project**:
   - In the Firebase Console, click on "Add App" and choose "iOS".
   - Enter your app's bundle ID (`com.jaysondasher.TaskVault`).
   - Follow the instructions to download the `GoogleService-Info.plist` file.

3. **Add `GoogleService-Info.plist` to Your Xcode Project**:
   - Download the `GoogleService-Info.plist` file from Firebase.
   - Drag and drop the `GoogleService-Info.plist` file into the `TaskVault/Other` folder in your Xcode project.

4. **Run the App**:
   - After adding the `GoogleService-Info.plist`, build and run the project in Xcode.

# Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any features, bug fixes, or enhancements.

# License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

[swift-image]: https://img.shields.io/badge/swift-5.0-orange.svg
[swift-url]: https://swift.org/
[ios-image]: https://img.shields.io/badge/ios-16.4+-blue.svg