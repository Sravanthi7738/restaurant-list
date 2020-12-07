module.exports = {
    "extends": ["react-app"],
    "rules": {
    },
    "overrides": [
      {
        "files": ["**/*.js?(x)"],
        "rules": {
  // ******** add ignore rules here *********
          "jsx-a11y/anchor-is-valid": "off",
          "jsx-a11y/alt-text": "off",
          "react-hooks/exhaustive-deps": "off",
        }
      }
    ]
  }