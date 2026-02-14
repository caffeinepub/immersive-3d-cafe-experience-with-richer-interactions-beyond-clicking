/**
 * Deployment diagnostics utilities for standardized error reporting
 * across actor initialization, React Query calls, and build-time failures.
 */

export type DeploymentStep = 'backend-deploy' | 'frontend-build' | 'runtime';

export interface DiagnosticContext {
  module: string;
  operation: string;
  error: unknown;
  step?: DeploymentStep;
  additionalInfo?: Record<string, unknown>;
}

/**
 * Format and log a deployment-related error with actionable context
 */
export function logDeploymentError(context: DiagnosticContext): void {
  const errorMessage = context.error instanceof Error 
    ? context.error.message 
    : String(context.error);

  const step = context.step || 'runtime';
  const stepLabel = formatStepLabel(step);

  console.error(
    `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
  );
  console.error(`❌ DEPLOYMENT ERROR - ${stepLabel}`);
  console.error(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.error(`Module: ${context.module}`);
  console.error(`Operation: ${context.operation}`);
  console.error(`Step: ${stepLabel}`);
  console.error(`Error: ${errorMessage}`);

  if (context.additionalInfo) {
    console.error(`\nAdditional context:`, context.additionalInfo);
  }

  // Provide remediation hints based on error patterns
  const hints = getRemediationHints(errorMessage, context.module, step);
  if (hints.length > 0) {
    console.error(`\n💡 Remediation hints:`);
    hints.forEach(hint => console.error(`  - ${hint}`));
  }

  console.error(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
}

/**
 * Format deployment step label for display
 */
function formatStepLabel(step: DeploymentStep): string {
  switch (step) {
    case 'backend-deploy':
      return 'Backend Deploy';
    case 'frontend-build':
      return 'Frontend Build';
    case 'runtime':
      return 'Runtime';
    default:
      return 'Unknown';
  }
}

/**
 * Get actionable remediation hints based on error patterns
 */
function getRemediationHints(errorMessage: string, module: string, step: DeploymentStep): string[] {
  const hints: string[] = [];

  // Backend deploy failures
  if (step === 'backend-deploy') {
    hints.push('Check Motoko compilation: dfx build backend');
    hints.push('Verify canister status: dfx canister status backend');
    hints.push('Review backend/main.mo for syntax errors');
    hints.push('Check stable variable migrations if upgrading');
  }

  // Frontend build failures
  if (step === 'frontend-build') {
    hints.push('Regenerate backend types: dfx generate backend');
    hints.push('Check TypeScript compilation: npm run typescript-check');
    hints.push('Verify all imports resolve correctly');
    hints.push('Review frontend/src/backend.d.ts for type mismatches');
  }

  // Actor initialization failures
  if (module === 'useActor' || errorMessage.includes('actor')) {
    if (errorMessage.includes('not initialized') || errorMessage.includes('undefined')) {
      hints.push('Verify backend canister is deployed: dfx canister status backend');
      hints.push('Regenerate types: dfx generate backend');
      hints.push('Check that createActorWithConfig is properly configured');
    }
  }

  // Type/interface mismatches
  if (errorMessage.includes('type') || errorMessage.includes('undefined is not a function')) {
    hints.push('Backend types may be out of sync. Run: dfx generate backend');
    hints.push('Check frontend/src/backend.d.ts matches actual backend interface');
    hints.push('Verify all actor method calls match the candid interface');
  }

  // Network/canister call failures
  if (errorMessage.includes('network') || errorMessage.includes('fetch') || errorMessage.includes('rejected')) {
    hints.push('Check network connectivity to the canister');
    hints.push('Verify canister is running: dfx canister status backend');
    hints.push('Check browser console for CORS or network errors');
  }

  // Query/mutation failures
  if (module === 'useQueries') {
    hints.push('Verify the backend method exists and is public');
    hints.push('Check that parameters match the expected types');
    hints.push('Ensure actor is initialized before calling methods');
  }

  return hints;
}

/**
 * Wrap an async operation with diagnostic error handling
 */
export async function withDiagnostics<T>(
  context: Omit<DiagnosticContext, 'error'>,
  operation: () => Promise<T>
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    logDeploymentError({ ...context, error });
    throw error;
  }
}

/**
 * Check if an error is a backend/candid type mismatch
 */
export function isTypeMismatchError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  
  const message = error.message.toLowerCase();
  return (
    message.includes('type') ||
    message.includes('undefined is not a function') ||
    message.includes('cannot read property') ||
    message.includes('is not a function')
  );
}

/**
 * Check if an error is an actor initialization failure
 */
export function isActorInitError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  
  const message = error.message.toLowerCase();
  return (
    message.includes('actor not initialized') ||
    message.includes('actor is null') ||
    message.includes('cannot create actor')
  );
}
