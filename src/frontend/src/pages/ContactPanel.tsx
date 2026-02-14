import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useSubmitContactMessage, useGetContactMessages } from '../hooks/useQueries';
import { toast } from 'sonner';
import { Loader2, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

interface ContactPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactPanel({ open, onClose }: ContactPanelProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const submitMutation = useSubmitContactMessage();
  const { data: messages, isLoading: messagesLoading } = useGetContactMessages();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    try {
      await submitMutation.mutateAsync({ name, email, message });
      toast.success('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
      toast.error(errorMessage);
      console.error('[ContactPanel] Submit error:', error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-xl flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl">Contact Us</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 pr-4">
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what's on your mind..."
                rows={6}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={submitMutation.isPending}
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>
          </form>

          <Separator className="my-8" />

          <div className="rounded-lg border p-4">
            <h3 className="mb-3 font-semibold flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Other Ways to Reach Us
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                hello@contourcafe.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                (555) 123-4567
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                123 Contour Street, Design District
              </p>
            </div>
          </div>

          {messages && messages.length > 0 && (
            <>
              <Separator className="my-8" />
              <div className="rounded-lg border p-4">
                <h3 className="mb-3 font-semibold">Recent Messages</h3>
                {messagesLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.slice(0, 5).map((msg, idx) => (
                      <div key={idx} className="rounded-md bg-muted/50 p-3 text-sm">
                        <div className="font-medium">{msg.name}</div>
                        {msg.email && (
                          <div className="text-xs text-muted-foreground">{msg.email}</div>
                        )}
                        {msg.message && (
                          <div className="mt-1 text-muted-foreground line-clamp-2">
                            {msg.message}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
