run:
	npx react-native run-macos

run-ipad:
	npx react-native run-ios --simulator="iPad Pro (12.9-inch) (5th generation)"

run-iphone:
	npx react-native run-ios

release:
	xcodebuild -workspace macos/miniature_board.xcworkspace -scheme miniature_board-macOS -config Release