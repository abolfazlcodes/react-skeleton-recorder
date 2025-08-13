import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

type Props = {
    children: React.ReactNode;
    isLoading?: boolean;
    devMode?: boolean;
    onCapture?: (jsx: React.ReactNode) => void;
};
declare const SkeletonRecorder: ({ children, isLoading, devMode, onCapture, }: Props) => react_jsx_runtime.JSX.Element;

export { SkeletonRecorder };
