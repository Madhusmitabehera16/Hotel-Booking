import { Suspense } from "react";
import ConfirmClient from "./ConfirmClient";

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <ConfirmClient />
    </Suspense>
  );
}
