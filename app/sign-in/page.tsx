"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/svgs/icons";

export default function SignIn() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  if (session?.user) {
    redirect("/");
  }

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signIn("google");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <Card className="w-full max-w-sm border border-gray-200 shadow-md">
        <CardContent className="py-12 px-6 flex justify-center">
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full max-w-xs h-12 rounded-full border border-gray-400 text-black font-medium text-base hover:bg-gray-50 transition"
            disabled={loading}
          >
            {loading ? (
              <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-5 w-5" />
            )}
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
