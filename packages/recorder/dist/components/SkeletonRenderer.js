import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const SkeletonRenderer = ({ skeleton, }) => {
    return (_jsxs("div", { style: {
            marginTop: 40,
            borderTop: "1px solid #ccc",
            paddingTop: 16,
        }, children: [_jsx("h2", { style: {
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    marginBottom: 8,
                }, children: "Skeleton Preview:" }), skeleton] }));
};
