export const LoadingState = {
    idle: "idle",
    pending: "pending",
    success: "success",
    failed: "failed"
} as const;

export type Loading = (typeof LoadingState)[keyof typeof LoadingState];