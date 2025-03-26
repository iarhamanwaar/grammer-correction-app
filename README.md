
## Dependencies

Main dependencies used in this project:
- react-native
- expo
- @react-native-firebase/app
- @react-native-firebase/auth
- react-native-mmkv
- @react-native-async-storage/async-storage
- react-native-reanimated
- react-native-gesture-handler
- react-native-safe-area-context
- react-native-screens
- react-native-vector-icons

## Configuration Files

### app.config.js
Contains Expo configuration including:
- App name and version
- Bundle identifier
- Environment variables
- Platform-specific settings

### babel.config.js
Babel configuration with:
- Expo presets
- Module resolver for path aliases
- Required plugins for React Native features

## Troubleshooting

If you encounter any issues:

1. Clear watchman watches:
```bash
watchman watch-del-all
```

2. Delete node_modules and reinstall:
```bash
rm -rf node_modules
npm install
```

3. Reset Metro bundler cache:
```bash
npm start -- --reset-cache
```

4. For iOS issues:
```bash
cd ios
pod deintegrate
pod install
cd ..
```

5. For Android issues:
```bash
cd android
./gradlew clean
cd ..
```

## Environment Variables

The app uses the following environment variables:
- `OPENAI_API_KEY`: Your OpenAI API key for the grammar correction service

## Development Notes

### Storage Implementation
- Primary storage: MMKV for fast, efficient data storage
- Fallback: AsyncStorage when MMKV is unavailable
- Secure storage for sensitive data

### Authentication
- Firebase Authentication for user management
- Email/password authentication
- Secure token storage

### Navigation
- React Navigation for app routing
- Stack and Tab navigation implementation
- Protected routes for authenticated users

## Additional Notes

- Make sure your iOS simulator or Android emulator is properly set up before running the app
- For physical devices, ensure development mode is enabled
- The app uses Expo for easier development and deployment
- Bundle identifier: com.arham.dev.grammercorrectionapp

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter)
Project Link: [https://github.com/your_username/grammer-correction-app](https://github.com/your_username/grammer-correction-app)ss