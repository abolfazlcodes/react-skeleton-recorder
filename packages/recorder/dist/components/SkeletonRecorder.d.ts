import React from "react";
type Props = {
    children: React.ReactNode;
    isLoading?: boolean;
    devMode?: boolean;
    onCapture?: (jsx: React.ReactNode) => void;
};
export declare const SkeletonRecorder: ({ children, isLoading, devMode, onCapture, }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
