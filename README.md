# Regex Translator

This is regex translator a project inspired by [`sql-translator`](https://github.com/whoiskatrin/sql-translator).


## How to use

To translate your ideas into regular expressions you need to introduce an natural languaje instruction. Then, click the "Generate Regex" button an wait for the result. The application will use the power of ChatGTP to generate an regular expression that matches your needs. 

Optionally you can test the regular expression clicking the "Test" button and then you will be able to compare the regular expression against a text that you can customize.

## Installation

1. Clone the git repository

```bash
git clone https://github.com/Gabo-div/regex-translator.git
```

2. Go to the project root and install the dependencies

```bash
npm install
```

3. Add your OPENAI key in the .env.local file

```bash
OPEN_AI_API_KEY="YOUR-KEY"
```

4. Build the application


```bash
npm run build
```

4. Start the application


```bash
npm run start
```

Once the server is running you can use the application in the localhost `http://localhost:3000`

