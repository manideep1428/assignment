"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Delivery } from "@/components/svgs/delivery";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Topbar from "@/components/TopBar";

interface BouncingNameProps {
  name?: string;
  color?: string;
  fontSize?: string;
  delay?: number;
  showDelivery?: boolean;
}

export default function DashBoard({
  name,
  color = "text-purple-500",
  fontSize = "text-4xl md:text-5xl",
  delay = 0.05,
  showDelivery = true,
}: BouncingNameProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
    if (status === "authenticated") {
      setIsVisible(true);
    }
  }, [status, router]);

  const userName = name ?? session?.user?.name ?? "";
  const letters = userName.split("");

  if (status === "loading") return null;

  const goToOrders = () => router.push("/orders");

  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-6">
     <Topbar/>
      <div className={`flex flex-wrap ${fontSize} font-extrabold tracking-wide`}>
        {letters.map((letter, index) => (
          <motion.div
            key={`${letter}-${index}`}
            className={`inline-block ${color}`}
            initial={{ y: -50, opacity: 0, scale: 0.5 }}
            animate={
              isVisible
                ? { y: 0, opacity: 1, scale: 1 }
                : { y: -50, opacity: 0, scale: 0.5 }
            }
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: index * delay + 0.2,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.div>
        ))}
      </div>

      {showDelivery && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: letters.length * delay + 0.5, type: "spring" }}
        >
          <Delivery />
        </motion.div>
      )}

      {/* Go to Orders Button */}
      <motion.button
        onClick={goToOrders}
        className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: letters.length * delay + 1 }}
      >
        Go to Orders
      </motion.button>
    </div>
  );
}
