# CSS-On-Line Plugin for Visual Studio Code

## Overview
CSS-On-Line is a Visual Studio Code extension that transforms your CSS into a neatly organized format, ensuring one rule per line. This enhances code readability and maintains a professional coding style, making your CSS easier to manage and understand.

## Key Features
- **Clean Formatting:** Converts CSS rules into a one-rule-per-line structure.
- **Multi-Language Support:** Works with CSS, HTML, and PHP files containing `<style>...</style>` tags.
- **Keyboard Shortcut:** Quickly format selected text with **Ctrl + Cmd + L**.

## Installation
1. Go to the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/).
2. Search for **CSS-On-Line**.
3. Click **Install** to add it to your editor.

## Usage
### Format Entire Document
1. Open a CSS file in Visual Studio Code.
2. Right-click within the file.
3. Select **"Format Document With"** and choose **CSS-On-Line**.

### Format Selected Text
1. Highlight the CSS code you want to format.
2. Right-click and choose **"Format Selection With"**.
3. Select **CSS-On-Line** to apply the formatting.

### Use Shortcut for Quick Formatting
1. Highlight the CSS code you want to format.
2. Press **Ctrl + Cmd + L**.
3. The selected text is instantly formatted into a one-rule-per-line structure.

## Example
### Before
```css
#back {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: tomato;
}
#back .inFoot {
  height: 100%;
  width: calc(100% / 3);
}
@media (max-width: 500px) {
  #back {
    background-color: #d17777;
    margin-top: 10px;
  }
}
```

### After
```css
#back { width: 100%; height: 100%; overflow: hidden; background-color: tomato; }
#back .inFoot { height: 100%; width: calc(100% / 3); }
@media (max-width: 500px) {
  #back { background-color: #d17777; margin-top: 10px; }
}
```

## Contributing
Feel free to submit issues or feature requests on the [GitHub repository](https://github.com/yourusername/css-on-line).

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
