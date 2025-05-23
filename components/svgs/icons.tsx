import { Loader2 } from "lucide-react";

export const Icons = {
  spinner: Loader2,
  google: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <path fill="#fbc02d" d="M43.6 20.5h-1.6V20H24v8h11.3C34.9 32.1..." />
      <path fill="#e53935" d="M24 44c5.9 0 10.8-1.9 14.4-5.2l-6.6-5.4..." />
      <path fill="#4caf50" d="M9.9 27.6C8.9 25.3 8.4 22.7 8.4 20s.5-5.3..." />
      <path fill="#1565c0" d="M24 8.2c3.2 0 6 1.1 8.2 3.2l6.1-6.1C34.7..." />
    </svg>
  ),
};
