/**
 * Deployment diagnostics utilities for standardized error reporting
 * across actor initialization, React Query calls, and build-time failures.
 */

export interface DiagnosticContext {
  module: string;
  operation: string;
  error: unknown;
  additionalInfo?: Record<string, unknown>;
}

/**
 * Format and log a deployment-related error with actionable context
 */
export function logDeploymentError(context: DiagnosticContext): void {
  const errorMessage = context.error instanceof Error 
    ? context.error.message 
    : String(context.error);

  console.error(
    `[${context.module}] ${context.operation} failed:`,
    errorMessage
  );

  if (context.additionalInfo) {
    console.error('Additional context:', context.additionalInfo);
  }

  // Provide remediation hints based on error patterns
  const hints = getRemediationHints(errorMessage, context.module);
  if (hints.length > 0) {
    console.error('💡 Remediation hints:');
    hints.forEach(hint => console.error(`  - ${hint}`));
  }
}

/**
 * Get actionable remediation hints based on error patterns
 */
function getRemediationHints(errorMessage: string, module: string): string[] {
  const hints: string[] = [];

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
