"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Delivery } from "@/components/svgs/delivery";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Topbar from "@/components/TopBar";


export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  const userName = session?.user?.name ?? "";
  const letters = userName.split("");

  if (status === "loading") return null;

  const goToOrders = () => router.push("/orders");

  const customCss =  {
  color :"text-purple-500",
  fontSize :  "text-4xl md:text-5xl",
  delay : 0.05,
  showDelivery : true,
}
  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-6">
     <Topbar/>
      <div className={`flex flex-wrap ${customCss.fontSize} font-extrabold tracking-wide`}>
        {letters.map((letter, index) => (
          <motion.div
            key={`${letter}-${index}`}
            className={`inline-block ${customCss.color}`}
            initial={{ y: -50, opacity: 0, scale: 0.5 }}
            animate={
              { y: 0, opacity: 1, scale: 1 }
            }
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: index * customCss.delay + 0.2,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.div>
        ))}
      </div>

      {customCss.showDelivery && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: letters.length * customCss.delay + 0.5, type: "spring" }}
        >
          <Delivery />
        </motion.div>
      )}

      <motion.button
        onClick={goToOrders}
        className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: letters.length * customCss.delay + 1 }}
      >
        Go to Orders
      </motion.button>
    </div>
  );
}
