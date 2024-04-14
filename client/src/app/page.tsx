"use client"; 
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuth();


  return (
    <div>
    </div>
  );
}
