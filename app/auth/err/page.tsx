"use client";

import { useSearchParams } from 'next/navigation';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Suspense } from 'react';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessages: Record<string, string> = {
    Configuration: 'There was a problem with the server configuration.',
    AccessDenied: 'You do not have permission to sign in.',
    Verification: 'The sign in link is no longer valid or has expired.',
    Default: 'An error occurred during sign in. Please try again.',
  };

  const errorMessage = error ? errorMessages[error as keyof typeof errorMessages] || errorMessages.Default : errorMessages.Default;

  return (
    <Suspense>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Authentication Error</CardTitle>
            <CardDescription className="text-center">
              We encountered an issue while signing you in
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {errorMessage}
              </AlertDescription>
            </Alert>

            <div className="text-sm text-muted-foreground text-center">
              <p>If the problem persists, please contact support.</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button asChild className="w-full" variant="outline">
              <Link href="/sign-in">
                Back to Sign In
              </Link>
            </Button>
            <Button asChild className="w-full" variant="ghost">
              <Link href="/">
                Return Home
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Suspense>
  );
}
