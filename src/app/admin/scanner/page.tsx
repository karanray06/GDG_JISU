"use client";

import { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, XCircle, Loader2, Camera } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserRole } from "@/models/User";

export default function QRScannerPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "scanning" | "processing" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [attendeeName, setAttendeeName] = useState("");
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  // Role Protection
  const role = (session?.user as any)?.role;
  if (session && role !== UserRole.CORE && role !== UserRole.LEAD) {
    router.push("/dashboard");
  }

  useEffect(() => {
    if (status === "idle") {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );

      scanner.render(onScanSuccess, onScanFailure);
      scannerRef.current = scanner;
      setStatus("scanning");
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(err => console.error("Failed to clear scanner", err));
      }
    };
  }, [status]);

  async function onScanSuccess(decodedText: string) {
    if (status === "processing") return;
    
    // Stop scanner briefly to process
    if (scannerRef.current) {
      scannerRef.current.pause();
    }

    setScanResult(decodedText);
    setStatus("processing");
    setMessage("Verifying RSVP...");

    try {
      const response = await fetch("/api/admin/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rsvpToken: decodedText }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setAttendeeName(data.attendeeName || "Member");
        setMessage("Check-in Successful!");
        
        // Reset after 3 seconds for next scan
        setTimeout(() => resetScanner(), 3000);
      } else {
        setStatus("error");
        setMessage(data.error || "Check-in failed");
        setTimeout(() => resetScanner(), 3000);
      }
    } catch (err) {
      setStatus("error");
      setMessage("Connection error. Please try again.");
      setTimeout(() => resetScanner(), 3000);
    }
  }

  function onScanFailure(error: any) {
    // We can ignore failures as they occur frequently while scanning
  }

  function resetScanner() {
    setScanResult(null);
    setAttendeeName("");
    setMessage("");
    setStatus("scanning");
    if (scannerRef.current) {
      scannerRef.current.resume();
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">Event Check-in</h1>
          <div className="w-10"></div> {/* Spacer */}
        </div>

        <div className="relative aspect-square w-full rounded-3xl overflow-hidden border-2 border-white/20 bg-gray-900 flex items-center justify-center">
          {status === "processing" && (
            <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center space-y-4">
              <Loader2 size={48} className="text-blue-500 animate-spin" />
              <p className="font-medium">{message}</p>
            </div>
          )}

          {status === "success" && (
            <div className="absolute inset-0 z-10 bg-green-600 flex flex-col items-center justify-center space-y-4 p-6 text-center">
              <CheckCircle2 size={64} className="text-white animate-bounce" />
              <div>
                <h2 className="text-3xl font-black">{attendeeName}</h2>
                <p className="text-white/80 font-medium">IS CHECKED IN</p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="absolute inset-0 z-10 bg-red-600 flex flex-col items-center justify-center space-y-4 p-6 text-center">
              <XCircle size={64} className="text-white" />
              <p className="text-xl font-bold">{message}</p>
            </div>
          )}

          <div id="reader" className="w-full h-full"></div>
          
          {/* Mock UI Overlay */}
          <div className="absolute inset-0 pointer-events-none border-[40px] border-black/40 flex items-center justify-center">
             <div className="w-64 h-64 border-2 border-blue-500 rounded-2xl relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white -translate-x-1 -translate-y-1"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white translate-x-1 -translate-y-1"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white -translate-x-1 translate-y-1"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white translate-x-1 translate-y-1"></div>
                
                {/* Scanning line animation */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-400 opacity-50 animate-scan"></div>
             </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Camera size={18} />
            <p className="text-sm">Align the QR code within the frame</p>
          </div>
          
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Check-in Status</h3>
            <p className={`text-lg font-bold ${status === 'scanning' ? 'text-blue-400' : 'text-white'}`}>
              {status === 'scanning' ? 'READY TO SCAN' : message || 'INACTIVE'}
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        #reader__dashboard_section_csr button {
          background-color: #4285F4 !important;
          color: white !important;
          border-radius: 8px !important;
          padding: 8px 16px !important;
          border: none !important;
          font-weight: 600 !important;
          margin: 10px 0 !important;
        }
        #reader__camera_selection {
          background-color: #1f2937 !important;
          color: white !important;
          border-radius: 8px !important;
          padding: 5px !important;
        }
        #reader {
          border: none !important;
        }
      `}</style>
    </div>
  );
}
