import { useState, useCallback } from 'react';
import { useActor } from './useActor';
import { useQuery } from '@tanstack/react-query';
import { logDeploymentError, inferDeploymentStep } from '../utils/deploymentDiagnostics';
import { useInternetIdentity } from './useInternetIdentity';
import { type backendInterface } from '../backend';
import { createActorWithConfig } from '../config';

interface UseActorWithErrorHandlingReturn {
    actor: backendInterface | null;
    isFetching: boolean;
    isError: boolean;
    error: unknown;
    retry: () => void;
}

/**
 * Enhanced version of useActor with error handling and retry functionality
 * for deployment diagnostics and startup error overlay integration
 */
export function useActorWithErrorHandling(): UseActorWithErrorHandlingReturn {
    const { identity } = useInternetIdentity();
    const [retryCount, setRetryCount] = useState(0);
    
    // Use React Query directly to get error state
    const actorQuery = useQuery<backendInterface>({
        queryKey: ['actor-with-error-handling', identity?.getPrincipal().toString(), retryCount],
        queryFn: async () => {
            const isAuthenticated = !!identity;
            const principal = identity?.getPrincipal().toString();

            try {
                console.log('[useActorWithErrorHandling] Creating actor...', {
                    isAuthenticated,
                    principal: principal || 'anonymous',
                    retryCount,
                });

                let actor: backendInterface;

                if (!isAuthenticated) {
                    actor = await createActorWithConfig();
                } else {
                    const actorOptions = {
                        agentOptions: {
                            identity
                        }
                    };
                    actor = await createActorWithConfig(actorOptions);
                }

                console.log('[useActorWithErrorHandling] Actor created successfully');
                return actor;
            } catch (error) {
                logDeploymentError({
                    module: 'useActor',
                    operation: 'createActor',
                    step: inferDeploymentStep(error, 'useActor'),
                    error,
                    additionalInfo: {
                        identityPresent: !!identity,
                        isAuthenticated,
                        principal: principal || 'anonymous',
                        retryCount,
                    },
                });

                throw error;
            }
        },
        staleTime: Infinity,
        enabled: true,
        retry: false,
    });

    const retry = useCallback(() => {
        console.log('[useActorWithErrorHandling] Manual retry triggered');
        setRetryCount(prev => prev + 1);
    }, []);

    return {
        actor: actorQuery.data || null,
        isFetching: actorQuery.isFetching,
        isError: actorQuery.isError,
        error: actorQuery.error,
        retry,
    };
}
