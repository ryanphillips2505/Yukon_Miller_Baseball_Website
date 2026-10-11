"use client";

import { MinutesSessionGuard, useEndMinutesSession } from "@/components/minutes-session-guard";
import { MinutesVault } from "@/components/minutes-vault";

type MinutesFile = {
  name: string;
  size: number;
  uploadedAt: string;
};

function GuardedVault({
  initialFiles,
  canAdmin,
  documentsUnavailable,
}: {
  initialFiles: MinutesFile[];
  canAdmin: boolean;
  documentsUnavailable: boolean;
}) {
  const endSession = useEndMinutesSession();
  return (
    <MinutesVault
      initialFiles={initialFiles}
      canAdmin={canAdmin}
      documentsUnavailable={documentsUnavailable}
      onSessionExpired={() => {
        void endSession("idle");
      }}
    />
  );
}

export function MinutesSession({
  lastActivity,
  canAdmin,
  initialFiles,
  documentsUnavailable,
}: {
  lastActivity: number;
  canAdmin: boolean;
  initialFiles: MinutesFile[];
  documentsUnavailable: boolean;
}) {
  return (
    <MinutesSessionGuard lastActivity={lastActivity}>
      <GuardedVault
        initialFiles={initialFiles}
        canAdmin={canAdmin}
        documentsUnavailable={documentsUnavailable}
      />
    </MinutesSessionGuard>
  );
}
