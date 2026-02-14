import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ContactMessage } from '../backend';
import { logDeploymentError, withDiagnostics } from '../utils/deploymentDiagnostics';

export function useGetContactMessages() {
  const { actor, isFetching } = useActor();

  return useQuery<ContactMessage[]>({
    queryKey: ['contactMessages'],
    queryFn: async () => {
      return withDiagnostics(
        {
          module: 'useQueries',
          operation: 'getContactMessages',
          step: 'runtime',
          additionalInfo: {
            actorInitialized: !!actor
          }
        },
        async () => {
          if (!actor) {
            throw new Error('Actor not initialized - cannot fetch contact messages');
          }
          
          const messages = await actor.getContactMessages();
          
          // Runtime normalization: ensure we always return an array
          if (!Array.isArray(messages)) {
            console.warn('[useQueries] getContactMessages returned non-array, normalizing to empty array');
            return [];
          }
          
          // Validate message shape
          const validMessages = messages.filter((msg): msg is ContactMessage => {
            if (!msg || typeof msg !== 'object') return false;
            if (typeof msg.name !== 'string') return false;
            if (typeof msg.email !== 'string') return false;
            if (typeof msg.message !== 'string') return false;
            return true;
          });
          
          if (validMessages.length !== messages.length) {
            console.warn(
              `[useQueries] Filtered ${messages.length - validMessages.length} invalid messages`
            );
          }
          
          return validMessages;
        }
      );
    },
    enabled: !!actor && !isFetching,
    retry: 2,
    retryDelay: 1000,
  });
}

export function useSubmitContactMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, email, message }: { name: string; email: string; message: string }) => {
      return withDiagnostics(
        {
          module: 'useQueries',
          operation: 'submitContactMessage',
          step: 'runtime',
          additionalInfo: {
            actorInitialized: !!actor,
            nameLength: name.length,
            emailLength: email.length,
            messageLength: message.length
          }
        },
        async () => {
          if (!actor) {
            throw new Error('Actor not initialized - cannot submit contact message');
          }
          
          // Validate inputs before sending
          if (!name || name.trim().length === 0) {
            throw new Error('Name cannot be empty');
          }
          
          await actor.submitContactMessage(name, email, message);
        }
      );
    },
    onSuccess: () => {
      // Invalidate and refetch contact messages
      queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
    },
    onError: (error) => {
      logDeploymentError({
        module: 'useQueries',
        operation: 'submitContactMessage.onError',
        step: 'runtime',
        error,
      });
    },
    retry: 1,
  });
}
