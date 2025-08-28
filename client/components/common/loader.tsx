import React from "react";
import styled from "@emotion/styled";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
}

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: hsl(var(--background));
`;

const LoaderSpinner = styled.div<{ size?: "sm" | "md" | "lg" }>`
  border-radius: 50%;
  border: 2px solid hsl(var(--border));
  border-top-color: hsl(var(--primary));
  animation: spin 1s linear infinite;

  ${(props) => {
    switch (props.size) {
      case "sm":
        return "width: 1rem; height: 1rem;";
      case "lg":
        return "width: 2rem; height: 2rem;";
      default:
        return "width: 1.5rem; height: 1.5rem;";
    }
  }}

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Loader: React.FC<LoaderProps> = ({ size = "md" }) => {
  return (
    <LoaderContainer>
      <LoaderSpinner size={size} />
    </LoaderContainer>
  );
};

export default Loader;
