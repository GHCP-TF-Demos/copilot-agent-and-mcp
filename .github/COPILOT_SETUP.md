# GitHub Copilot Configuration Guide

This document explains the custom instructions and Model Context Protocol (MCP) server configuration for this project.

## Custom Instructions

Custom instructions are located in `.github/copilot-instructions.md` and provide Copilot with:

- **Project Context**: Information about the tech stack (React, Node.js, Express, Redux Toolkit)
- **Code Style Guidelines**: Best practices for JavaScript, React, and Node.js development
- **Security Requirements**: Microsoft and GitHub security best practices
- **Testing Guidelines**: How to run tests and write new tests
- **Development Workflow**: Pre and post-change procedures
- **API Documentation**: Available endpoints and their usage

### Key Security Practices

The custom instructions enforce:
- No secrets in code
- Input validation and sanitization
- Proper error handling
- Rate limiting for APIs
- HTTPS for external calls
- Principle of least privilege

## MCP Server Configuration

MCP servers are configured in `.vscode/mcp.json` and provide Copilot with enhanced capabilities.

### Configured MCP Servers

#### 1. Filesystem Server
- **Purpose**: Secure file operations within the project directory
- **Capabilities**: Read, write, search, and manage files
- **Scope**: Limited to project directory (uses relative path `.`)
- **Use Cases**: 
  - Code navigation and search
  - File manipulation
  - Directory structure exploration

#### 2. Memory Server
- **Purpose**: Knowledge graph-based persistent memory
- **Capabilities**: Store and retrieve context across sessions
- **Use Cases**:
  - Remember project-specific patterns
  - Maintain context about ongoing work
  - Store frequently referenced information

#### 3. Git Server
- **Purpose**: Repository management and version control
- **Capabilities**: Read git history, search commits, view diffs
- **Scope**: Limited to the project repository (uses relative path `.`)
- **Use Cases**:
  - Understanding code history
  - Searching for changes
  - Reviewing commit patterns

#### 4. Fetch Server
- **Purpose**: Web content fetching and conversion
- **Capabilities**: Fetch documentation, convert web content for LLM usage
- **Use Cases**:
  - Accessing API documentation
  - Referencing external resources
  - Staying updated with latest package docs

## Benefits

### For Node.js/React Development

1. **Better Context Awareness**: Filesystem and git servers help Copilot understand the entire codebase structure
2. **Persistent Learning**: Memory server maintains context about project patterns and conventions
3. **Documentation Access**: Fetch server enables referencing React, Node.js, and npm package documentation
4. **Security First**: Custom instructions enforce Microsoft and GitHub security best practices

### Microsoft and GitHub Best Practices

- **Secure by Default**: File operations are scoped to project directory
- **No Credential Exposure**: Instructions explicitly prevent secret commits
- **Input Validation**: Enforced sanitization of user inputs
- **Error Handling**: Proper error management without exposing internals
- **Testing Culture**: Clear testing expectations and commands
- **Code Quality**: Modern JavaScript practices and patterns

## Using the Configuration

### Prerequisites

The MCP servers use `npx` to download and run official MCP server packages on-demand. No additional installation is required.

### Verifying Configuration

1. Open VS Code in the project directory
2. GitHub Copilot should automatically load the custom instructions
3. MCP servers will be initialized when Copilot needs them
4. Check Copilot logs for any MCP server errors

### Testing MCP Integration

Ask Copilot questions that leverage the MCP servers:

- "Show me all the API routes in this project" (filesystem + git)
- "What changes were made to the authentication system?" (git)
- "Find all React components that use Redux" (filesystem)
- "What's the latest React Router API for navigation?" (fetch)

## Customization

### Adding More MCP Servers

To add additional MCP servers, edit `.vscode/mcp.json`:

```json
{
  "servers": {
    "your-server-name": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-name"],
      "env": {}
    }
  }
}
```

### Available Official MCP Servers

- `@modelcontextprotocol/server-filesystem` - File operations (official)
- `mcp-git` - Git operations (community)
- `@modelcontextprotocol/server-memory` - Persistent memory (official)
- `mcp-fetch-server` - Web content fetching (community)
- `@modelcontextprotocol/server-time` - Time and timezone utilities (official)
- `@modelcontextprotocol/server-everything` - Reference/test server with multiple features (official)

Browse more at: https://registry.modelcontextprotocol.io/

### Modifying Custom Instructions

Edit `.github/copilot-instructions.md` to:
- Add project-specific conventions
- Update API endpoints
- Modify testing procedures
- Add new security requirements
- Update technology stack information

## Troubleshooting

### MCP Servers Not Working

1. Check that `npx` is available: `npx --version`
2. Verify Node.js version is compatible (>= 16.x)
3. Check VS Code Copilot extension is up to date
4. Review Copilot logs for MCP initialization errors

### Custom Instructions Not Applied

1. Ensure file is at `.github/copilot-instructions.md`
2. Restart VS Code to reload instructions
3. Check file permissions are readable
4. Verify markdown formatting is correct

## Learn More

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [GitHub Copilot Documentation](https://docs.github.com/copilot)
- [MCP Server Registry](https://registry.modelcontextprotocol.io/)
- [Microsoft Security Best Practices](https://docs.microsoft.com/security/)
