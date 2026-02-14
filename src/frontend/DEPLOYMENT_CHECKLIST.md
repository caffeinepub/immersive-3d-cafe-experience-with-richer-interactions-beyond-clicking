# Deployment Validation Checklist

This checklist helps diagnose deployment failures in the standard flow: backend deploy → frontend build → runtime.

## Standard Deployment Flow

1. **Backend Deploy** - Motoko compilation and canister deployment
2. **Frontend Build** - TypeScript compilation and bundling
3. **Runtime** - Application execution in the browser

## Diagnostic Output Format

When a deployment or runtime error occurs, the enhanced diagnostics will output:

