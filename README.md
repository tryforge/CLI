<!-- Logo -->
<p align="center">
  <img src="./assets/icon/cli.svg" alt="ForgeCLI Logo" width="180" />
</p>

<!-- Title -->
<div id="user-content-toc">
  <ul align="center" style="list-style: none; padding: 0; margin: 0;">
    <summary>
      <h1><strong>@tryforge/cli</strong></h1>
    </summary>
  </ul>
</div>

<!-- Tagline -->
<p align="center"><strong>The all-in-one command-line toolkit for ForgeScript developers.</strong></p>

<!-- Short Description -->
<p align="center">
  Build, manage, and scale modern ForgeScript-based bots and workflows with ease.  
  <br />
  From project scaffolding to advanced automation, your all in one CLI.
</p>

<!-- Badges -->
<p align="center">
  <!-- Discord Server -->
  <a href="https://discord.gg/2kwueME2sj">
    <img src="https://img.shields.io/discord/997899472610795580?style=for-the-badge&logo=discord&logoColor=white&label=Community&color=090A16" alt="Discord Community Server">
  </a>
  <!-- NPM Registry -->
  <a href="https://npmjs.org/package/@tryforge/cli"><img src="https://img.shields.io/github/package-json/v/tryforge/CLI?label=@tryforge/cli&color=090A16&style=for-the-badge&logo=npm" alt="@tryforge/cli"></a>
  <!-- License -->
  <a href="https://github.com/tryforge/CLI/blob/main/LICENSE"><img src="https://img.shields.io/github/license/tryforge/CLI?style=for-the-badge&logo=github&logoColor=white&label=License&color=090A16" alt="License"/></a>
</p>

<br/>

---

<br/>

<div id="user-content-toc">
  <ul style="list-style: none; padding: 0; margin: 0;">
    <summary>
      <h2><strong>Table of Contents</strong></h2>
    </summary>
  </ul>
</div>

- [What is a CLI?](#what-is-a-cli)
- [Why Use a CLI?](#why-use-a-cli)
- [What is ForgeCLI?](#what-is-forgecli)
- [Why Use ForgeCLI?](#why-use-forgecli)
- ...
- [GitHub Actions](#github-actions)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Commands](#commands)
  - ...
  - ...
  - ...
  - ...
- [Project History](#project-history)
- [Roadmap](#roadmap)
- [Code Style](#code-style)
- [Contributing](#contributing)
- [Team](#team)
- [Versioning](#versioning)
- [License](#license)
- [Support](#support)
- [Code of Conduct](#code-of-conduct)

<br/>

---

<br/>

<div id="user-content-toc">
  <ul align="center" style="list-style: none; padding: 0; margin: 0;">
    <summary>
      <h2><strong>GitHub Actions</strong></h2>
    </summary>
  </ul>
</div>

<p align="center">Our CI/CD pipeline ensures code quality and reliability through automated
testing, linting, and security checks on every commit and pull request.</p>

<p align="center">
  <!-- Linting -->
  <a href="https://github.com/tryforge/CLI/actions/workflows/linter.yml">
    <img alt="Linting Status" src="https://img.shields.io/github/actions/workflow/status/tryforge/CLI/linter.yml?branch=main&label=Linting&logo=eslint&style=for-the-badge" />
  </a>
  <!-- Security -->
  <a href="https://github.com/tryforge/CLI/actions/workflows/security.yml">
    <img alt="Security Status" src="https://img.shields.io/github/actions/workflow/status/tryforge/CLI/security.yml?branch=main&label=Security&logo=checkmk&style=for-the-badge&logoColor=white" />
  </a>
  <!-- Tests -->
  <a href="https://github.com/tryforge/CLI/actions/workflows/test.yml">
    <img alt="Test Status" src="https://img.shields.io/github/actions/workflow/status/tryforge/CLI/test.yml?branch=main&label=Tests&logo=jest&style=for-the-badge" />
  </a>
</p>

<br/>

---

<br/>

<!-- What is a CLI? -->
<div id="user-content-toc">
  <ul align="center" style="list-style: none; padding: 0; margin: 0;">
    <summary>
      <h2><strong>What is a CLI?</strong></h2>
    </summary>
  </ul>
</div>

<p align="center">A CLI, or Command Line Interface, is a text-based interface that allows users to interact with a computer or software application using commands and instructions. It is a powerful tool that can help you automate repetitive tasks, manage files and directories, and perform other tasks that would otherwise require manual intervention.</p>

<br/>

<!-- Why use a CLI? -->
<div id="user-content-toc">
  <ul align="center" style="list-style: none; padding: 0; margin: 0;">
    <summary>
      <h2><strong>Why use a CLI?</strong></h2>
    </summary>
  </ul>
</div>

<p align="center">Using a CLI can help you automate repetitive tasks, manage files and directories, and perform other tasks that would otherwise require manual intervention. It can also help you save time and reduce errors.</p>

<br/>

<!-- What is ForgeCLI? -->
<div id="user-content-toc">
  <ul align="center" style="list-style: none; padding: 0; margin: 0;">
    <summary>
      <h2><strong>What is ForgeCLI?</strong></h2>
    </summary>
  </ul>
</div>

<p align="center"><code>@tryforge/cli</code> is the official command-line interface for developers working with <strong>ForgeScript</strong>, the powerful framework used in the BotForge ecosystem. Whether you're scaffolding a new bot, creating commands, checking your code's quality, automating tasks, linting your code, formatting your code, or fetching documentation, this CLI helps you save time, reduce boilerplate, and automate repetitive tasks.</p>

<br/>

<!-- Why use ForgeCLI? -->
<div id="user-content-toc">
  <ul align="center" style="list-style: none; padding: 0; margin: 0;">
    <summary>
      <h2><strong>Why use ForgeCLI?</strong></h2>
    </summary>
  </ul>
</div>

<p align="center">ForgeCLI is a CLI tool that helps you scaffold projects, generate ForgeScript snippets, and automate tasks. It has over 100 features and commands to help you manage your projects and automate your tasks.</p>

<br/>

---

<br/>

<!-- Installation -->
<div id="user-content-toc">
  <ul align="center" style="list-style: none; padding: 0; margin: 0;">
    <summary>
      <h2><strong>Installation</strong></h2>
    </summary>
  </ul>
</div>

<p align="center">Install the CLI globally using your preferred package manager:</p>

```bash
# Using npm
npm install -g @tryforge/cli

# Using yarn
yarn global add @tryforge/cli

# Using pnpm
pnpm add -g @tryforge/cli
```

<p align="center">Verify the installation:</p>

```bash
forge --version
```

<br/>

---

<br/>

<div id="user-content-toc">
  <ul align="center" style="list-style: none; padding: 0; margin: 0;">
    <summary>
      <h2><strong>WIP core docs</strong></h2>
    </summary>
  </ul>
</div>

<br/>
<!-- What is a CLI? -->
<!-- Why use a CLI? -->
<!-- What is ForgeCLI? -->
<!-- Features -->
<!-- Benefits -->
<!-- Use cases -->
<!-- How it works -->
<!-- Why ForgeCLI? -->
<!-- History -->
<!-- Roadmap -->

<br/>

---

<br/>

<!-- Project History -->

<div id="user-content-toc">
  <ul align="center" style="list-style: none; padding: 0; margin: 0;">
    <summary>
      <h2><strong>Project History</strong></h2>
    </summary>
  </ul>
</div>

<p align="center">Soon.</p>

<br/>

---

<br/>

<!-- Roadmap -->

<div id="user-content-toc">
  <ul align="center" style="list-style: none; padding: 0; margin: 0;">
    <summary>
      <h2><strong>Roadmap</strong></h2>
    </summary>
  </ul>
</div>

<p align="center">Soon.</p>

<br/>

---

<br/>

<!-- Code Style -->

<div id="user-content-toc">
  <ul align="center" style="list-style: none; padding: 0; margin: 0;">
    <summary>
      <h2><strong>Code Style</strong></h2>
    </summary>
  </ul>
</div>

<p align="center">We use ESLint and Prettier for code style. The project includes pre-commit hooks
that run these tools automatically.</p>

<br/>

---

<br/>

<!-- Contributing -->

<div id="user-content-toc">
  <ul align="center" style="list-style: none; padding: 0; margin: 0;">
    <summary>
      <h2><strong>Contributing</strong></h2>
    </summary>
  </ul>
</div>

<p align="center">We welcome contributions! Please read our
<a href="./CONTRIBUTING.md">Contributing Guide</a> for details on how to contribute to this
project.</p>

<br/>

---

<br/>

<!-- Team -->

<div id="user-content-toc">
  <ul align="center" style="list-style: none; padding: 0; margin: 0;">
    <summary>
      <h2><strong>Team</strong></h2>
    </summary>
  </ul>
</div>

<p align="center">
  <strong>Core Maintainers:</strong> The dedicated team ensuring project quality and direction
</p>

<p align="center">
  <strong>Contributors:</strong> Amazing developers who help improve the project
</p>

<p align="center">
  <strong>Community:</strong> Active users providing feedback and support
</p>

<p align="center">View our complete contributor list on <a href="https://github.com/tryforge/CLI/graphs/contributors">GitHub</a>.</p>

<br/>

---

<br/>

<!-- Versioning -->

<div id="user-content-toc">
  <ul align="center" style="list-style: none; padding: 0; margin: 0;">
    <summary>
      <h2><strong>Versioning</strong></h2>
    </summary>
  </ul>
</div>

<p align="center">We use <a href="https://semver.org/">Semantic Versioning</a> for versioning. The version number is in the format <code>MAJOR.MINOR.PATCH</code>. The version number is incremented as follows: <code>MAJOR</code> is incremented when there are breaking changes, <code>MINOR</code> is incremented when there are new features, <code>PATCH</code> is incremented when there are bug fixes.</p>

<br/>

---

<br/>

<!-- License -->

<div id="user-content-toc">
  <ul align="center" style="list-style: none; padding: 0; margin: 0;">
    <summary>
      <h2><strong>License</strong></h2>
    </summary>
  </ul>
</div>

<p align="center">This project is licensed under the <a href="https://github.com/tryforge/CLI/blob/main/LICENSE">GPL-3.0 License</a> This means that you can use, modify, and distribute the software for any purpose, but you must also make the source code available to others, and you must also provide a copy of the license to any person who uses the software - see the <a href="./LICENSE">LICENSE</a>
file for full details.</p>

<br/>

---

<br/>

<!-- Support -->
<div id="user-content-toc">
  <ul align="center" style="list-style: none; padding: 0; margin: 0;">
    <summary>
      <h2><strong>Support</strong></h2>
    </summary>
  </ul>
</div>

<p align="center">For support, please open an issue on GitHub or join our
<a href="https://discord.gg/2kwueME2sj">Discord community</a>.</p>

<br/>

---

<br/>

<!-- Code of Conduct -->
<div id="user-content-toc">
  <ul align="center" style="list-style: none; padding: 0; margin: 0;">
    <summary>
      <h2><strong>Code of Conduct</strong></h2>
    </summary>
  </ul>
</div>

<p align="center">We have a Code of Conduct that we expect all contributors to follow. Please read it <a href="./CODE_OF_CONDUCT.md">here</a>.
</p>

<br/>

---

<br/>

<!-- Footer -->
<p align="center">
  <strong>Made with ❤️ by the Striatp</strong><br/>
  <a href="https://github.com/tryforge/CLI/stargazers">Star us on GitHub</a> • 
  <a href="https://discord.gg/2kwueME2sj">Join our Discord</a> • 
  <a href="https://npmjs.org/package/@tryforge/cli">View on NPM</a>
</p>

<br/>

---

<br/>

<!-- Badges -->
<p align="center">
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/Built%20with-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="Built with TypeScript"/></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Powered%20by-Node.js-87CF30?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Powered by Node.js"/></a>
  <a href="https://npmjs.com/package/commander"><img src="https://img.shields.io/badge/Core%20by-Commander-FF6B6B?style=for-the-badge&logo=npm&logoColor=white" alt="Core by Commander.js"/></a>
</p>
